import { useState } from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen h-screen bg-gray-100">
      <Navbar />
      <Login />
    </div>
  );
}

export default App;
