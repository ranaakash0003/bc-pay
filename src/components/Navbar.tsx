import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="w-full h-16 flex items-center justify-between bg-primary-clr bg-white border-b border-b-black">
      <h1 className="text-2xl font-bold ml-4">BC Pay</h1>
      <div className="w-[80%] flex items-center justify-evenly px-4">
        <input
          className="w-[400px] border border-black rounded-md px-2 py-1"
          type="text"
          placeholder="Search"
        />
        <span>About us</span>
        <span>Contact us</span>
      </div>
    </header>
  );
};

export default Navbar;
