import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { getUserInfo } from "../utils";
import useClickOutside from "@/hooks/useClickOutside";
import Button from "./Button";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = getUserInfo();
  const dropdownRef = useClickOutside(() => setDropdownOpen(false));

  const handleLogout = () => {
    setDropdownOpen(false);
    localStorage.removeItem("authUser");
    navigate("/");
  };

  return (
    <header className="w-full h-16 flex items-center justify-between bg-white border-b px-4">
      <h1 className="text-2xl font-bold">BC Pay</h1>
      <div className="flex items-center gap-6">
        <input
          className="w-[200px] border border-gray-400 rounded-md px-3 py-1 outline-none"
          type="text"
          placeholder="Search"
        />

        {user ? (
          <div className="relative">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full primary-bg text-white text-lg font-semibold cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.email.charAt(0).toUpperCase()}
            </div>

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md py-2"
              >
                <div className="px-4 py-2 border-b border-gray-200 ">
                  <p className="text-sm font-semibold text-gray-700">Profile</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                <Button
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-500"
                  onClick={handleLogout}
                  variant="link"
                >
                  Sign out
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="primary-clr">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
