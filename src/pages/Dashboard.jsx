// Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/exchange/my-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats({ total: data.length, pending: data.filter(r => r.status === 'pending').length });
    };
    fetchStats();
  }, []);

  return (
    <motion.div
      className="p-6 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl mb-4">📊 Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-black bg-opacity-50 p-4 rounded-2xl shadow-md">
          <h2 className="text-xl">🎫 Total Exchange Requests</h2>
          <p className="text-2xl">{stats.total}</p>
        </div>
        <div className="bg-black bg-opacity-50 p-4 rounded-2xl shadow-md">
          <h2 className="text-xl">⏳ Pending Requests</h2>
          <p className="text-2xl">{stats.pending}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
