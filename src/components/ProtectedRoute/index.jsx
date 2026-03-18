import Cookies from "js-cookie";
import { Navigate } from "react-router";
const ProtectedRoute = ({ children }) => {
  if (Cookies.get("email_token") === undefined) {
    return <Navigate to="/login" />;
  }

  return children;
};
export default ProtectedRoute;
