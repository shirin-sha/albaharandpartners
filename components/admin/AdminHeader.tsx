"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminHeader() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("adminUser");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin");
  };

  return (
    <header
      className="admin-header"
      style={{
        height: "81px",
        background: "var(--white)",
        borderBottom: "1px solid var(--outline)",
        position: "fixed",
        top: 0,
        left: "260px",
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        zIndex: 99,
      }}
    >
      {/* Left Section - Page Title or Breadcrumb */}
      <div className="header-left">
      
      </div>

      {/* Right Section - User Info & Logout */}
      <div
        className="header-right"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* User Info */}
        {user && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--white)",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "var(--on-suface-container)",
                }}
              >
                {user.name || "Admin"}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--on-suface-variant-1)",
                }}
              >
                {user.email}
              </span>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "transparent",
            border: "1px solid var(--outline)",
            borderRadius: "8px",
            color: "var(--on-suface-container)",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg-1)";
            e.currentTarget.style.borderColor = "var(--primary)";
            e.currentTarget.style.color = "var(--primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "var(--outline)";
            e.currentTarget.style.color = "var(--on-suface-container)";
          }}
        >
          <i className="icon-SignOut" style={{ fontSize: "18px" }}></i>
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
