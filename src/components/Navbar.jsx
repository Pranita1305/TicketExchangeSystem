import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center neon-border">
      <h1 className="text-xl font-bold neon-text">TicketX</h1>
      <div className="flex gap-4">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/my-tickets">My Tickets</Link>
            <Link to="/exchange-requests">Exchange</Link>
            <button onClick={logout} className="text-red-400 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
