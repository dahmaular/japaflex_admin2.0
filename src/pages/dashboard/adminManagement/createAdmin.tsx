import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styless.css";
import admin from "../../../assets/admin.svg";
import filter from "../../../assets/filter.svg";

function CreateAdmin() {
  const navigate = useNavigate();
  const [activeTimeFilter, setActiveTimeFilter] = useState<"week" | "year">(
    "week"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "Admin"
  });

  // Validation state
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: ""
  });

  // Form submission state
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form
  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      valid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    // Validate role
    if (!formData.role) {
      newErrors.role = "Role is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log("Form data submitted:", formData);
        setSubmitSuccess(true);
        setSubmitting(false);
        
        // Reset form after success
        // Uncomment if you want to reset the form after submission
        // setFormData({
        //   name: "",
        //   lastName: "",
        //   email: "",
        //   password: "",
        //   role: "Admin"
        // });
      }, 1000);
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>Create Admin</h1>
        <p className="subtitle">Manage admins and set their access level.</p>
      </div>

      <div className="users-section">
        <div className="admin-form-container">
          <form onSubmit={handleSubmit} className="admin-creation-form">
            <div className="form-group">
              <label htmlFor="name">
                Name <span className="required-mark">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="James"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span className="required-mark">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="James"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? "input-error" : ""}
              />
              {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required-mark">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="James@japaflex.com"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password <span className="required-mark">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="role">
                Role <span className="required-mark">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={errors.role ? "input-error" : ""}
              >
                <option value="Admin">Admin</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="Support">Support</option>
              </select>
              {errors.role && <div className="error-message">{errors.role}</div>}
            </div>

            <p className="info-text">Invites will be sent automatically to the mail of the recipient</p>

            <button 
              type="submit" 
              className="save-button"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save"}
            </button>

            {submitSuccess && (
              <div className="success-message">Admin created successfully!</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAdmin;
