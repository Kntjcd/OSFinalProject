// src/App.js
import React, { useState } from "react";
import profilePic from "./assets/profile.jpg";
import resumePDF from "./assets/resume.pdf";
import FcfsComponent from "./components/FcFsComponent";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    id: 1,
    image: "./assets/project1.jpg",
    title: "Banag Banag School Publication Editorial Board",
    description: " ",
    link: "#",
  },
  {
    id: 2,
    image: "./assets/project2.jpg",
    title: "SSG Poster",
    description: " ",
    link: "#",
  },
  {
    id: 3,
    image: "./assets/project3.jpg",
    title: "SSG Campaign Material",
    description: " ",
    link: "#",
  },
  {
    id: 4,
    image: "./assets/project4.jpg",
    title: "SSG Default Birthday Greeting Layout",
    description: " ",
    link: "#",
  },
  {
    id: 5,
    image: "./assets/project5.jpg",
    title: "SSG Poster",
    description: " ",
    link: "#",
  },
  {
    id: 6,
    image: "./assets/project6.jpg",
    title: "Cordova Public College School Uniform",
    description: " ",
    link: "#",
  },
  {
    id: 7,
    image: "./assets/project7.jpg",
    title: "Cordova Public College AVP",
    description: " ",
    link: "#",
  },
  {
    id: 8,
    image: "./assets/project8.jpg",
    title: "Foundation Anniversary of Cordova Public College Layout",
    description: " ",
    link: "#",
  },
  {
    id: 9,
    image: "./assets/project9.jpg",
    title: "MLBB GABI Layout",
    description: " ",
    link: "#",
  },
  {
    id: 10,
    image: "./assets/project10.jpg",
    title: "ALCU Layout",
    description: " ",
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
  const cardPop = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      {/* Navbar */}
      <header className="header">
        <div className="logo">KJA</div>

        <a
          href="https://github.com/Kntjcd"
          target="_blank"
          rel="noopener noreferrer"
          className="github-btn"
        >
          <FaGithub />
        </a>

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
          {/* Profile Card */}
          <aside className="profile ">
            <img src={profilePic} alt="Profile" className="pfp " />
            <h2>Kent Jeced Alcantara</h2>
            <p>BSIT 3B Student • Photojournalist • Graphic Artist</p>
            <p>Cordova, Cebu City, Philippines</p>
            <a href={resumePDF} target="_blank" rel="noopener noreferrer">
              <button className="bg-green-600 text-white px-4 py-2 rounded">
                Download Resume
              </button>
            </a>
          </aside>

          {/* Main Content */}
          <main className="main-content">
            {/* FCFS Component */}
            <section className="fcfs-section">
              <h1>FCFS CPU Scheduling Algorithm</h1>
              <FcfsComponent />
            </section>

            {/* Projects Gallery */}
            <section className="projects-section">
              <h1>Projects Gallery</h1>
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
