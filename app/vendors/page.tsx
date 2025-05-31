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
  // const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

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
    <div className="relative flex min-h-screen flex-col bg-[#f9faf9] group/design-root overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex flex-col flex-grow h-full">

        <div className="flex max-w-[280px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            Select event:
            <select
              id="event"
              value={selectedEvent}
              onChange={(e) =>
                setSelectedEvent(e.target.value as "Poruwa" | "Reception")
              }
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e1b0e] focus:outline-0 focus:ring-0 border border-[#d0e7d0] bg-[#f8fcf8] focus:border-[#d0e7d0] h-14 placeholder:text-[#4e974e] p-[10px] text-base font-normal leading-normal"
            >
              <option value="Poruwa">Poruwa</option>
              <option value="Reception">Reception</option>
            </select>
          </label>
        </div>



        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#131613] tracking-light text-[32px] font-bold leading-tight">Vendors</p>
                <p className="text-[#6a7c6a] text-sm font-normal leading-normal">Manage all your wedding vendors in one place</p>
              </div>
            </div>

            {/* <div className="pb-3">
              <div className="flex border-b border-[#d8ded8] px-4 gap-8">
                {["All", "Catering", "Photography", "Venue"].map((tab, idx) => (
                  <a
                    key={tab}
                    href="#"
                    className={`flex flex-col items-center justify-center pb-[13px] pt-4 ${idx === 0 ? "border-b-[3px] border-b-[#669966] text-[#131613]" : "border-b-[3px] border-b-transparent text-[#6a7c6a]"
                      }`}
                  >
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">{tab}</p>
                  </a>
                ))}
              </div>
            </div> */}

            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-xl border border-[#d8ded8] bg-[#f9faf9]">
                <table className="flex-1 w-full">
                  <thead>
                    <tr className="bg-[#f9faf9]">
                      {["Vendor", "Category", "Contact", "Contracted Price (LKR)", "Paid Price (LKR)", "Booking Status"].map((col) => (
                        <th
                          key={col}
                          className="px-4 py-3 text-left text-[#131613] text-sm font-large leading-normal w-[400px]"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((row, idx) => (
                      <tr key={idx} className="border-t border-t-[#d8ded8]">
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#131613] text-sm font-normal leading-normal">
                          {row.name}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#6a7c6a] text-sm font-normal leading-normal">
                          {row.category}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#6a7c6a] text-sm font-normal leading-normal">
                          {row.contact}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#6a7c6a] text-sm font-normal leading-normal">
                          {row.totalPrice}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#6a7c6a] text-sm font-normal leading-normal">
                          {row.amountPaid}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#ecefec] text-[#131613] text-sm font-medium leading-normal w-full">
                            <span className="truncate">{row.booked ? "Yes" : "No"}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}