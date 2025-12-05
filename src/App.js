// src/App.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";

import ProfileCard from "./components/ProfileCard";
import FcfsComponent from "./components/FcfsComponent";
import ContactCard from "./components/ContactCard";

const projects = [
  {
    id: 1,
    image: "./assets/project1.jpg",
    title: "Project One",
    description: "Description for project one",
    link: "#",
  },
  {
    id: 2,
    image: "./assets/project2.jpg",
    title: "Project Two",
    description: "Description for project two",
    link: "#",
  },
  {
    id: 3,
    image: "./assets/project3.jpg",
    title: "Project Three",
    description: "Description for project three",
    link: "#",
  },
  {
    id: 4,
    image: "./assets/project4.jpg",
    title: "Project Four",
    description: "Description for project four",
    link: "#",
  },
  {
    id: 5,
    image: "./assets/project5.jpg",
    title: "Project Five",
    description: "Description for project five",
    link: "#",
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const pageFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.45 } },
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      {/* Navbar */}
      <header className="header">
        <div className="logo">KJA</div>
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="#about">ABOUT ME</a>
          <a href="#resume">RESUME</a>
          <a href="#contact">CONTACT</a>
          <a
            href="https://github.com/Kntjcd"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
          >
            <FaGithub />
          </a>
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </nav>
        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </header>

      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={pageFade}
          className="container"
        >
          {/* Left Column: Sticky Profile */}
          <aside className="profile">
            <ProfileCard />
          </aside>

          {/* Right Column: Scrollable Main Content */}
          <main className="main-content">
            {/* FCFS Scheduler */}
            <section className="fcfs-section">
              <h2>FCFS CPU Scheduling Algorithm</h2>
              <FcfsComponent />
            </section>

            {/* Projects */}
            <section className="projects-section">
              <h2>Projects Gallery</h2>
              <div className="gallery">
                {projects.map((project) => (
                  <a
                    key={project.id}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gallery-item"
                  >
                    <img
                      src={require(`${project.image}`)}
                      alt={project.title}
                    />
                    <div className="p-2">
                      <h3 className="font-bold">{project.title}</h3>
                      <p className="text-sm">{project.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section className="contact-section" id="contact">
              <ContactCard />
            </section>
          </main>
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Kent Jeced Alcantara. All rights
          reserved.
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <a
            href="https://github.com/Kntjcd"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:alcantarakentjeced@gmail.com">Email</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
