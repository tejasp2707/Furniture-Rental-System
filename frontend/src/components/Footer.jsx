import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* JOIN SECTION */}
        <div className="footer-join">
          <h3>Join Furniture Rental</h3>
          <p>Enjoy member-only discounts & offers, early access to sales, and much more. Join for free.</p>
          <Link to="/register" className="btn btn-yellow">Join now</Link>
        </div>

        {/* FOOTER LINKS */}
        <div className="footer-links-grid">
          <div className="footer-section">
            <h4>Products</h4>
            <ul>
              <li><Link to="/furniture">Browse Furniture</Link></li>
              <li><Link to="/furniture">Sofas & Armchairs</Link></li>
              <li><Link to="/furniture">Beds & Mattresses</Link></li>
              <li><Link to="/furniture">Tables & Chairs</Link></li>
              <li><Link to="/furniture">Storage & Organization</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><Link to="/furniture">Home Delivery</Link></li>
              <li><Link to="/furniture">Assembly Service</Link></li>
              <li><Link to="/furniture">Interior Design</Link></li>
              <li><Link to="/furniture">Track Your Order</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Help</h4>
            <ul>
              <li><Link to="/furniture">How to Rent</Link></li>
              <li><Link to="/furniture">Return Policy</Link></li>
              <li><Link to="/furniture">Contact Us</Link></li>
              <li><Link to="/furniture">FAQ's</Link></li>
              <li><Link to="/furniture">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>About</h4>
            <ul>
              <li><Link to="/furniture">This is Furniture Rental</Link></li>
              <li><Link to="/furniture">Careers</Link></li>
              <li><Link to="/furniture">Sustainability</Link></li>
              <li><Link to="/furniture">Newsroom</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2024 Furniture Rental. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/furniture">Privacy policy</Link>
            <Link to="/furniture">Cookie policy</Link>
            <Link to="/furniture">Cookie settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;