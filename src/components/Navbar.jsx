"use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Link from "next/link";

export default function Navbar() {
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const AuthToken = localStorage.getItem("AuthToken");
    if (AuthToken) {
      const decodedToken = jwt.decode(AuthToken);
      setDecoded(decodedToken);
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
            <span className="mr-4">
              Welcome, {decoded?.name || decoded?.email}
            </span>
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
