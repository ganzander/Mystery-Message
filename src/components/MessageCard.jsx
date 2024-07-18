"use client";
import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";

import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function MessageCard({ message, onMessageDelete, authToken }) {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }

  function handleShow() {
    setShow(true);
  }

  async function handleDeleteConfirm() {
    const messageId = message._id;
    axios
      .post("/api/delete-message", { messageId, authToken })
      .then((result) => {
        if ((result.data.Success = true)) {
          toast.success(result.data.msg);
          onMessageDelete(messageId);
          handleClose();
        }
      });
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    const time = `${hours}:${minutes}:${seconds} ${ampm}`;
    return `${month} ${day}, ${year}, ${time}`;
  }

  const formattedTimestamp = formatTimestamp(message.createdAt);

  return (
    <Card className="mb-4">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title>{message.content}</Card.Title>
          <Button variant="danger" onClick={handleShow}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <small className="text-muted">{formattedTimestamp}</small>
      </Card.Header>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you absolutely sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
