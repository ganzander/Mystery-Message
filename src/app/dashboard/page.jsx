"use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "src/components/ui/button";
import { Switch } from "src/components/ui/switch";
import { Separator } from "src/components/ui/separator";
import { Loader2, RefreshCcw } from "lucide-react";
import MessageCard from "src/components/MessageCard";

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
      }
    });
    setIsSwitchLoading(false);
  }

  function fetchMessages() {
    setIsLoading(true);
    axios.post("/api/get-messages", { authToken }).then((result) => {
      setMessages(result.data.userMessages || []);
    });
    setIsLoading(false);
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

  if (authToken !== null) {
    return (
      <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
          <div className="flex items-center">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="input input-bordered w-full p-2 mr-2"
            />
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
        </div>

        <div className="mb-4">
          <Switch
            checked={isAccepting}
            onCheckedChange={changeAcceptMessage}
            disabled={isSwitchLoading}
          />
          <span className="ml-2">
            {/* Accept Messages: {acceptMessages ? "On" : "Off"} */}
          </span>
        </div>
        <Separator />

        <Button
          className="mt-4"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.length > 0 ? (
            messages.map((message, index) => {
              // console.log(message);
              return (
                <MessageCard
                  key={index}
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              );
            })
          ) : (
            <p>No messages to display.</p>
          )}
        </div>
      </div>
    );
  }
}
