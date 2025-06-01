"use client";

import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    query,
    onSnapshot,
    Unsubscribe,
} from "firebase/firestore";

type Guest = {
    name: string;
    party: string;
    pplInGrp: string;
    seating: string;
    rsvp?: boolean;
};

export default function GuestList() {
    const [selectedEvent, setSelectedEvent] = useState<"Poruwa" | "Reception">("Reception");
    const [search, setSearch] = useState("");
    const [guests, setGuests] = useState<Guest[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newGuest, setNewGuest] = useState({
        name: "",
        party: "",
        rsvp: false,
        pplInGrp: "",
        seating: "",
    });

    useEffect(() => {
        const q = query(
            collection(db, "events", selectedEvent, "guests"),
            // orderBy("createdAt", "desc")
        );
        const unsubscribe: Unsubscribe = onSnapshot(q, (snapshot) => {
            setGuests(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Guest, "id">),
                }))
            );
        });
        return () => unsubscribe();
    }, [selectedEvent]);

    const filteredGuests = guests.filter((guest) =>
        guest.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleForm = () => setShowForm((prev) => !prev);

    const handleInputChange = (e: { target: { name: string; value: string; type: HTMLInputTypeAttribute; checked: boolean; }; }) => {
        const { name, value, type, checked } = e.target;
        setNewGuest((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleAddGuest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGuest.name.trim()) return; // require name

        // 1️⃣ Get a reference to the sub-collection for this event
        const guestsRef = collection(
            db,
            "events",
            selectedEvent,
            "guests"
        )

        // 2️⃣ Add the document
        await addDoc(guestsRef, newGuest)

        setNewGuest({ name: "", party: "", rsvp: false, pplInGrp: "", seating: "" });
        setShowForm(false);

    };

    const totalGuests = guests.reduce((sum, v) => sum + (parseInt(v.pplInGrp) || 0), 0);


    return (
        <div
            className="relative flex min-h-screen flex-col bg-[#f9faf9] overflow-x-hidden"
            style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
        >
            <div className="px-4 sm:px-6 md:px-8 lg:px-40 flex flex-1 justify-center py-5">
                <div className="flex flex-col w-full max-w-[960px] flex-1">
                    <div className="flex flex-wrap justify-between gap-3 p-4">
                        <div className="flex flex-wrap justify-between gap-3">
                            {/* <p className="text-[#131613] tracking-light text-3xl font-bold leading-tight w-full">
                                Guest List
                            </p> */}
                            <p className="text-[#101810] tracking-light text-[32px] font-bold leading-tight">Guest List</p>


                            <div className="flex flex-col md:flex-row gap-3 w-full">
                                <div className="flex-1 flex flex-col">
                                    <label className="text-sm font-semibold mb-1 text-[#131613]">Select event:</label>
                                    <select
                                        id="event"
                                        value={selectedEvent}
                                        onChange={(e) => setSelectedEvent(e.target.value as "Poruwa" | "Reception")}
                                        className="form-input flex-1 bg-[#ecefec] px-4 py-2 text-[#131613] placeholder:text-[#6a7c6a] rounded-xl border border-[#d0e7d0] focus:outline-none focus:ring-0"
                                    >
                                        <option value="Poruwa">Poruwa</option>
                                        <option value="Reception">Reception</option>
                                    </select>
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <label className="text-sm font-semibold mb-1 text-[#131613]">Search guests:</label>
                                    <input
                                        type="text"
                                        placeholder="Search guests"
                                        className="form-input flex-1 bg-[#ecefec] px-4 py-2 text-[#131613] placeholder:text-[#6a7c6a] rounded-xl border border-[#d0e7d0] focus:outline-none focus:ring-0"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <div className="flex-1 flex flex-col px-10 gap-5">
                                    <label className="text-sm font-semibold mb-1 text-[#131613]">Total guests</label>
                                    <label className="text-sm font-semibold mb-1 text-[#131613]">{totalGuests}</label>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-[#d8ded8] bg-[#f9faf9]">
                            <table className="w-full min-w-[600px] table-fixed border-collapse">
                                <thead>
                                    <tr className="bg-[#f9faf9] text-left text-[#131613] text-sm font-medium leading-normal">
                                        <th className="px-4 py-3 w-[25%]">Name</th>
                                        <th className="px-4 py-3 w-[30%]">Party</th>
                                        <th className="px-4 py-3 w-[15%]">RSVP</th>
                                        <th className="px-4 py-3 w-[20%]">Group Total</th>
                                        <th className="px-4 py-3 w-[10%]">Seating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredGuests.length > 0 ? (
                                        filteredGuests.map(({ name, party, rsvp, pplInGrp, seating }) => (
                                            <tr key={name} className="border-t border-[#d8ded8]">
                                                <td className="px-4 py-2 text-[#131613] text-sm font-normal leading-normal">
                                                    {name}
                                                </td>
                                                <td className="px-4 py-2 text-[#6a7c6a] text-sm font-normal leading-normal">
                                                    {party}
                                                </td>
                                                <td className="px-4 py-2 text-sm font-normal leading-normal">
                                                    <button
                                                        className={`min-w-[84px] h-8 px-4 rounded-xl ${rsvp ? "bg-[#669966] text-white" : "bg-[#ecefec] text-[#131613]"
                                                            }`}
                                                    >
                                                        {rsvp ? "Yes" : "No"}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-2 text-sm font-normal leading-normal">
                                                    {pplInGrp}
                                                </td>
                                                <td className="px-4 py-2 text-sm font-normal leading-normal">
                                                    {seating}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-4 py-8 text-center text-[#6a7c6a] font-medium"
                                            >
                                                No guests found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Add Guest Button */}
                        <div className="mb-4">
                            <button
                                onClick={toggleForm}
                                className="bg-[#4a9f4a] hover:bg-[#3e8640] text-white px-4 py-2 rounded-xl font-semibold"
                            >
                                {showForm ? "Cancel" : "Add Guest"}
                            </button>
                        </div>

                        {/* Add Guest Form */}
                        {showForm && (
                            <form
                                onSubmit={handleAddGuest}
                                className="w-full p-4 mb-4 bg-[#f9faf9] rounded-xl border border-[#d8ded8]"
                            >
                                <div className="flex flex-col gap-3 md:flex-row md:gap-4">
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={newGuest.name}
                                        onChange={handleInputChange}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                                    />
                                    <input
                                        name="party"
                                        type="text"
                                        placeholder="Party"
                                        value={newGuest.party}
                                        onChange={handleInputChange}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                                    />
                                    <label className="flex items-center gap-2">
                                        RSVP
                                        <input
                                            name="rsvp"
                                            type="checkbox"
                                            checked={newGuest.rsvp}
                                            onChange={handleInputChange}
                                            className="w-5 h-5"
                                        />
                                    </label>
                                </div>
                                <div className="flex flex-col gap-3 md:flex-row md:gap-4 mt-3">
                                    <input
                                        name="pplInGrp"
                                        type="text"
                                        placeholder="Group Total"
                                        value={newGuest.pplInGrp}
                                        onChange={handleInputChange}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                                    />
                                    <input
                                        name="seating"
                                        type="text"
                                        placeholder="Seating"
                                        value={newGuest.seating}
                                        onChange={handleInputChange}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-[#4a9f4a] hover:bg-[#3e8640] text-white px-5 py-2 rounded-xl font-semibold"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}