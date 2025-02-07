import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authUser = localStorage.getItem("authUser");

  return authUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
