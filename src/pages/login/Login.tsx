import { useState } from "react";
import { useNavigate } from "react-router";
import { authenticateUser } from "@/utils";
import { PENALTY_DATA } from "../../data";
import Button from "@/components/Button";

const Login = () => {
  const [email, setEmail] = useState("hr@kaz.info");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = authenticateUser(email, password);
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
      if (!localStorage.getItem("penalties")) {
        localStorage.setItem("penalties", JSON.stringify(PENALTY_DATA));
        window.dispatchEvent(new Event("penaltiesUpdated"));
      }
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[400px] h-[450px] bg-white flex flex-col items-center justify-start shadow-md rounded-lg p-10">
        <h1 className="text-center text-2xl font-bold mb-4">BC Pay</h1>
        <h1 className="mb-4 text-lg font-normal">Sign In to your account</h1>
        <p className="mb-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <span className="primary-clr font-medium">Wait</span>
        </p>

        <div className="mb-4 mt-4 flex flex-col">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            className="mb-4 border-b border-gray-300 w-64 outline-none"
          />

          <label className="mt-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            className="mb-4 border-b border-gray-300 w-64 outline-none"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <Button className="px-4 py-[10px]  w-64" onClick={handleLogin}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Login;
