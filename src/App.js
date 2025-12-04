// src/App.js
import React, { useState } from "react";
import profilePic from "./assets/profile.jpg";
import resumePDF from "./assets/resume.pdf";
import FcfsComponent from "./components/FcfsComponent";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  // ... keep the same projects array you already have
  {
    id: 1,
    image: "./assets/project1.jpg",
    title: "Project One",
    description: "Description for project one",
  },
  {
    id: 2,
    image: "./assets/project2.jpg",
    title: "Project Two",
    description: "Description for project two",
  },
  {
    id: 3,
    image: "./assets/project3.jpg",
    title: "Project Three",
    description: "Description for project three",
  },
  {
    id: 4,
    image: "./assets/project4.jpg",
    title: "Project Four",
    description: "Description for project four",
  },
  // ...etc
];

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const pageFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.45 } },
  };
  const cardPop = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <AnimatePresence>
        <motion.div
          key={darkMode ? "dark" : "light"}
          initial="hidden"
          animate="visible"
          variants={pageFade}
          className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col"
        >
          {/* Navbar / Toggle */}
          <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
            <h1 className="text-xl font-bold">LOST AND FOUND CAMPUS PORTAL</h1>

            {/* animated toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded flex items-center gap-2"
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 1 }}
              animate={{
                boxShadow: darkMode
                  ? "0 6px 18px rgba(0,0,0,0.4)"
                  : "0 6px 18px rgba(2,6,23,0.06)",
              }}
              style={{
                background: darkMode
                  ? "linear-gradient(135deg,#0b3a7a,#03254b)"
                  : "linear-gradient(135deg,#0a84ff,#0046a6)",
                color: "white",
              }}
            >
              <motion.span
                initial={{ rotate: darkMode ? 0 : 0 }}
                animate={{ rotate: darkMode ? 0 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: 18 }}
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </motion.span>
            </motion.button>
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
                initial="hidden"
                animate="visible"
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
                  {projects.map((project, idx) => (
                    <motion.div
                      key={project.id}
                      className="bg-gray-100 dark:bg-gray-800 rounded shadow p-4"
                      variants={cardPop}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.02, y: -4 }}
                    >
                      {/* require -> keep earlier pattern or switch to imported assets */}
                      <img
                        src={require(`${project.image}`)}
                        alt={project.title}
                        className="rounded w-full h-40 object-cover mb-2"
                      />
                      <h3 className="font-bold">{project.title}</h3>
                      <p>{project.description}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </main>
          </motion.div>

          {/* Footer */}
          <footer className="bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-6 mt-auto">
            <div className="container mx-auto text-center">
              <p>
                &copy; {new Date().getFullYear()} Kent Jeced Alcantara. All
                rights reserved.
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
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
