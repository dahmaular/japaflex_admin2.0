import React, { useState } from "react";
import "./styless.css";
import { useAssignAdminMutation } from "../../../store/apiSlice";

function CreateAdmin() {
  const [assignAdmin, { isLoading, isSuccess, isError, error }] = useAssignAdminMutation();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    role: "Admin"
  });

  // Validation state
  const [errors, setErrors] = useState({
    email: "",
    role: ""
  });

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

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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

      assignAdmin(formData);

      if (isSuccess) {
        setFormData({
          email: "",
          role: "Admin"
        });
      }

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
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>

            {isSuccess && (
              <div className="success-message">Admin created successfully!</div>
            )}

            {isError && (
              <div className="error-message">{(error as any)?.data?.error ?? "An error occured"}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAdmin;
