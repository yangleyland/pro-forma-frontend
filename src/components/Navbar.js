import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import { LuBarChart3,LuCog,LuAreaChart} from "react-icons/lu";
import useAuthStore from "../store/useAuthStore";


// src/Navbar.js

const Navbar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  }
  return (
    <div className="h-screen w-1/6 bg-white border-r fixed">
      <div className="flex items-center justify-left h-16 pl-4">
        <img src="/optony.png" alt="Logo" className="h-8" />
      </div>
      <nav className=" p-5">
        <ul className="">
          <Link to="/" className="text-black">
            <li className="flex items-center rounded-md py-2 text-sm font-medium mb-2 hover:bg-gray-200 py-1 px-4">
              <LuBarChart3 className="mr-2" size={20} />
              Dashboard
            </li>
          </Link>
          <Link to="/advanced-controls" className="text-black">
            <li className="flex items-center rounded-md py-2 text-sm font-medium mb-2 hover:bg-gray-200 py-1 px-4">
              <LuCog className="mr-2"  size={20} />
              Advanced Controls
            </li>
          </Link>
          <Link to="/yearoveryear" className="">
            <li className="flex items-center rounded-md py-2 text-sm font-medium mb-2 hover:bg-gray-200 py-1 px-4">
              <LuAreaChart className="mr-2"  size={20} />
              Year Over Year
            </li>
          </Link>

          <Link to="/phases" className="">
            <li className="flex items-center rounded-md py-2 text-sm font-medium mb-2 hover:bg-gray-200 py-1 px-4">
              <FaCalendarAlt className="mr-2"  size={20} />
              Infrastructure Phases
            </li>
          </Link>

          <Link to="/login" className="text-black">
            <li className="flex items-center rounded-md py-2 text-sm font-medium mb-2 hover:bg-gray-200 py-1 px-4">
              <FaSignInAlt className="mr-2"  size={20} />
              Login
            </li>
          </Link>
        </ul>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </nav>
    </div>
  );
};

export default Navbar;
