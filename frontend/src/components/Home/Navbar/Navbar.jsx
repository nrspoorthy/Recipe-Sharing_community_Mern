import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../../config";

export default function Navbar({ onLogout }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const isAboutOrGalleryOrLogin =
    location.pathname === "/about" ||
    location.pathname === "/gallery" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);

    alert("Logged out successfully!");
    if (onLogout) onLogout();

    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAuthenticated", "true");
        alert("Login successful!");
        setShowLogin(false);
        setError("");
        setIsAuthenticated(true);
        window.dispatchEvent(new Event("storage"));
        navigate("/");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  // Google login
  const handleGoogleSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    console.log("Google user:", decoded);

    localStorage.setItem("isAuthenticated", "true");
    alert("Login successful!");
    setShowLogin(false);
    setIsAuthenticated(true);

    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const handleGoogleError = () => {
    setError("Google Sign-In failed. Please try again.");
  };

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please log in.");
        setShowRegister(false);
        setShowLogin(true);
        setError("");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  const closeModal = () => {
    setShowLogin(false);
    setShowRegister(false);
    setEmail("");
    setPassword("");
    setName("");
    setError("");
  };

  return (
    <>
      <div
        className={`background ${
          isAboutOrGalleryOrLogin ? "about-gallery-bg" : ""
        }`}
      >
        <div className="navbar">
          {/* Logo */}
          <Link  to="/">
          <img
            src={
              isAboutOrGalleryOrLogin
                ? "https://foodily.vercel.app/assets/images/logo-2.png"
                : "https://foodily.vercel.app/assets/images/logo.png"
            }
            className="logo"
            alt="logo"
          />
          </Link>

          {/* Hamburger */}
          <div className="hamburger" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>

          {/* Navbar Links */}
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <ul className="ul">
              <li>
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/menu"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Menu
                </Link>
              </li>

              <li>
                <Link
                  to="/gallery"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Gallery
                </Link>
              </li>

              
              {!isAuthenticated ? (
                <li>
                  <span
                    className="nav-link"
                    onClick={() => {
                      setShowLogin(true);
                      setMenuOpen(false); //  CLOSE MENU
                    }}
                  >
                    Login
                  </span>{" "}
                  /{" "}
                  <span
                    className="nav-link"
                    onClick={() => {
                      setShowRegister(true);
                      setMenuOpen(false); //  CLOSE MENU
                    }}
                  >
                    Register
                  </span>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/mylist"
                      className="nav-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      Wishlist
                    </Link>
                  </li>

                  <li>
                    <button
                      className="logout-btn nav-link"
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false); // 🔥 close menu on logout
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>Welcome back</h2>
            <p>Please log in to continue sharing recipes.</p>

            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />

            <div className="divider">
              <span>or sign in with email</span>
            </div>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="login-btn">
                Sign In
              </button>
            </form>

            {error && <p className="error">{error}</p>}

            <p>
              Don’t have an account?{" "}
              <span
                className="switch-link"
                onClick={() => {
                  setShowLogin(false);
                  setShowRegister(true);
                }}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>Create an Account</h2>
            <p>Join our community of food lovers!</p>

            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="login-btn">
                Register
              </button>
            </form>

            {error && <p className="error">{error}</p>}

            <p>
              Already have an account?{" "}
              <span
                className="switch-link"
                onClick={() => {
                  setShowRegister(false);
                  setShowLogin(true);
                }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
