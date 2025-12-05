// src/App.js
import React, { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import FcfsComponent from "./components/FcFsComponent";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";

// Import project images
import project1 from "./assets/project1.jpg";
import project2 from "./assets/project2.jpg";
import project3 from "./assets/project3.jpg";
import project4 from "./assets/project4.jpg";
import project5 from "./assets/project5.jpg";
import project6 from "./assets/project6.jpg";
import project7 from "./assets/project7.jpg";
import project8 from "./assets/project8.jpg";
import project9 from "./assets/project9.jpg";
import project10 from "./assets/project10.jpg";

const projects = [
  {
    id: 1,
    image: project1,
    title: "Project One",
    description: "Description for project one",
    link: "#",
  },
  {
    id: 2,
    image: project2,
    title: "Project Two",
    description: "Description for project two",
    link: "#",
  },
  {
    id: 3,
    image: project3,
    title: "Project Three",
    description: "Description for project three",
    link: "#",
  },
  {
    id: 4,
    image: project4,
    title: "Project Four",
    description: "Description for project four",
    link: "#",
  },
  {
    id: 5,
    image: project5,
    title: "Project Five",
    description: "Description for project five",
    link: "#",
  },
  {
    id: 6,
    image: project6,
    title: "Project Six",
    description: "Description for project six",
    link: "#",
  },
  {
    id: 7,
    image: project7,
    title: "Project Seven",
    description: "Description for project seven",
    link: "#",
  },
  {
    id: 8,
    image: project8,
    title: "Project Eight",
    description: "Description for project eight",
    link: "#",
  },
  {
    id: 9,
    image: project9,
    title: "Project Nine",
    description: "Description for project nine",
    link: "#",
  },
  {
    id: 10,
    image: project10,
    title: "Project Ten",
    description: "Description for project ten",
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
          {/* Sticky Profile Card */}
          <ProfileCard />

          {/* Main Content */}
          <main className="main-content">
            {/* FCFS Component */}
            <section className="fcfs-section">
              <h2>FCFS CPU Scheduling Algorithm</h2>
              <FcfsComponent />
            </section>

            {/* Projects Gallery */}
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
                    <img src={project.image} alt={project.title} />
                    <div className="p-2">
                      <h3 className="font-bold">{project.title}</h3>
                      <p className="text-sm">{project.description}</p>
                    </div>
                  </a>
                ))}
              </div>
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
