"use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Navbar from "src/components/Navbar";

export default function page() {
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const AuthToken = localStorage.getItem("AuthToken");
    if (AuthToken) {
      const decodedToken = jwt.decode(AuthToken);
      setDecoded(decodedToken);
    }
  }, []);

  return <div>page</div>;
}
