"use client";
import React from "react";

import axios from "axios";
import { useState } from "react";

export default function ContactForm() {
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };
  interface ContactFormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    email: HTMLInputElement;
    subject: HTMLInputElement;
    comment: HTMLTextAreaElement;
  }

  interface ContactFormElement extends HTMLFormElement {
    elements: ContactFormElements;
  }

  interface SendEmailEvent extends React.FormEvent<ContactFormElement> {}

  const sendEmail = async (e: SendEmailEvent): Promise<void> => {
    e.preventDefault(); // Prevent default form submission behavior
    const name = e.currentTarget.elements.name.value;
    const email = e.currentTarget.elements.email.value;
    const subject = e.currentTarget.elements.subject.value;
    const comment = e.currentTarget.elements.comment.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          name,
          email,
          subject,
          comment,
        }
      );

      if ([200, 201].includes(response.status)) {
        e.currentTarget.reset(); // Reset the form
        setSuccess(true); // Set success state
        handleShowMessage();
      } else {
        setSuccess(false); // Handle unexpected responses
        handleShowMessage();
      }
    } catch (error) {
      setSuccess(false); // Set error state
      handleShowMessage();
      e.currentTarget.reset(); // Reset the form
    }
  };
  return (
    <form id="contactform" className="form-contact-us" onSubmit={sendEmail}>
      <div className="cols">
        <fieldset className="item">
          <input
            type="text"
            name="name"
            required
            id="name"
            placeholder="Your Name*"
          />
        </fieldset>
        <fieldset className="item">
          <input
            type="email"
            name="email"
            id="mail"
            required
            placeholder="Your Email*"
          />
        </fieldset>
      </div>
      <fieldset style={{ marginBottom: "19px" }}>
        <input
          type="text"
          name="subject"
          id="subject"
          required
          placeholder="Subject*"
        />
      </fieldset>
      <fieldset>
        <textarea
          name="comment"
          id="comment"
          placeholder="Comment*"
          defaultValue={""}
          required
        />
      </fieldset>
      <div
        className={`tfSubscribeMsg  footer-sub-element ${
          showMessage ? "active" : ""
        }`}
      >
        {success ? (
          <p style={{ color: "rgb(52, 168, 83)" }}>
            Form submitted successfully.
          </p>
        ) : (
          <p style={{ color: "red" }}>Something went wrong</p>
        )}
      </div>
      <button
        type="submit"
        className="tf-btn style-1 w-full bg-on-suface-container text-center"
      >
        <span>Send Message</span>
      </button>
    </form>
  );
}
