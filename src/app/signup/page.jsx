"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import "../../assets/login.css";

export default function Signup() {
  const router = useRouter();
  const [passShow, setPassShow] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const { name, email, password } = credentials;
    if (!name || !email || !password) {
      toast.error("Please fill in the form completely");
    } else {
      axios
        .post("http://localhost:3000/api/createuser", {
          name,
          email,
          password,
        })
        .then((result) => {
          console.log(result);
          if (result.data.Success === true) {
            toast.success("Successfully registered");
            router.push("/login");
          } else {
            toast.error("You have already signed up.\nPlease login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setCredentials({
        name: "",
        email: "",
        password: "",
      });
    }
  }

  function onChange(event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <>
      <div className="App">
        <div className="d-flex">
          <div className="overlay-container-left">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost login-signup-button "
                  id="signIn"
                  onClick={() => router.push("/login")}
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
          <div className="form-container-right sign-up-container">
            <form onSubmit={handleSubmit} className="login-signup-form">
              <h1 className="text-black text-3xl">Register</h1>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={onChange}
                value={credentials.name}
                autoComplete="off"
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                autoComplete="off"
              />

              <input
                type={!passShow ? "password" : "text"}
                placeholder="Password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                autoComplete="off"
              />

              <button className="login-signup-button " type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
