import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../app/features/authSlice";
const Navbar = () => {

  const {user} = useSelector(state=>state.auth)

  const dispatch = useDispatch()
  
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout())

  };

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-13 py-5 text-slate-800 transition-all">

        {/* Logo */}
        <Link to="/">
          <img
            src="/logo.png"
            alt="logo"
            className="h-11 w-auto"
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4 text-sm">

          <p className="max-sm:hidden">
            Hi, {user?.name}
          </p>

          <Link
            to="/app"
            className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-1.5 rounded-full active:scale-95 transition-all"
          >
            Dashboard
          </Link>

          <button
            onClick={logoutUser}
            className="bg-orange-200 hover:bg-orange-300 border border-orange-700 px-7 py-1.5 rounded-full active:scale-95 transition-all"
          >
            Logout
          </button>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;