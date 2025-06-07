import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";
import logoImage from "../../assets/logo.svg"; // Import the SVG file

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Authentication and navigation hooks
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine where to redirect after login
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // In a real app, you would validate credentials with a backend API call
      // For now, we'll simulate authentication with a timeout
      if (email && password) {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock authentication - in real world, validate against backend
        // This is a placeholder - replace with actual authentication logic
        const mockToken =
          "mock-jwt-token-" + Math.random().toString(36).substr(2);

        // Call the login function from AuthContext
        login(mockToken);

        // Redirect to dashboard or the originally requested page
        navigate(from, { replace: true });
      } else {
        setError("Please enter both email and password");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log("Forgot password clicked");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={logoImage} alt="Japaflex" className="logo" />
        </div>
        <div className="login-card-inner">
          <div className="login-content">
            <h1 className="welcome-text">
              <span aria-hidden="true">👋</span> Welcome, Admin
            </h1>
            <p className="instruction-text">
              Kindly provide the following details
            </p>

            <form onSubmit={handleSubmit} className="login-form">
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-container">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="visibility-toggle"
                    aria-label="Toggle password visibility"
                    disabled={isLoading}
                  >
                    {passwordVisible ? (
                      <span aria-hidden="true">🙈</span>
                    ) : (
                      <span aria-hidden="true">👁️</span>
                    )}
                  </button>
                </div>
              </div>

              <div className="forgot-password-container">
                <button
                  onClick={handleForgotPassword}
                  className="forgot-password"
                  type="button"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>

          <div className="footer">
            <p>Japaflex © 2024. All right reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
