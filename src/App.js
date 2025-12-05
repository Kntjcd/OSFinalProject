// src/App.js
import React, { useState, useEffect } from "react";
import profilePic from "./assets/profile.jpg";
import resumePDF from "./assets/resume.pdf";
import FcfsComponent from "./components/FCFSComponent";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const projects = [
  { id: 1, image: "./assets/project1.jpg", title: "Project One" },
  { id: 2, image: "./assets/project2.jpg", title: "Project Two" },
  { id: 3, image: "./assets/project3.jpg", title: "Project Three" },
  { id: 4, image: "./assets/project4.jpg", title: "Project Four" },
  { id: 5, image: "./assets/project5.jpg", title: "Project Five" },
  { id: 6, image: "./assets/project6.jpg", title: "Project Six" },
  { id: 7, image: "./assets/project7.jpg", title: "Project Seven" },
  { id: 8, image: "./assets/project8.jpg", title: "Project Eight" },
  { id: 9, image: "./assets/project9.jpg", title: "Project Nine" },
  { id: 10, image: "./assets/project10.jpg", title: "Project Ten" },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Add/remove class to body for CSS variable theming
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center p-4 shadow-md sticky top-0 z-50 bg-var(--card)">
        <h1 className="text-2xl font-bold">KJA</h1>
        <nav className="flex items-center gap-6">
          <a href="#about">ABOUT ME</a>
          <a href="#resume">RESUME</a>
          <a href="#contacts">CONTACTS</a>
          <a
            href="https://github.com/Kntjcd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={22} />
          </a>
          <button
            className="ml-2 px-3 py-1 rounded"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </nav>
      </header>

      <div className="flex flex-1 gap-6 p-6 overflow-auto">
        {/* Profile Card */}
        <aside className="w-72 sticky top-4 self-start">
          <div className="profile flex flex-col items-center p-4 rounded shadow">
            <img
              src={profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 border-4 border-var(--button-bg)"
            />
            <h2 className="text-lg font-bold">Kent Jeced Alcantara</h2>
            <p className="text-sm text-center">
              BSIT 3B Student • Photojournalist • Graphic Artist
            </p>
            <p className="text-sm mt-2">Cordova, Cebu City, Philippines</p>
            <a
              href={resumePDF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-4 py-2 bg-var(--button-bg) text-white rounded shadow-sm"
            >
              Download Resume
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6">
          {/* FCFS Section */}
          <section className="fcfs-section bg-var(--card) p-4 rounded shadow overflow-auto">
            <h2 className="text-xl font-bold mb-2">
              FCFS CPU Scheduling Algorithm
            </h2>
            <FcfsComponent />
          </section>

          {/* Projects Gallery */}
          <section>
            <h2 className="text-xl font-bold mb-4">Projects Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={project.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gallery-item block overflow-hidden rounded shadow hover:scale-105 transition-transform"
                >
                  <img
                    src={require(`${project.image}`)}
                    alt={project.title}
                    className="w-full h-36 object-cover"
                  />
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-var(--card) text-center py-6 mt-auto border-t border-var(--border)">
        <p>
          &copy; {new Date().getFullYear()} Kent Jeced Alcantara. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
