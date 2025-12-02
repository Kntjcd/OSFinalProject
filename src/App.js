import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [showFCFSModal, setShowFCFSModal] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={theme}>
      {/* HEADER */}
      <header className="header">
        <div className="logo">KJA</div>
        <nav className="menu">
          <a href="#about">ABOUT ME</a>
          <a href="#projects">PROJECTS</a>
          <a href="#contact">CONTACT US</a>
          <a href="https://github.com/Kntjcd" target="_blank" rel="noreferrer">
            <FaGithub size={24} />
          </a>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </nav>
      </header>

      {/* ABOUT ME */}
      <section id="about" className="resume">
        <h2>About Me</h2>
        <p>
          Short Description about yourself. If you want to know more about me,
          click the download button.
        </p>
        <a
          href="/resume.pdf"
          download
          className="download-btn"
        >
          Download Resume
        </a>
      </section>

      {/* FCFS */}
      <section id="fcfs" className="resume">
        <h2>FCFS CPU SCHEDULING ALGORITHM</h2>
        <button onClick={() => setShowFCFSModal(true)}>Open FCFS</button>

        {showFCFSModal && (
          <div className="modal-bg">
            <div className="modal-box">
              <button
                className="close-btn"
                onClick={() => setShowFCFSModal(false)}
              >
                Close
              </button>
              <h3>FCFS CPU Scheduling Algorithm</h3>
              <p>Here goes your FCFS simulation or explanation content.</p>
            </div>
          </div>
        )}
      </section>

      {/* PROJECTS */}
      <section id="projects" className="resume">
        <h2>Projects</h2>
        <div className="gallery">
          {/* Add your 10 project images here */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="gallery-item">
              <img
                src={`project${i + 1}.jpg`}
                alt={`Project ${i + 1}`}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="resume">
        <h2>Contact Me</h2>
        <form className="contact-form">
          <input type="text" placeholder="NAME" />
          <input type="email" placeholder="EMAIL" />
          <textarea placeholder="MESSAGE" rows="5" />
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
}

export default App;
