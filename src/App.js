import React, { useState } from "react";
import profilePic from "./assets/profile.jpg"; // Make sure your picture is here
import resumePDF from "./assets/resume.pdf"; // Your resume
import FcfsComponent from "./components/FcfsComponent"; // Your FCFS CPU component

// Sample projects array for gallery
const projects = [
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
    title: "Project Three",
    description: "Description for project three",
  },
  {
    id: 5,
    image: "./assets/project5.jpg",
    title: "Project Three",
    description: "Description for project three",
  },
  {
    id: 6,
    image: "./assets/project6.jpg",
    title: "Project Three",
    description: "Description for project three",
  },
  {
    id: 7,
    image: "./assets/project7.jpg",
    title: "Project Three",
    description: "Description for project three",
  },
  {
    id: 8,
    image: "./assets/project8.jpg",
    title: "Project Three",
    description: "Description for project three",
  },
  {
    id: 9,
    image: "./assets/project9.jpg",
    title: "Project Three",
    description: "Description for project three",
  },
  {
    id: 10,
    image: "./assets/project10.jpg",
    title: "Project Three",
    description: "Description for project three",
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
        {/* Navbar / Toggle */}
        <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
          <h1 className="text-xl font-bold">LOST AND FOUND CAMPUS PORTAL</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
        </header>

        <div className="flex flex-1 p-4 gap-6 overflow-auto">
          {/* Profile Card */}
          <aside className="w-64 sticky top-4 self-start bg-gray-100 dark:bg-gray-800 p-4 rounded shadow flex flex-col items-center">
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
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            >
              Download Resume
            </a>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col gap-6">
            {/* FCFS CPU Scheduling Section */}
            <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow overflow-auto">
              <h2 className="text-xl font-bold mb-2">
                FCFS CPU Scheduling Algorithm
              </h2>
              <FcfsComponent />
            </section>

            {/* Project Gallery */}
            <section>
              <h2 className="text-xl font-bold mb-4">Projects Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-100 dark:bg-gray-800 rounded shadow p-4"
                  >
                    <img
                      src={require(`${project.image}`)}
                      alt={project.title}
                      className="rounded w-full h-40 object-cover mb-2"
                    />
                    <h3 className="font-bold">{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>

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
              <a href="#" className="hover:underline">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
