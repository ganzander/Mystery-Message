"use client";
import { Mail } from "lucide-react";
import messages from ".././messages.json";
import { Carousel } from "react-bootstrap";
import Navbar from "src/components/Navbar";
import "../assets/home.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        className="d-flex flex-column align-items-center justify-content-center px-4 text-white py-5"
        style={{ backgroundColor: "#2d3748" }}
      >
        <div className="row text-center my-5">
          <div className="col">
            <h1 className="display-4 font-weight-bold">
              Dive into the World of Anonymous Feedback
            </h1>
            <p className="lead">
              True Feedback - Where your identity remains a secret.
            </p>
          </div>
        </div>

        <Carousel interval={2000} className="w-full max-w-lg max-w-md-xl">
          {messages.map((message, index) => (
            <Carousel.Item key={index} className="p-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">{message.title}</h5>
                </div>
                <div className="card-body d-flex flex-column flex-md-row align-items-start space-y-2 space-md-y-0 space-md-x-4">
                  <Mail className="flex-shrink-0 me-4" />
                  <div className="pl-3">
                    <p>{message.content}</p>
                    <p className="text-xs text-muted-foreground">
                      {message.received}
                    </p>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </main>

      <footer
        className="row py-4 mx-0"
        style={{ backgroundColor: "rgb(17 24 39)" }}
      >
        <div className="col text-center">
          <p className="text-white">
            © 2023 True Feedback. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
