"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import "../../assets/login.css";
import Navbar from "src/components/Navbar";

export default function Login() {
  const router = useRouter();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    const { email, password } = loginCredentials;
    if (!email || !password) {
      toast.error("Please fill in the form completely");
    } else {
      axios.post("/api/signin", { email, password }).then((result) => {
        if (result.data.Success === true) {
          localStorage.setItem(
            "AuthToken",
            JSON.stringify(result.data.AuthToken)
          );
          toast.success(result.data.msg);
          router.push("/");
        } else {
          toast.error(result.data.msg);
        }
      });

      setLoginCredentials({
        email: "",
        password: "",
      });
    }
  }

  function onChange(event) {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#1a202c" }}
    >
      <div className="form-container bg-white p-5 rounded">
        <h1 className="text-center">Welcome Back to WhisperGram</h1>
        <p className="text-center">Sign in to continue your secret whispers</p>
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={loginCredentials.email}
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={loginCredentials.password}
              onChange={onChange}
              autoComplete="off"
              required
            />
            <small
              className="linkForgotPassword text-center justify-content-center text-black mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/loginOTP");
              }}
            >
              Forgot Password
            </small>
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Log In
          </button>
        </form>
        <p className="text-center mt-3">
          Not Registered?{" "}
          <span
            className="text-black"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
