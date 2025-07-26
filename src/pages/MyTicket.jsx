// MyTickets.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("/api/tickets", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTickets(data);
  };

  const requestExchange = async (ticketId) => {
    const receiverId = prompt("Enter the ID of the ticket you want to request");
    if (!receiverId) return;
    const token = localStorage.getItem("token");
    await axios.post(
      "/api/exchange/request",
      { senderTicketId: ticketId, receiverTicketId: receiverId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Exchange request sent!");
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <motion.div className="p-6 text-white">
      <h1 className="text-3xl mb-4">🎟️ My Tickets</h1>
      <div className="grid grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <motion.div
            key={ticket._id}
            className="bg-black bg-opacity-60 p-4 rounded-xl shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold">{ticket.category}</h2>
            <p className="text-sm">{ticket.subcategory}</p>
            <p className="text-xs mt-2">{ticket.description}</p>
            <button
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => requestExchange(ticket._id)}
            >
              Request Exchange
            </bu
