import { useEffect, useState } from "react";
import API, { getImageUrl } from "../../services/api";
import "./UserDashboard.css";

const SystemDashboard = () => {
  const [available, setAvailable] = useState([]);
  const [rented, setRented] = useState([]);

  const loadDashboard = async () => {
    try {
      const res = await API.get("/dashboard/system");
      setAvailable(res.data.available || []);
      setRented(res.data.rented || []);
    } catch (err) {
      console.error("Failed to load system dashboard:", err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>System Dashboard</h1>
        <p>Overview of all furniture and rentals in the system</p>
      </div>

      <section className="dashboard-section">
        <h2>Available Furniture ({available.length})</h2>
        <div className="dashboard-grid">
          {available.length === 0 && (
            <p className="empty-text">No available furniture in the system.</p>
          )}
          {available.map(item => (
            <div key={item._id} className="dashboard-card">
              {item.images?.[0] && (
                <img 
                  src={getImageUrl(item.images[0])} 
                  alt={item.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '12px' }}
                />
              )}
              <h3>{item.name}</h3>
              <p className="small-text">{item.category} • {item.material}</p>
              <p className="small-text">₹{item.rentPerMonth}/month</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Active Rentals ({rented.length})</h2>
        {rented.length === 0 && (
          <p className="empty-text">No active rentals in the system.</p>
        )}
        {rented.map(r => (
          <div key={r._id} className="rental-row">
            <div>
              <strong>{r.furniture?.name || "Unknown Furniture"}</strong>
              <p className="small-text">
                Rented by: {r.rentedBy?.name || "Unknown User"}
              </p>
              <p className="small-text">
                {new Date(r.rentedFrom).toDateString()} →{" "}
                {new Date(r.rentedTill).toDateString()}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SystemDashboard;
