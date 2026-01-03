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
    country: HTMLInputElement;
    subject: HTMLInputElement;
    comment: HTMLTextAreaElement;
  }

  interface ContactFormElement extends HTMLFormElement {
    elements: ContactFormElements;
  }

  interface SendEmailEvent extends React.FormEvent<ContactFormElement> {}

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const sendEmail = async (e: SendEmailEvent): Promise<void> => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Validate dropdown selections
    if (!selectedCountry || selectedCountry === "Select Country") {
      setSuccess(false);
      handleShowMessage();
      return;
    }
    
    if (!selectedSubject || selectedSubject === "Select Subject") {
      setSuccess(false);
      handleShowMessage();
      return;
    }
    
    const name = e.currentTarget.elements.name.value;
    const email = e.currentTarget.elements.email.value;
    const phone = e.currentTarget.elements.phone.value;
    const country = selectedCountry;
    const subject = selectedSubject;
    const comment = e.currentTarget.elements.comment.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          name,
          email,
          phone,
          country,
          subject,
          comment,
        }
      );

      if ([200, 201].includes(response.status)) {
        e.currentTarget.reset(); // Reset the form
        setSelectedCountry(""); // Reset country selection
        setSelectedSubject(""); // Reset subject selection
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
      setSelectedCountry(""); // Reset country selection
      setSelectedSubject(""); // Reset subject selection
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
          <DropdownSelect
            options={[
              "Select Country",
              "Kuwait",
              "United Arab Emirates",
              "Saudi Arabia",
              "Qatar",
              "Bahrain",
              "Oman",
              "Egypt",
              "Jordan",
              "Lebanon",
              "United States",
              "United Kingdom",
              "Canada",
              "Australia",
              "India",
              "Other",
            ]}
            defaultOption="Select Country"
            selectedValue={selectedCountry}
            onChange={(value) => setSelectedCountry(value)}
          />
        </fieldset>
        <fieldset className="item">
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            placeholder="Phone Number*"
          />
        </fieldset>
     
      </div>
      <fieldset style={{ marginBottom: "19px" }}>
        <DropdownSelect
          options={[
            "Select Subject",
            "Sales Inquiry",
            "Support Inquiry",
            "Other",
          ]}
          defaultOption="Select Subject"
          selectedValue={selectedSubject}
          onChange={(value) => setSelectedSubject(value)}
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
