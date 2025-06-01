// // src/components/VendorList.tsx

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
// import VendorDetailsModal from "./VendorDetailsModal";

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
    <div
      className="relative flex min-h-screen flex-col bg-[#f9faf9] overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >

      <div className="px-4 sm:px-6 md:px-8 lg:px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col w-full max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex flex-col gap-3 min-w-0 flex-1">
              <p className="text-[#101810] tracking-light text-[32px] font-bold leading-tight">Vendors</p>

              <p className="text-[#6a7c6a] text-xs sm:text-sm font-normal leading-normal">
                Manage all your wedding vendors in one place
              </p>
            </div>
          </div>

          <div className="layout-container flex flex-col flex-grow h-full">
            <div className="flex flex-wrap items-end gap-4 px-4 py-3 sm:max-w-[280px]">
              <label className="flex flex-col min-w-40 flex-1">
                Select event:
                <select
                  id="event"
                  value={selectedEvent}
                  onChange={(e) =>
                    setSelectedEvent(e.target.value as "Poruwa" | "Reception")
                  }
                  className="form-input flex-1 bg-[#ecefec] px-4 py-2 text-[#131613] placeholder:text-[#6a7c6a] rounded-xl border border-[#d0e7d0] focus:outline-none focus:ring-0"
                >
                  <option value="Poruwa">Poruwa</option>
                  <option value="Reception">Reception</option>
                </select>
              </label>
            </div>

            <div className="px-0 sm:px-4 py-3">
              <div className="overflow-x-auto md:overflow-x-visible rounded-xl border border-[#d8ded8] bg-[#f9faf9]">
                <table className="table-auto w-full text-sm">
                  <thead>
                    <tr className="bg-[#f9faf9]">
                      {["Vendor", "Category", "Contact", "Contracted Price (LKR)", "Paid Price (LKR)", "Booking Status"].map((col) => (
                        <th key={col} className="px-4 py-3 text-left text-[#131613] text-sm font-large leading-normal">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((row, idx) => (
                      <tr key={idx} className="border-t border-t-[#d8ded8]">
                        <td className="h-[72px] px-4 py-2 text-[#131613] text-sm font-normal leading-normal">{row.name}</td>
                        <td className="h-[72px] px-4 py-2 text-[#6a7c6a] text-sm font-normal leading-normal">{row.category}</td>
                        <td className="h-[72px] px-4 py-2 text-[#6a7c6a] text-sm font-normal leading-normal">{row.contact}</td>
                        <td className="h-[72px] px-4 py-2 text-[#6a7c6a] text-sm font-normal leading-normal">{row.totalPrice}</td>
                        <td className="h-[72px] px-4 py-2 text-[#6a7c6a] text-sm font-normal leading-normal">{row.amountPaid}</td>
                        <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                          <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-xl h-8 px-4 bg-[#ecefec] text-[#131613] text-sm font-medium leading-normal">
                            <span className="truncate">{row.booked ? "Yes" : "No"}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-[#6a7c6a] italic sm:hidden">
                * Scroll horizontally to see more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}