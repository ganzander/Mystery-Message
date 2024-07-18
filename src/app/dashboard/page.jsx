"use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import toast from "react-hot-toast";

import { RefreshCcw } from "lucide-react";
import Switch from "react-switch";
import { Spinner } from "react-bootstrap";
import MessageCard from "src/components/MessageCard";
import Navbar from "src/components/Navbar";

export default function page() {
  const [decoded, setDecoded] = useState({});
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [isAccepting, setIsAccepting] = useState();
  const [authToken, setAuthToken] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  function handleDeleteMessage(messageId) {
    setMessages(messages.filter((msg) => msg._id !== messageId));
  }

  async function fetchAcceptMessages() {
    setIsSwitchLoading(true);
    axios.post("/api/check-accept-message", { authToken }).then((result) => {
      if (result.data.Success === true) {
        setIsAccepting(result.data.msg);
        setIsSwitchLoading(false);
      }
    });
  }

  function fetchMessages() {
    setIsLoading(true);
    axios.post("/api/get-messages", { authToken }).then((result) => {
      setMessages(result.data.userMessages || []);
      setIsLoading(false);
    });
  }

  async function changeAcceptMessage() {
    setIsLoading(true);
    axios.post("/api/accept-message", { authToken }).then((result) => {
      if (result.data.Success === true) {
        localStorage.setItem("AuthToken", JSON.stringify(result.data.token));
        setAuthToken(result.data.token);
      } else {
        toast.error(result.data.msg);
      }
    });
    setIsLoading(false);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuthToken = JSON.parse(localStorage.getItem("AuthToken"));
      if (storedAuthToken) {
        setAuthToken(storedAuthToken);
        const decodedToken = jwt.decode(storedAuthToken);
        setDecoded(decodedToken);
        setProfileUrl(`http://localhost:3000/u/${decodedToken.name}`);
      }
    }
  }, []);

  useEffect(() => {
    if (authToken !== "") {
      fetchAcceptMessages();
      fetchMessages();
    }
  }, [authToken]);

  function copyToClipboard() {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Copied To Clipboard");
  }

  console.log(isLoading);

  if (authToken !== null) {
    return (
      <>
        <Navbar />
        <div className="container p-6 bg-white rounded w-100 mt-4">
          <h1 className="font-weight-bold mb-4 text-center">User Dashboard</h1>
          <div className="mb-4">
            <h3 className="font-weight-bold mb-3">Copy Your Unique Link</h3>
            <div className="mb-3 d-flex">
              <input
                type="text"
                className="form-control me-5"
                value={profileUrl}
                disabled
              />
              <button
                variant="outline-secondary"
                className="btn bg-dark text-white"
                onClick={copyToClipboard}
              >
                Copy
              </button>
            </div>
          </div>

          <div className="mb-4 d-flex">
            <Switch
              className="me-3"
              checked={isAccepting}
              onChange={changeAcceptMessage}
              disabled={isSwitchLoading}
            />
            <span className="ml-2">
              Accept Messages: {isAccepting ? "On" : "Off"}
            </span>
          </div>
          <hr
            style={{
              color: "black",
              backgroundColor: "black",
              height: 5,
            }}
          />

          <button
            className="mt-4 btn btn-outline-dark h-4 w-4"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
            }}
          >
            {isLoading ? (
              <Spinner
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <RefreshCcw />
            )}
          </button>
          <div className="mt-4 row">
            {messages.length > 0 ? (
              messages.map((message, index) => {
                return (
                  <div className="col-12 col-md-6 mb-4" key={index}>
                    <MessageCard
                      authToken={authToken}
                      key={index}
                      message={message}
                      onMessageDelete={handleDeleteMessage}
                    />
                  </div>
                );
              })
            ) : (
              <p>No messages to display.</p>
            )}
          </div>
        </div>
      </>
    );
  }
}
