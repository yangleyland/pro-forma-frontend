import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {Pencil2Icon,PersonIcon,CalendarIcon, BarChartIcon, GearIcon, DesktopIcon } from '@radix-ui/react-icons'
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
              <DesktopIcon className="mr-2"  width="18" height="18"  />
              Dashboard
            </li>
          </Link>
          <Link to="/advanced-controls" className="text-black">
            <li className="flex items-center rounded-md py-2 text-sm font-medium mb-2 hover:bg-gray-200 py-1 px-4">
              <GearIcon className="mr-2"  width="18" height="18"  />
              Advanced Controls
            </li>
          </Link>
          <Link to="/yearoveryear" className="">
            <li className="flex items-center rounded-md py-2 text-sm font-medium mb-2 hover:bg-gray-200 py-1 px-4">
              <BarChartIcon className="mr-2"  width="18" height="18"  />
              Year Over Year
            </li>
          </Link>

          <Link to="/phases" className="">
            <li className="flex items-center rounded-md py-2 text-sm font-medium mb-2 hover:bg-gray-200 py-1 px-4">
              <CalendarIcon className="mr-2" width="18" height="18"  />
              Infrastructure Phases
            </li>
          </Link>
          <Link to="/fleet-editor" className="">
            <li className="flex items-center rounded-md py-2 text-sm font-medium mb-2 hover:bg-gray-200 py-1 px-4">
              <Pencil2Icon className="mr-2" width="18" height="18"  />
              Fleet Editor
            </li>
          </Link>

          <Link to="/login" className="text-black">
            <li className="flex items-center rounded-md py-2 text-sm font-medium mb-2 hover:bg-gray-200 py-1 px-4">
              <PersonIcon className="mr-2"  width="18" height="18"  />
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
