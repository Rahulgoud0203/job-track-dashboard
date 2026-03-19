import Cookies from "js-cookie";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("email_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default ProtectedRoute;
