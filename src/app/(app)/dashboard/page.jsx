"use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Navbar from "src/components/Navbar";
import Cookies from "js-cookie";

export default function page() {
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const AuthToken = localStorage.getItem("AuthToken");
    if (AuthToken) {
      const decodedToken = jwt.decode(AuthToken);
      setDecoded(decodedToken);
    }
  }, []);
  console.log(decoded);

  return (
    <div>
      <Navbar />
      page
    </div>
  );
}
