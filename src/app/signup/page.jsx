"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import "../../assets/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Navbar from "src/components/Navbar";

export default function Signup() {
  const router = useRouter();
  const [passShow, setPassShow] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isAvailable, setIsAvailable] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const { name, email, password } = credentials;
    if (!name || !email || !password) {
      toast.error("Please fill in the form completely");
    } else {
      axios
        .post("/api/createuser", {
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
            toast.error(result.data.message);
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

  useEffect(() => {
    const { name } = credentials;
    axios
      .post("/api/check-username-unique", { name })
      .then((result) => {
        if (result.data.Success === true) {
          setIsAvailable(result.data.Success);
        } else {
          setIsAvailable(result.data.Success);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [credentials.name]);

  function onChange(event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#1a202c" }}
    >
      <div className="form-container bg-white p-5 rounded">
        <h1 className="text-center">Join True Feedback</h1>
        <p className="text-center">Sign up to start your anonymous adventure</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 name-available-container">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="name"
              onChange={onChange}
              value={credentials.name}
              autoComplete="off"
              required
            />
            <small>
              {isAvailable ? (
                <FontAwesomeIcon icon={faCheck} className="icon" />
              ) : (
                <FontAwesomeIcon icon={faXmark} className="icon" />
              )}
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
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
              type={!passShow ? "password" : "text"}
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isAvailable ? false : true}
            className="btn btn-dark w-100"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3">
          Already a member?{" "}
          <span
            className="text-black"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/login")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
