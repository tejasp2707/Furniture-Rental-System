import { useEffect, useState } from "react";
import API from "../../services/api";
import "./UserDashboard.css";

import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const UserDashboard = () => {
  const [listed, setListed] = useState([]);
  const [rented, setRented] = useState([]);
  const [history, setHistory] = useState([]);

  const loadDashboard = async () => {
    const res = await API.get("/dashboard/user");
    setListed(res.data.listed);
    setRented(res.data.rented);
    setHistory(res.data.history);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const returnFurniture = async (id) => {
    await API.post(`/furniture/${id}/return`);
    loadDashboard();
  };

  /* ===== CHART DATA (SOFT PINK THEME) ===== */

  const statusChartData = {
    labels: ["Listed", "Active Rentals", "Returned"],
    datasets: [
      {
        data: [listed.length, rented.length, history.length],
        backgroundColor: [
          "#f9a8d4", // soft pink
          "#f472b6", // rose
          "#e5e7eb"  // gray
        ],
        borderWidth: 0
      }
    ]
  };

  const activityChartData = {
    labels: ["Active Rentals", "Completed Rentals"],
    datasets: [
      {
        label: "Rentals",
        data: [rented.length, history.length],
        backgroundColor: ["#f472b6", "#fbcfe8"],
        borderRadius: 10
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#6b7280",
          font: { size: 13 }
        }
      }
    }
  };

  return (
    <div className="dashboard-page">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p>Overview of your listings and rentals</p>
      </div>

      {/* ===== CHARTS ===== */}
      <div className="chart-grid">
        <div className="chart-card">
          <h3>Furniture Status</h3>
          <Pie data={statusChartData} options={chartOptions} />
        </div>

        <div className="chart-card">
          <h3>Rental Activity</h3>
          <Bar data={activityChartData} options={chartOptions} />
        </div>
      </div>

      {/* ===== MY LISTINGS ===== */}
      <section className="dashboard-section">
        <h2>My Listings</h2>

        <div className="dashboard-grid">
          {listed.length === 0 && (
            <p className="empty-text">You haven’t listed any furniture yet.</p>
          )}

          {listed.map(item => (
            <div key={item._id} className="dashboard-card">
              <h3>{item.name}</h3>
              <span className={`status ${item.availabilityStatus.toLowerCase()}`}>
                {item.availabilityStatus}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ACTIVE RENTALS ===== */}
      <section className="dashboard-section">
        <h2>Active Rentals</h2>

        {rented.length === 0 && (
          <p className="empty-text">No active rentals right now.</p>
        )}

        {rented.map(r => (
          <div key={r._id} className="rental-row">
            <div>
              <strong>{r.furniture.name}</strong>
              <p className="small-text">
                {new Date(r.rentedFrom).toDateString()} →{" "}
                {new Date(r.rentedTill).toDateString()}
              </p>
            </div>

            <button
              className="danger-btn"
              onClick={() => returnFurniture(r.furniture._id)}
            >
              Return
            </button>
          </div>
        ))}
      </section>

      {/* ===== RENTAL HISTORY ===== */}
      <section className="dashboard-section">
        <h2>Rental History</h2>

        <div className="dashboard-grid">
          {history.length === 0 && (
            <p className="empty-text">No completed rentals yet.</p>
          )}

          {history.map(r => (
            <div key={r._id} className="dashboard-card">
              <h3>{r.furniture.name}</h3>
              <p className="small-text">
                Returned on {new Date(r.returnedAt).toDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
