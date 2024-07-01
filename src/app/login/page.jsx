"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import "../../assets/login.css";

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
    <>
      <div className="App">
        <div className="d-flex" style={{ height: "100%" }}>
          <div className="form-container-left sign-in-container">
            <form onSubmit={handlePasswordSubmit} className="login-signup-form">
              <h1 className="text-black text-3xl">Log in</h1>
              {/* Sign in providers Not implemented  */}
              {/* <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in" />
              </a>
            </div> */}
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={loginCredentials.email}
                onChange={onChange}
                autoComplete="off"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginCredentials.password}
                onChange={onChange}
                autoComplete="off"
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
              <button className="login-signup-button" type="submit">
                Login
              </button>
            </form>
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
      </div>
    </>
  );
}
