// src/App.js
import React, { useState, useEffect } from "react";
import profilePic from "./assets/profile.jpg";
import resumePDF from "./assets/resume.pdf";
import FcfsComponent from "./components/FcfsComponent";
import { motion, AnimatePresence } from "framer-motion";

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
  {
    id: 6,
    image: "./assets/project6.jpg",
    title: "Project Six",
    description: "Description for project six",
    link: "#",
  },
  {
    id: 7,
    image: "./assets/project7.jpg",
    title: "Project Seven",
    description: "Description for project seven",
    link: "#",
  },
  {
    id: 8,
    image: "./assets/project8.jpg",
    title: "Project Eight",
    description: "Description for project eight",
    link: "#",
  },
  {
    id: 9,
    image: "./assets/project9.jpg",
    title: "Project Nine",
    description: "Description for project nine",
    link: "#",
  },
  {
    id: 10,
    image: "./assets/project10.jpg",
    title: "Project Ten",
    description: "Description for project ten",
    link: "#",
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.body.classList.toggle("light", !darkMode);
  }, [darkMode]);

  const pageFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.45 } },
  };
  const cardPop = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        key={darkMode ? "dark" : "light"}
        initial="hidden"
        animate="visible"
        variants={pageFade}
        className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col"
      >
        {/* Navbar */}
        <header className="header flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
          <div className="flex items-center gap-6">
            <div className="logo font-bold text-xl">KJA</div>
            <nav className="nav flex gap-4">
              <a href="#about">ABOUT ME</a>
              <a href="#resume">RESUME</a>
              <a href="#contacts">CONTACTS</a>
              <a
                href="https://github.com/Kntjcd"
                target="_blank"
                rel="noopener noreferrer"
                className="github-btn"
              >
                🐱
              </a>
            </nav>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </header>

        <motion.div
          className="flex flex-1 p-4 gap-6 overflow-auto"
          variants={pageFade}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Card */}
          <aside className="w-64 sticky top-4 self-start">
            <motion.div
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow flex flex-col items-center"
              variants={cardPop}
            >
              <img
                src={profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h2 className="text-lg font-bold">Kent Jeced Alcantara</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                BSIT 3B Student • Photojournalist • Graphic Artist
              </p>
              <p className="text-sm mt-2">Cordova, Cebu City, Philippines</p>
              <a
                href={resumePDF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow-sm"
              >
                Download Resume
              </a>
            </motion.div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col gap-6">
            {/* FCFS */}
            <motion.section
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow overflow-auto"
              variants={cardPop}
            >
              <h2 className="text-xl font-bold mb-2">
                FCFS CPU Scheduling Algorithm
              </h2>
              <FcfsComponent />
            </motion.section>

            {/* Projects Gallery */}
            <section>
              <h2 className="text-xl font-bold mb-4">Projects Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <motion.a
                    key={project.id}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-gray-800 rounded shadow p-2 block"
                    variants={cardPop}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <img
                      src={require(`${project.image}`)}
                      alt={project.title}
                      className="rounded w-full h-40 object-cover mb-2"
                    />
                    <h3 className="font-bold">{project.title}</h3>
                    <p>{project.description}</p>
                  </motion.a>
                ))}
              </div>
            </section>
          </main>
        </motion.div>

        {/* Footer */}
        <footer className="bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-6 mt-auto">
          <div className="container mx-auto text-center">
            <p>
              &copy; {new Date().getFullYear()} Kent Jeced Alcantara. All rights
              reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <a
                href="https://github.com/Kntjcd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
              <a
                href="mailto:alcantarakentjeced@gmail.com"
                className="hover:underline"
              >
                Email
              </a>
              <a href="#contacts" className="hover:underline">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
