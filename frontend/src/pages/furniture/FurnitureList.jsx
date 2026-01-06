import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import "./FurnitureList.css";

const FurnitureList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    API.get("/furniture").then(res => {
      setItems(res.data);
      setFilteredItems(res.data);
    });
  }, []);

  useEffect(() => {
    if (categoryFilter) {
      setFilteredItems(items.filter(item => item.category === categoryFilter));
    } else {
      setFilteredItems(items);
    }
  }, [categoryFilter, items]);

  const categories = ["Chair", "Sofa", "Bed", "Table", "Wardrobe", "Desk"];

  return (
    <>
      {/* IKEA STYLE HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Furniture Rental</h1>
          <p className="hero-subtitle">
            Quality furniture rentals made simple and affordable. 
            Create a home that is perfect for you.
          </p>
          <Link to="/furniture" className="btn btn-yellow hero-cta">
            Shop now
          </Link>
        </div>
      </section>

      {/* CATEGORY NAVIGATION */}
      <section className="category-nav">
        <div className="container">
          <div className="category-links">
            <button 
              className={`category-link ${!categoryFilter ? 'active' : ''}`}
              onClick={() => setCategoryFilter("")}
            >
              All Products
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-link ${categoryFilter === cat ? 'active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}s
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <div className="container">
        <div className="products-header">
          <h2 className="section-title">
            {categoryFilter ? `${categoryFilter}s` : 'All Products'} 
            <span className="product-count">({filteredItems.length})</span>
          </h2>
        </div>

        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <p>No furniture available in this category.</p>
          </div>
        ) : (
          <div className="grid">
            {filteredItems.map(f => (
              <Link key={f._id} to={`/furniture/${f._id}`} className="card product-card">
                <div className="product-image-wrapper">
                  <img 
                    src={f.images?.[0] || "https://via.placeholder.com/400x300?text=Furniture"} 
                    alt={f.name}
                    className="product-image"
                  />
                  {f.condition && (
                    <span className="product-badge">{f.condition}</span>
                  )}
                </div>
                <div className="product-content">
                  <h3 className="product-name">{f.name}</h3>
                  <p className="product-category">{f.category}</p>
                  <div className="product-price">
                    <span className="price-currency">₹</span>
                    <span className="price-amount">{f.rentPerMonth}</span>
                    <span className="price-period">/ month</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FurnitureList;