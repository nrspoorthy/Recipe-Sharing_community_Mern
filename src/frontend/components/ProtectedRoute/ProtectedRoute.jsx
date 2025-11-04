import React from 'react';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return (
      <div style={{
        textAlign: "center",
        padding: "100px 20px",
      }}>
        <img
          src="/assets/login-required.png" 
          alt="Please login"
          style={{ width: "250px", marginBottom: "20px" }}
        />
        <h2>Please login to explore more</h2>
      </div>
    );
  }

  return children;
}
