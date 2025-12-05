import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import ProfileCard from "./components/ProfileCard";
import FCFS from "./components/FCFS";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const projects = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    img: `/projects/p${i + 1}.jpg`,
  }));

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* NAVBAR */}
        <nav className="w-full px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/60 dark:bg-gray-800/60 shadow-lg sticky top-0 z-50 border-b border-gray-300 dark:border-gray-700">
          {/* LEFT — LOGO */}
          <h1 className="text-3xl font-extrabold tracking-wider text-blue-600 dark:text-blue-400">
            KJA
          </h1>

          {/* MIDDLE — MENU */}
          <ul className="hidden md:flex gap-10 font-semibold">
            {["ABOUT ME", "RESUME", "CONTACTS"].map((item) => (
              <li key={item} className="cursor-pointer relative group text-lg">
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </li>
            ))}
          </ul>

          {/* RIGHT — ICONS */}
          <div className="flex gap-5 items-center">
            <a
              href="https://github.com/Kntjcd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub
                size={26}
                className="cursor-pointer hover:text-blue-500 transition"
              />
            </a>

            {/* DARK MODE TOGGLE */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md hover:scale-110 transition"
            >
              {darkMode ? (
                <BsSun size={22} className="text-yellow-400" />
              ) : (
                <BsMoon size={22} className="text-blue-500" />
              )}
            </button>
          </div>
        </nav>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-10">
          {/* LEFT — STICKY PROFILE CARD */}
          <div className="md:col-span-1 sticky top-28 h-fit">
            <ProfileCard />
          </div>

          {/* RIGHT — CONTENT */}
          <div className="md:col-span-2 space-y-12">
            {/* PROJECT GALLERY */}
            <section className="glass rounded-2xl p-6 shadow-xl">
              <h2 className="section-title">Project Gallery</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {projects.map((p) => (
                  <a
                    key={p.id}
                    href={p.img}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="overflow-hidden rounded-xl shadow-md">
                      <img
                        src={p.img}
                        alt={`Project ${p.id}`}
                        className="w-full h-44 object-cover group-hover:scale-110 transition duration-300"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* FCFS CPU SCHEDULING */}
            <section className="glass rounded-2xl p-6 shadow-xl">
              <h2 className="section-title">FCFS CPU Scheduling Algorithm</h2>
              <FCFS />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
