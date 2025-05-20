// src/components/VendorList.tsx

"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import VendorDetailsModal from "./VendorDetailsModal";

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

export default function VendorList() {
  const [selectedEvent, setSelectedEvent] = useState<"Poruwa" | "Reception">("Reception");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "events", selectedEvent, "vendors"),
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
  }, [selectedEvent]);

  return (
    <div className="mt-8 px-4 sm:px-6">
      {/* Event selector */}
      <div className="mb-6 flex items-center space-x-3">
        <label htmlFor="event" className="font-medium text-gray-700">
          Select event:
        </label>
        <select
          id="event"
          value={selectedEvent}
          onChange={(e) =>
            setSelectedEvent(e.target.value as "Poruwa" | "Reception")
          }
          className="border rounded px-3 py-2"
        >
          <option value="Poruwa">Poruwa</option>
          <option value="Reception">Reception</option>
        </select>
      </div>

      {/* Optional banner image */}
      <div className="-mx-4 sm:-mx-6 mb-4">
        <img
          src="/vendor-list.jpg"
          alt="Wedding table setting"
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Column headers for desktop */}
      <div className="hidden sm:grid grid-cols-5 items-center mb-2 pb-2 border-b border-gray-300 text-sm font-medium text-gray-600">
        <div>Vendor</div>
        <div>Contact</div>
        <div>Category</div>
        <div>Catalogue</div>
        <div>Booked?</div>
      </div>

      {/* Vendor rows */}
      <div className="divide-y divide-gray-300">
        {vendors.map((v) => (
          <div
            key={v.id}
            onClick={() => setSelectedVendor(v)}
            className="py-4 px-4 sm:px-0 border-b border-gray-200 sm:grid sm:grid-cols-5 sm:items-center space-y-2 sm:space-y-0 cursor-pointer hover:bg-gray-50 transition"
          >
            {/* Mobile View */}
            <div className="sm:hidden">
              <p className="text-lg font-semibold text-gray-900">{v.name}</p>
              <p className="text-sm text-gray-600 mt-1">Contact: {v.contact}</p>
              <p className="text-sm text-gray-600">Category: {v.category}</p>
              <p className="text-sm mt-2">
                <a
                  href={v.catalogue}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Catalogue
                </a>
              </p>
              <p className="text-sm text-gray-600">Category: {v.category}</p>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block">
              <p className="text-base text-gray-900">{v.name}</p>
            </div>
            <div className="hidden sm:block text-sm text-gray-600">{v.contact}</div>
            <div className="hidden sm:block text-sm text-gray-600">{v.category}</div>
            <div className="hidden sm:block">
              <a
                href={v.catalogue}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-100 text-gray-900 font-medium rounded px-3 py-1 hover:bg-blue-200 transition"
                onClick={(e) => e.stopPropagation()}
              >
                View Catalogue
              </a>
            </div>
            <div className="hidden sm:block text-sm text-gray-600">{v.booked ? "Yes" : "No"}</div>
          </div>
        ))}
      </div>

      {/* Vendor Modal */}
      {selectedVendor && (
        <VendorDetailsModal
          vendor={selectedVendor}
          event={selectedEvent}
          onClose={() => setSelectedVendor(null)}
        />
      )}
    </div>
  );
}