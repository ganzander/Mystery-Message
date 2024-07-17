"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import "../../assets/login.css";

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
    <>
      <div className="App">
        <div>
          <div className="form-container-left sign-in-container">
            {loginViaOTP && (
              <form onSubmit={sendOTP} className="login-signup-form">
                <h1 className="text-black text-3xl">Password Assistance</h1>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={loginCredentials.email}
                  onChange={onChange}
                  autoComplete="off"
                />
                <button className="login-signup-button " type="submit">
                  Send OTP
                </button>
              </form>
            )}
            {enterOTP && (
              <form onSubmit={verifyOTP} className="login-signup-form">
                <h1 className="text-black text-3xl">Verification</h1>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the OTP"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={onOTPChange}
                  autoComplete="off"
                />
                <div className="d-flex justify-content-around">
                  <button type="submit" className="me-3 login-signup-button ">
                    Verify OTP
                  </button>
                  <button
                    type="button"
                    className="login-signup-button "
                    onClick={sendOTP}
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost login-signup-button "
                id="signUp"
                onClick={() => router.push("/signup")}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
