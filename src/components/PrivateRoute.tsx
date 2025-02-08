import { Navigate } from "react-router";

type PrivateRoutePropsTypes = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRoutePropsTypes> = ({ children }) => {
  const authUser = localStorage.getItem("authUser");

  return authUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
