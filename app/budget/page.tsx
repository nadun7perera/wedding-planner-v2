// src/components/BudgetTracker.tsx

"use client"

import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,

} from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Chart } from "react-google-charts";

type BudgetEntry = {
  id: string;
  item: string;
  vendor: string;
  estimatedCost: number;
  actualCost: number;
  paid: boolean;
  notes: string;
  receiptUrl?: string;
};

type Vendor = {
  id: string;
  name: string;
  contact: string;
  catalogue: string;
  category: string;
  totalPrice?: number;
  amountPaid?: number;
  items?: { name: string; quantity: number }[];
  booked?: boolean;
};

export default function BudgetTracker() {
  const [event, setEvent] = useState("Poruwa");
  // const [entries, setEntries] = useState<BudgetEntry[]>([]);
  // const [form, setForm] = useState<Omit<BudgetEntry, "id">>({
  //   item: "",
  //   vendor: "",
  //   estimatedCost: 0,
  //   actualCost: 0,
  //   paid: false,
  //   notes: "",
  //   receiptUrl: "",
  // });
  // const [editId, setEditId] = useState<string | null>(null);
  // const [uploading, setUploading] = useState(false);
  const [vendors, setVendors] = useState<Vendor[]>([]);

  // const entriesRef = collection(db, `budget/${event}/entries`);

  // useEffect(() => {
  //   return onSnapshot(entriesRef, (snapshot) => {
  //     setEntries(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...(doc.data() as Omit<BudgetEntry, "id">),
  //       }))
  //     );
  //   });
  // }, [event]);


  useEffect(() => {
    const q = query(
      collection(db, "events", event, "vendors"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe: Unsubscribe = onSnapshot(q, (snapshot) => {
      setVendors(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Vendor, "id">),
        }))
      );
    });
    return () => unsubscribe();
  }, [event]);

  const data = [
    ["Vendor", "Total Paid"],
    ...vendors
      .filter(v => v.totalPrice !== undefined)
      .map(v => [v.name, v.totalPrice || 0])
  ];

  // const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setUploading(true);
  //   const storageRef = ref(storage, `budget/${Date.now()}_${file.name}`);
  //   await uploadBytes(storageRef, file);
  //   const url = await getDownloadURL(storageRef);
  //   setForm((prev) => ({ ...prev, receiptUrl: url }));
  //   setUploading(false);
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (editId) {
  //     await updateDoc(doc(db, `budget/${event}/entries`, editId), form);
  //     setEditId(null);
  //   } else {
  //     await addDoc(entriesRef, form);
  //   }
  //   setForm({ item: "", vendor: "", estimatedCost: 0, actualCost: 0, paid: false, notes: "", receiptUrl: "" });
  // };

  // const handleEdit = (entry: BudgetEntry) => {
  //   setEditId(entry.id);
  //   setForm({ ...entry });
  // };

  // const handleDelete = async (id: string) => {
  //   await deleteDoc(doc(db, `budget/${event}/entries`, id));
  // };

  const options = {
    title: `${event} Budget`,
    pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
    is3D: true, // Enables 3D view
    // slices: {
    //   1: { offset: 0.2 }, // Explodes the second slice
    // },
    pieStartAngle: 100, // Rotates the chart
    sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 14,
      },
    },
    colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
  };

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Budget Tracker</h2>
        <select
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="Poruwa">Poruwa</option>
          <option value="Reception">Reception</option>
        </select>
      </div>

      {/* <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-md shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={form.item}
            onChange={(e) => setForm({ ...form, item: e.target.value })}
            placeholder="Item"
            className="border p-2 rounded"
            required
          />
          <input
            value={form.vendor}
            onChange={(e) => setForm({ ...form, vendor: e.target.value })}
            placeholder="Vendor"
            className="border p-2 rounded"
          />
          <input
            type="number"
            value={form.estimatedCost}
            onChange={(e) => setForm({ ...form, estimatedCost: +e.target.value })}
            placeholder="Estimated Cost"
            className="border p-2 rounded"
          />
          <input
            type="number"
            value={form.actualCost}
            onChange={(e) => setForm({ ...form, actualCost: +e.target.value })}
            placeholder="Actual Cost"
            className="border p-2 rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.paid}
              onChange={(e) => setForm({ ...form, paid: e.target.checked })}
            />
            <span>Paid</span>
          </label>
          <input
            type="file"
            onChange={handleFileUpload}
            accept="application/pdf,image/*"
            disabled={uploading}
            className="text-sm"
          />
        </div>
        <textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Notes"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {editId ? "Update Entry" : "Add Entry"}
        </button>
      </form> */}

      {/* <div className="divide-y border-t">
        {entries.map((entry) => (
          <div key={entry.id} className="py-4 flex flex-col md:flex-row justify-between gap-4">
            <div className="text-sm">
              <p><strong>Item:</strong> {entry.item}</p>
              <p><strong>Vendor:</strong> {entry.vendor}</p>
              <p><strong>Estimated:</strong> ${entry.estimatedCost}</p>
              <p><strong>Actual:</strong> ${entry.actualCost}</p>
              <p><strong>Paid:</strong> {entry.paid ? "Yes" : "No"}</p>
              <p><strong>Notes:</strong> {entry.notes}</p>
              {entry.receiptUrl && (
                <a href={entry.receiptUrl} target="_blank" className="text-blue-500 underline">View Receipt</a>
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(entry)}
                className="px-4 py-1 bg-yellow-400 text-sm text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(entry.id)}
                className="px-4 py-1 bg-red-500 text-sm text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div> */}


      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
}