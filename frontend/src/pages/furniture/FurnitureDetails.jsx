import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API, { getImageUrl } from "../../services/api";
import "./FurnitureDetails.css";

const FurnitureDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [furniture, setFurniture] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    API.get(`/furniture/${id}`)
      .then(res => setFurniture(res.data))
      .catch(err => {
        console.error("Failed to load furniture:", err);
        alert("Failed to load furniture details");
        navigate("/furniture");
      });
  }, [id, navigate]);

  if (!furniture) return <p className="loading">Loading...</p>;

  const isOwner = user && furniture.listedBy && furniture.listedBy.toString() === user._id;
  const images = furniture.images?.length > 0 
    ? furniture.images.map(img => getImageUrl(img))
    : ["https://via.placeholder.com/600x500?text=Furniture"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="details-container">
      <div className="details-card">
        <div className="image-section">
          <div className="main-image-container">
            <img
              src={images[currentImageIndex]}
              alt={furniture.name}
              className="main-image"
            />
            
            {images.length > 1 && (
              <>
                <button className="nav-btn prev-btn" onClick={prevImage}>
                  ‹
                </button>
                <button className="nav-btn next-btn" onClick={nextImage}>
                  ›
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="thumbnail-container">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${furniture.name} ${idx + 1}`}
                  className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="info-section">
          <div className="product-header">
            <h1 className="product-title">{furniture.name}</h1>
            <span className="badge">{furniture.condition}</span>
          </div>

          <p className="product-category">
            {furniture.category} • {furniture.material}
          </p>

          <div className="price-section">
            <div className="price-box">
              <span className="price-currency">₹</span>
              <span className="price-amount">{furniture.rentPerMonth}</span>
              <span className="price-period">/ month</span>
            </div>
            <p className="security-deposit">Security Deposit: ₹{furniture.securityDeposit}</p>
          </div>

          <div className="specs-section">
            <h3 className="specs-title">Product Details</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <label>Dimensions</label>
                <span>{furniture.dimensions || "N/A"}</span>
              </div>
              <div className="spec-item">
                <label>Brand</label>
                <span>{furniture.brand || "N/A"}</span>
              </div>
              <div className="spec-item">
                <label>Color</label>
                <span>{furniture.color || "N/A"}</span>
              </div>
              <div className="spec-item">
                <label>Material</label>
                <span>{furniture.material || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="action-section">
            {isOwner ? (
              <Link to={`/edit-furniture/${furniture._id}`} className="btn btn-outline">
                Edit Furniture
              </Link>
            ) : furniture.availabilityStatus === "Rented" ? (
              <button className="btn btn-outline" disabled>
                Currently Rented
              </button>
            ) : !user ? (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/register")}
              >
                Login to Rent
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/rent/${furniture._id}`)}
              >
                Rent This Furniture
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureDetails;