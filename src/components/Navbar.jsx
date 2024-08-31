"use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [decoded, setDecoded] = useState({});
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuthToken = JSON.parse(localStorage.getItem("AuthToken"));
      if (storedAuthToken) {
        setAuthToken(storedAuthToken);
        const decodedToken = jwt.decode(storedAuthToken);
        setDecoded(decodedToken);
      }
    }
  }, []);

  return (
    <nav
      className="navbar navbar-expand-md shadow-sm py-5"
      style={{ backgroundColor: "rgb(17 24 39)" }}
    >
      <div className="container">
        <Link
          href="/"
          className="navbar-brand text-white"
          style={{ textDecoration: "none" }}
        >
          WhisperGram
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {decoded.name !== undefined && (
              <li className="nav-item">
                <span
                  className="nav-link text-white"
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push("/dashboard")}
                >
                  Welcome, {decoded?.name || decoded?.email}
                </span>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {decoded.name !== undefined ? (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-white"
                    onClick={() => {
                      localStorage.removeItem("AuthToken");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/login">
                    <button className="btn text-white">Login</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
