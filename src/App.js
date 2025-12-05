import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import ProfileCard from "./components/ProfileCard";
import FCFS from "./components/FCFS";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const projects = [
    { id: 1, img: "/projects/p1.jpg" },
    { id: 2, img: "/projects/p2.jpg" },
    { id: 3, img: "/projects/p3.jpg" },
    { id: 4, img: "/projects/p4.jpg" },
    { id: 5, img: "/projects/p5.jpg" },
    { id: 6, img: "/projects/p6.jpg" },
    { id: 7, img: "/projects/p7.jpg" },
    { id: 8, img: "/projects/p8.jpg" },
    { id: 9, img: "/projects/p9.jpg" },
    { id: 10, img: "/projects/p10.jpg" },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* NAVBAR */}
        <nav className="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
          {/* LEFT — LOGO */}
          <h1 className="text-2xl font-bold tracking-wider">KJA</h1>

          {/* MIDDLE — MENU */}
          <ul className="hidden md:flex gap-6 font-semibold">
            <li className="cursor-pointer hover:text-blue-500">ABOUT ME</li>
            <li className="cursor-pointer hover:text-blue-500">RESUME</li>
            <li className="cursor-pointer hover:text-blue-500">CONTACTS</li>
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
                className="cursor-pointer hover:text-blue-400"
              />
            </a>

            {/* LIGHT / DARK TOGGLE */}
            <button onClick={toggleTheme} className="text-xl">
              {darkMode ? <BsSun size={25} /> : <BsMoon size={25} />}
            </button>
          </div>
        </nav>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* LEFT — PROFILE CARD (STICKY) */}
          <div className="md:col-span-1 sticky top-24 h-fit">
            <ProfileCard />
          </div>

          {/* RIGHT — MAIN CONTENT */}
          <div className="md:col-span-2 space-y-10">
            {/* PROJECT GALLERY */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {projects.map((p) => (
                  <a
                    key={p.id}
                    href={p.img}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={p.img}
                      className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition"
                      alt={`Project ${p.id}`}
                    />
                  </a>
                ))}
              </div>
            </section>

            {/* FCFS CPU SCHEDULING COMPONENT */}
            <section>
              <h2 className="text-2xl font-bold mb-4">
                FCFS CPU Scheduling Algorithm
              </h2>
              <FCFS />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
