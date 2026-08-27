import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import Login from "./Login";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);

  console.log("LAYOUT AUTH:", { user, loading });

  // Show loader while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Layout;