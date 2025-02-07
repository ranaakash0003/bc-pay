import { BrowserRouter as Router, Routes, Route } from "react-router";
import Dashboard from "./pages/dashboard/Dashboard";
import About from "./pages/about/About";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* Redirect unknown routes */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
