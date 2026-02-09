import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { getImageUrl } from "../../services/api";
import "./CreateFurniture.css";

const EditFurniture = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    material: "",
    dimensions: "",
    color: "",
    brand: "",
    rentPerMonth: "",
    securityDeposit: "",
    condition: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get(`/furniture/${id}`)
      .then(res => {
        const furniture = res.data;
        setForm({
          name: furniture.name || "",
          category: furniture.category || "",
          material: furniture.material || "",
          dimensions: furniture.dimensions || "",
          color: furniture.color || "",
          brand: furniture.brand || "",
          rentPerMonth: furniture.rentPerMonth || "",
          securityDeposit: furniture.securityDeposit || "",
          condition: furniture.condition || ""
        });
      })
      .catch(err => {
        alert("Failed to load furniture details");
        navigate("/furniture");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await API.put(`/furniture/${id}`, form);
      alert("Furniture updated successfully!");
      navigate(`/furniture/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update furniture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page">
      <div className="create-card">
        <h2>Edit Furniture</h2>
        <p className="subtitle">
          Update your furniture listing
        </p>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>Furniture Name *</label>
            <input
              name="name"
              placeholder="Eg: Ergonomic Office Chair"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option>Chair</option>
                <option>Sofa</option>
                <option>Bed</option>
                <option>Table</option>
                <option>Wardrobe</option>
                <option>Desk</option>
              </select>
            </div>

            <div className="form-group">
              <label>Material *</label>
              <select name="material" value={form.material} onChange={handleChange} required>
                <option value="">Select Material</option>
                <option>Wood</option>
                <option>Metal</option>
                <option>Plastic</option>
                <option>Fabric</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Brand</label>
              <input
                name="brand"
                placeholder="Eg: Featherlite, IKEA"
                value={form.brand}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Color</label>
              <input
                name="color"
                placeholder="Eg: Black, Brown"
                value={form.color}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Condition *</label>
              <select name="condition" value={form.condition} onChange={handleChange} required>
                <option value="">Select Condition</option>
                <option>New</option>
                <option>Good</option>
                <option>Used</option>
              </select>
            </div>

            <div className="form-group">
              <label>Dimensions</label>
              <input
                name="dimensions"
                placeholder="Eg: 120x60x75 cm"
                value={form.dimensions}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rent per Month (₹) *</label>
              <input
                type="number"
                name="rentPerMonth"
                placeholder="1500"
                value={form.rentPerMonth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Security Deposit (₹) *</label>
              <input
                type="number"
                name="securityDeposit"
                placeholder="3000"
                value={form.securityDeposit}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Updating..." : "Update Furniture"}
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
  );
};

export default EditFurniture;

