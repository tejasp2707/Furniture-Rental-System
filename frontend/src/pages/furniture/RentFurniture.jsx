import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { getImageUrl } from "../../services/api";
import "./FurnitureDetails.css";
import "./RentFurniture.css";

const RentFurniture = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [furniture, setFurniture] = useState(null);
  const [rentedFrom, setRentedFrom] = useState("");
  const [rentedTill, setRentedTill] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get(`/furniture/${id}`)
      .then(res => {
        setFurniture(res.data);
        // Set default dates (today and 30 days from now)
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setDate(today.getDate() + 30);
        setRentedFrom(today.toISOString().split('T')[0]);
        setRentedTill(nextMonth.toISOString().split('T')[0]);
      })
      .catch(err => {
        alert("Failed to load furniture details");
        navigate("/furniture");
      });
  }, [id, navigate]);

  const handleRent = async (e) => {
    e.preventDefault();
    
    if (!rentedFrom || !rentedTill) {
      alert("Please select rental dates");
      return;
    }

    if (new Date(rentedTill) <= new Date(rentedFrom)) {
      alert("Return date must be after rental start date");
      return;
    }

    // Check if furniture is still available
    if (furniture.availabilityStatus === "Rented") {
      alert("This furniture is already rented");
      navigate("/furniture");
      return;
    }

    setLoading(true);
    try {
      await API.post(`/furniture/${id}/rent`, {
        rentedFrom,
        rentedTill
      });
      alert("Furniture rented successfully!");
      navigate("/dashboard/user");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to rent furniture");
    } finally {
      setLoading(false);
    }
  };

  if (!furniture) return <p className="loading">Loading...</p>;

  const images = furniture.images?.length > 0 
    ? furniture.images.map(img => getImageUrl(img))
    : ["https://via.placeholder.com/600x500?text=Furniture"];

  return (
    <div className="details-container">
      <div className="details-card">
        <div className="image-section">
          <div className="main-image-container">
            <img
              src={images[0]}
              alt={furniture.name}
              className="main-image"
            />
          </div>
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

          <form onSubmit={handleRent} className="rent-form">
            <h3 className="specs-title">Rental Period</h3>
            
            <div className="form-group">
              <label>Rental Start Date *</label>
              <input
                type="date"
                value={rentedFrom}
                onChange={(e) => setRentedFrom(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Rental End Date *</label>
              <input
                type="date"
                value={rentedTill}
                onChange={(e) => setRentedTill(e.target.value)}
                min={rentedFrom || new Date().toISOString().split('T')[0]}
                required
                className="form-input"
              />
            </div>

            <div className="action-section">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Rental"}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate(`/furniture/${id}`)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RentFurniture;

