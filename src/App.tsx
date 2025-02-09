import { BrowserRouter as Router, Routes, Route } from "react-router";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
