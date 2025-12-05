// src/components/ContactCard.js
import React, { useState } from "react";

const ContactCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }
    alert(`Thank you, ${name}! Your message has been submitted.`);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="glass p-6 rounded-2xl shadow-lg contact-card">
      <h2 className="text-xl font-bold mb-4 text-center">
        GET IN TOUCH WITH ME
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          rows="5"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" className="mt-2">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactCard;
