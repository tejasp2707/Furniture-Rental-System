import { useState } from "react";
import API from "../../services/api";
import "./CreateFurniture.css";

const CreateFurniture = () => {
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

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
    setImageFiles([...imageFiles, ...files]);
  };

  const removeImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newFiles = imageFiles.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    setImageFiles(newFiles);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      
      // Append form fields
      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });
      
      // Append images
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await API.post("/furniture", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data) {
        alert("Furniture added successfully!");
        window.location.href = "/furniture";
      }
    } catch (err) {
      console.error("Error creating furniture:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to add furniture";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="create-page">
      <div className="create-card">
        <h2>Add New Furniture</h2>
        <p className="subtitle">
          List your furniture for rent in just a few steps
        </p>

        <form onSubmit={submitHandler}>
          {/* IMAGE UPLOAD */}
          <div className="form-group">
            <label>Upload Images</label>
            <div className="image-upload-area" onClick={() => document.getElementById('imageInput').click()}>
              <div className="upload-icon">📷</div>
              <p>Click to upload furniture images</p>
              <small style={{color: '#666'}}>PNG, JPG up to 5MB each</small>
              <input 
                id="imageInput"
                type="file" 
                accept="image/*" 
                multiple 
                onChange={handleImageChange}
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="image-preview">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="preview-item">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <button 
                      type="button"
                      className="remove-image"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Furniture Name *</label>
            <input
              name="name"
              placeholder="Eg: Ergonomic Office Chair"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select name="category" onChange={handleChange} required>
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
              <select name="material" onChange={handleChange} required>
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
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Color</label>
              <input
                name="color"
                placeholder="Eg: Black, Brown"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Condition *</label>
              <select name="condition" onChange={handleChange} required>
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
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="primary-btn">
            Publish Furniture
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFurniture;