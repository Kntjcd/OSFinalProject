import React, { useState } from "react";
import { FaGithub, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import resumePDF from "./assets/resume.pdf"; // make sure your resume is here

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFCFSModal, setShowFCFSModal] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
          <div className="text-2xl font-extrabold text-indigo-600">KJA</div>
          
          <nav>
            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 items-center">
              <li><a href="#about" className="hover:text-indigo-500 transition">ABOUT ME</a></li>
              <li><a href="#projects" className="hover:text-indigo-500 transition">PROJECTS</a></li>
              <li><a href="#contact" className="hover:text-indigo-500 transition">CONTACT ME</a></li>
              <li>
                <a href="https://github.com/Kntjcd" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={20} />
                </a>
              </li>
              <li>
                <button onClick={toggleDarkMode}>
                  {darkMode ? <FaSun size={20}/> : <FaMoon size={20}/>}
                </button>
              </li>
            </ul>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
              </button>
              {menuOpen && (
                <ul className="absolute top-16 right-4 bg-white dark:bg-gray-800 shadow-lg rounded p-4 space-y-3 flex flex-col">
                  <li><a href="#about" className="hover:text-indigo-500 transition" onClick={() => setMenuOpen(false)}>ABOUT ME</a></li>
                  <li><a href="#projects" className="hover:text-indigo-500 transition" onClick={() => setMenuOpen(false)}>PROJECTS</a></li>
                  <li><a href="#contact" className="hover:text-indigo-500 transition" onClick={() => setMenuOpen(false)}>CONTACT ME</a></li>
                  <li>
                    <a href="https://github.com/Kntjcd" target="_blank" rel="noopener noreferrer">
                      <FaGithub size={20} />
                    </a>
                  </li>
                  <li>
                    <button onClick={toggleDarkMode}>
                      {darkMode ? <FaSun size={20}/> : <FaMoon size={20}/>}
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </header>

        <main className="flex flex-col md:flex-row md:space-x-6 p-4">
          {/* Profile Card */}
          <div className="md:w-1/4 mb-6 md:mb-0 md:sticky md:top-20 bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Kent Jeced Alcantara</h2>
            <p>Photojournalist • Graphic Artist</p>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 space-y-10">

            {/* About Me */}
            <section id="about" className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h2 className="text-2xl font-bold mb-2">About Me</h2>
              <p>If you want to know more about me, click the download button below.</p>
              <a href={resumePDF} download className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Download Resume</a>
            </section>

            {/* FCFS CPU Scheduling */}
            <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h2 className="text-2xl font-bold mb-2">FCFS CPU Scheduling Algorithm</h2>
              <button onClick={() => setShowFCFSModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                View Details
              </button>
            </section>

            {/* Projects */}
            <section id="projects" className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">Projects</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="bg-gray-300 dark:bg-gray-600 h-24 rounded flex items-center justify-center">
                    Project {i+1}
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Me */}
            <section id="contact" className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
              <form className="space-y-4">
                <input type="text" placeholder="Name" className="w-full p-2 border rounded"/>
                <input type="email" placeholder="Email" className="w-full p-2 border rounded"/>
                <textarea placeholder="Message" className="w-full p-2 border rounded"></textarea>
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Send</button>
              </form>
            </section>
          </div>
        </main>

        {/* FCFS Modal */}
        {showFCFSModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 md:w-1/2 relative">
              <button 
                onClick={() => setShowFCFSModal(false)}
                className="absolute top-2 right-2 text-red-500 font-bold"
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4">FCFS CPU Scheduling Algorithm</h3>
              <p>Here you can display your simulation, chart, or explanation for FCFS.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
