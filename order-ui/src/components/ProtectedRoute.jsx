import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function ProtectedRoute({ children,role }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
  const decoded=jwtDecode(token)
  if(role && decoded.role !== "ROLE_"+role){
    return <Navigate to="/products"/>
  }

  return children;
}

export default ProtectedRoute;