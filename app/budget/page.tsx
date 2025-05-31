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
import { Chart } from "react-google-charts";

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
  const [vendors, setVendors] = useState<Vendor[]>([]);

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

  const totalCost = vendors.reduce((sum, v) => sum + (v.totalPrice || 0), 0);

  const options = {
    // title: `${event} Budget`,
    pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
    is3D: true, // Enables 3D view
    // slices: {
    //   1: { offset: 0.2 }, // Explodes the second slice
    // },
    pieStartAngle: 100, // Rotates the chart
    // sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 14,
      },
    },
    backgroundColor: "#f9fbf9",
    colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f9fbf9] group/design-root overflow-x-hidden"
      style={{
        fontFamily: `"Plus Jakarta Sans", "Noto Sans", sans-serif`,
      }}
    >
      <div className="layout-container flex h-full grow flex-col">

        {/* Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Title */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#101810] tracking-light text-[32px] font-bold leading-tight">Budget Tracker</p>
                <p className="text-[#5c8a5c] text-sm font-normal leading-normal">{event} Budget</p>
              </div>
            </div>

            <div className="flex max-w-[280px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                Select event:
                <select
                  id="event"
                  value={event}
                  onChange={(e) =>
                    setEvent(e.target.value as "Poruwa" | "Reception")
                  }
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e1b0e] focus:outline-0 focus:ring-0 border border-[#d0e7d0] bg-[#f8fcf8] focus:border-[#d0e7d0] h-14 placeholder:text-[#4e974e] p-[10px] text-base font-normal leading-normal"
                >
                  <option value="Poruwa">Poruwa</option>
                  <option value="Reception">Reception</option>
                </select>
              </label>
            </div>

            {/* Total Vendor Cost */}
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#d4e2d4]">
                <p className="text-[#101810] text-base font-medium leading-normal">Total Vendor Cost</p>
                <p className="text-[#101810] tracking-light text-2xl font-bold leading-tight">LKR {totalCost.toLocaleString()}</p>
              </div>
            </div>

            <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width={"100%"}
              height={"400px"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}