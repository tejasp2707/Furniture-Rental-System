import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user") || "{}") : null;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* LOGO */}
        <Link to="/" className="logo">
          <span className="logo-text">FURNITURE RENTAL</span>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="nav-links">
          <Link to="/furniture" className="nav-link">Products</Link>
        </div>

        {/* RIGHT SECTION */}
        <div className="nav-right">
          {/* SEARCH */}
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
            />
            <span className="search-icon">🔍</span>
        </div>

          {/* USER SECTION */}
          {token ? (
            <>
              <Link to="/dashboard/user" className="nav-icon">
                <span className="icon-label">Account</span>
              </Link>
              {user?.role === 'admin' && (
                <Link to="/dashboard/system" className="nav-icon">
                  <span className="icon-label">Admin</span>
                </Link>
              )}
              <Link to="/create-furniture" className="nav-icon">
                <span className="icon-label">List Item</span>
              </Link>
              <button className="nav-icon logout-btn" onClick={logout}>
                <span className="icon-label">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-icon">
                <span className="icon-label">Log in</span>
              </Link>
              <Link to="/register" className="btn btn-yellow">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
