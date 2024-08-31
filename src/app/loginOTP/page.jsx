"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import "../../assets/login.css";
import Navbar from "src/components/Navbar";

export default function LoginViaOTP() {
  const router = useRouter();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [otp, setOTP] = useState("");
  const [loginViaOTP, setLoginViaOTP] = useState(true);
  const [enterOTP, setEnterOTP] = useState(false);

  function onChange(event) {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  }

  function onOTPChange(event) {
    setOTP(event.target.value);
  }

  function sendOTP(event) {
    event.preventDefault();
    const { email } = loginCredentials;
    if (!email) {
      toast.error("Please fill in the email address");
    } else {
      axios.post("/api/sendOTP", { email }).then((result) => {
        if (result.data.Success === true) {
          setLoginViaOTP(false);
          setEnterOTP(true);
          toast.success("OTP sent");
        } else {
          toast.error("You have not registered yet.\nPlease Register First");
        }
      });
    }
  }

  function verifyOTP(event) {
    event.preventDefault();
    const { email } = loginCredentials;
    console.log(email, otp);
    if (!email || !otp) {
      toast.error("Please fill in the OTP");
    } else {
      axios.post("/api/checkOTP", { email, otp }).then((result) => {
        console.log(result);
        if (result.data.Success === true) {
          localStorage.setItem(
            "AuthToken",
            JSON.stringify(result.data.AuthToken)
          );
          router.push("/");
          toast.success(result.data.message);
        } else {
          toast.error(result.data.message);
        }
      });
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#1a202c" }}
    >
      <div className="form-container bg-white p-5 rounded">
        {loginViaOTP && (
          <>
            <h1 className="text-center">Password Assistance</h1>
            <form onSubmit={sendOTP}>
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
              <button type="submit" className="btn btn-dark w-100">
                Send OTP
              </button>
            </form>
          </>
        )}
        {enterOTP && (
          <>
            <h1 className="text-center">OTP Verification</h1>
            <form onSubmit={verifyOTP}>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  OTP
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={onOTPChange}
                  autoComplete="off"
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-dark w-100 me-3">
                  Verify OTP
                </button>
                <button
                  type="button"
                  className="btn btn-dark w-100"
                  onClick={sendOTP}
                >
                  Resend OTP
                </button>
              </div>
            </form>
          </>
        )}
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
