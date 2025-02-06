import React from "react";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[400px] h-[500px] bg-white flex flex-col items-center justify-center shadow-md rounded-lg">
        <h1 className="text-center text-3xl font-medium mb-4">BC Pay</h1>
        <h1 className="mb-4 text-lg font-normal">Sign In to your account</h1>
        <p className="mb-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="#" className="primary-clr">
            Sign Up
          </a>
        </p>
        <div className="mb-4 mt-4 flex flex-col">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            className="mb-4 px-3 border-b border-gray-300 w-64 outline-none"
          />

          <label className="mt-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="mb-4 px-3 border-b border-gray-300 w-64 outline-none"
          />
        </div>

        <button className="primary-bg text-white px-4 py-2 rounded-md w-64">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
