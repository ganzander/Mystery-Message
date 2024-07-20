"use client";

import React, { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Card, Button, Alert } from "react-bootstrap";
import toast from "react-hot-toast";

export default function SendMessage() {
  const params = useParams();
  console.log(params.username);
  const [msg, setMsg] = useState("");
  const [suggestedMsg, setSuggestedMsg] = useState([
    "What's your favorite movie?",
    "Do you have any pets?",
    "What's your dream job?",
  ]);

  function handleMsgChange(e) {
    setMsg(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { username } = params;

    axios
      .post("/api/send-message", { content: msg, username })
      .then((result) => {
        if (result.data.Success === true) {
          toast.success(result.data.msg);
        } else {
          toast.error(result.data.msg);
        }
      });
  }

  function fetchSuggestMsg() {
    axios.get("/api/suggest-messages").then((result) => {
      if (result.data.Success === true) {
        toast.success("Updated the suggestions.");
        setSuggestedMsg(result.data.data);
      } else {
        toast.error(result.data.data);
      }
    });
  }

  function handleMessageClick(message) {
    setMsg(message);
  }

  return (
    <>
      <div className="container mt-3 p-3 bg-white rounded max-w-4xl">
        <h1 className="display-4 font-weight-bold mb-4 text-center">
          Public Profile Link
        </h1>

        <div className="my-5">
          <div className="card">
            <div className="card-header">
              <h3 className="h5 font-weight-semibold">Messages</h3>
            </div>
            <div className="card-body d-flex flex-column">
              Enter Message
              <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex">
                  <input
                    type="text"
                    className="form-control me-5"
                    name="msg"
                    value={msg}
                    onChange={handleMsgChange}
                    placeholder="Send Message"
                    autoComplete="off"
                    required
                  />
                  <button type="submit" className="btn btn-dark ">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <div className="text-center">
          <div className="mb-4"></div>
          <div className="mb-3">
            <button
              className="btn btn-dark text-white my-4 p-3"
              onClick={fetchSuggestMsg}
            >
              Suggest Messages
            </button>
          </div>
          <p>Click on any message below to select it.</p>
          <Card>
            <Card.Header>
              <h3 className="text-xl font-semibold">Messages</h3>
            </Card.Header>
            <Card.Body className="flex flex-col space-y-4">
              {suggestedMsg.map((message, index) => (
                <div key={index} className="row mb-2 justify-content-center">
                  <div className="col">
                    <button
                      className=" mb-2 btn btn-light border border-dark btn-outline-dark rounded-pill"
                      onClick={() => handleMessageClick(message)}
                    >
                      {message}
                    </button>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
  // return (

  //   <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
  //     <h1 className="text-4xl font-bold mb-6 text-center">
  //       Public Profile Link
  //     </h1>
  //     {/* <div className="space-y-4 my-8">
  //       <div className="space-y-2">
  //         <Button
  //           onClick={fetchSuggestedMessages}
  //           className="my-4"
  //           disabled={isSuggestLoading}
  //         >
  //           Suggest Messages
  //         </Button>
  //         <p>Click on any message below to select it.</p>
  //       </div>
  //       <Card>
  //         <CardHeader>
  //           <h3 className="text-xl font-semibold">Messages</h3>
  //         </CardHeader>
  //         <CardContent className="flex flex-col space-y-4">
  //           {error ? (
  //             <p className="text-red-500">{error.message}</p>
  //           ) : (
  //             parseStringMessages(completion).map((message, index) => (
  //               <Button
  //                 key={index}
  //                 variant="outline"
  //                 className="mb-2"
  //                 onClick={() => handleMessageClick(message)}
  //               >
  //                 {message}
  //               </Button>
  //             ))
  //           )}
  //         </CardContent>
  //       </Card>
  //     </div>
  //     <Separator className="my-6" />
  //     <div className="text-center">
  //       <div className="mb-4">Get Your Message Board</div>
  //       <Link href={"/sign-up"}>
  //         <Button>Create Your Account</Button>
  //       </Link>
  //     </div> */}
  //   </div>
  // );
}
