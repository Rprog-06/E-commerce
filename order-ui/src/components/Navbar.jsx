import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let role=null;
  if(token){  
    role=jwtDecode(token).role
  }

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!token) return null;

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      {
        role==="ROLE_ADMIN"&&(
          <Link to="/admin">Admin</Link>
        )
      }|{" "}
      <Link to="/products">Products</Link> |{" "}
      <Link to="/cart">Cart</Link> |{" "}
      <Link to="/orders">My Orders</Link> |{" "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
