
import React, { useState } from "react";
import axios from "axios";

const Exchange = () => {
  const [fromTicket, setFromTicket] = useState("");
  const [toTicket, setToTicket] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/exchange/request", {
        fromTicket,
        toTicket,
      });
      setMessage(res.data.message || "Exchange request submitted successfully.");
      setFromTicket("");
      setToTicket("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6 text-neon">Exchange Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card: Offer a Ticket */}
        <div className="bg-[#1f1f3d] p-6 rounded-2xl shadow-lg border border-[#38BDF8]/10">
          <h3 className="text-xl font-semibold mb-4">Offer a Ticket</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-1">Your Ticket ID</label>
              <input
                type="text"
                value={fromTicket}
                onChange={(e) => setFromTicket(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#2a2a4d] border border-[#38BDF8]/20 focus:outline-none focus:ring-2 focus:ring-neon"
                placeholder="Enter your ticket ID"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Target Ticket ID</label>
              <input
                type="text"
                value={toTicket}
                onChange={(e) => setToTicket(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#2a2a4d] border border-[#38BDF8]/20 focus:outline-none focus:ring-2 focus:ring-neon"
                placeholder="Enter ticket you want"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-neon px-6 py-2 rounded-lg font-semibold text-black hover:scale-105 transition"
            >
              Request Exchange
            </button>
            {message && (
              <p className="text-sm mt-2 text-neon">{message}</p>
            )}
          </form>
        </div>

        {/* Card: Instructions or Info */}
        <div className="bg-[#1f1f3d] p-6 rounded-2xl shadow-lg border border-[#38BDF8]/10">
          <h3 className="text-xl font-semibold mb-4">How it works</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Enter your current ticket ID.</li>
            <li>Specify the ticket ID you want.</li>
            <li>Submit a request — the owner will be notified.</li>
            <li>Once accepted, tickets will be swapped securely.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
