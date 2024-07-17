"use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Link from "next/link";

export default function Navbar() {
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
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="/" className="text-xl font-bold mb-4 md:mb-0">
          Mystery Message
        </a>
        {decoded ? (
          <>
            <Link href="/dashboard" className="mr-4">
              Welcome, {decoded?.name || decoded?.email}
            </Link>
            <button
              className="w-full md:w-auto"
              onClick={() => {
                localStorage.removeItem("AuthToken");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="w-full md:w-auto"> Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
