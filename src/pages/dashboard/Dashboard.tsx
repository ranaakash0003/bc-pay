import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HrView from "./components/HrView";
import TeamLeadView from "./components/TeamLeadView";
import CeoView from "./components/CeoView";

type AuthUserTypes = {
  email: string;
  role: "hr" | "teamlead" | "ceo";
};

const Dashboard = () => {
  const [user, setUser] = useState<AuthUserTypes | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="flex flex-col items-center min-h-screen secondary-bg">
      {user.role === "hr" && <HrView />}
      {user.role === "teamlead" && <TeamLeadView />}
      {user.role === "ceo" && <CeoView />}
    </div>
  );
};

export default Dashboard;
