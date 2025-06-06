import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#1c1c3c] shadow-md">
      <h1 className="text-neon font-bold text-2xl">TicketX</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-neon transition">Home</Link>
        <Link to="/exchange" className="hover:text-neon transition">Exchange</Link>
      </div>
    </nav>
  );
};

export default Navbar;