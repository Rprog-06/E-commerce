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
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (!token) return null;

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" to="/products"><span className="brand-mark">O</span><span>orbit<span className="brand-dot">.</span></span></Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/products">Shop</Link>
          <Link to="/orders">My orders</Link>
          {role === "ROLE_ADMIN" && <Link to="/admin">Admin</Link>}
        </nav>
        <div className="nav-actions">
          <Link className="cart-link" to="/cart" aria-label="Open cart"><span aria-hidden="true">Bag</span><span className="cart-badge">+</span></Link>
          <button className="logout-link" onClick={logout}>Sign out</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
