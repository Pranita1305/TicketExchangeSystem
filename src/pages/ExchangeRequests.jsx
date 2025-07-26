// ExchangeRequests.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ExchangeRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("/api/exchange/incoming-requests", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRequests(data);
  };

  const respondRequest = async (id, action) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `/api/exchange/respond/${id}`,
      { status: action },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <motion.div className="p-6 text-white">
      <h1 className="text-3xl mb-4">🔄 Exchange Requests</h1>
      <div className="space-y-4">
        {requests.map((req) => (
          <motion.div
            key={req._id}
            className="bg-black bg-opacity-60 p-4 rounded-xl flex justify-between items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <p className="font-semibold">From: {req.sender?.email}</p>
              <p>Your Ticket ID: {req.receiverTicket}</p>
              <p>Requesting Ticket ID: {req.senderTicket}</p>
            </div>
            <div>
              <button
                onClick={() => respondRequest(req._id, "accepted")}
                className="bg-green-500 px-3 py-1 rounded mr-2"
              >
                Accept
              </button>
              <button
                onClick={() => respondRequest(req._id, "rejected")}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExchangeRequests;
