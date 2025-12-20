"use client";
import React from "react";

import axios from "axios";
import { useState } from "react";
import DropdownSelect from "../common/DropdownSelect";

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
    phone: HTMLInputElement;
    message: HTMLTextAreaElement;
  }

  interface ContactFormElement extends HTMLFormElement {
    elements: ContactFormElements;
  }

  interface SendEmailEvent extends React.FormEvent<ContactFormElement> {}

  const sendEmail = async (e: SendEmailEvent): Promise<void> => {
    e.preventDefault(); // Prevent default form submission behavior
    const email = e.currentTarget.email.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          email,
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
      <div className="cols">
        <fieldset className="item">
          <input type="number" name="phone" id="phone" placeholder="Phone" />
        </fieldset>
        <fieldset className="item">
          <DropdownSelect
            options={[
              "How can we help you?",
              "Option 1",
              "Option 2",
              "Option 3",
            ]}
          />
        </fieldset>
      </div>
      <fieldset>
        <textarea
          name="message"
          id="message"
          placeholder="Your Message*"
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
        <span>Submit Require</span>
      </button>
    </form>
  );
}
