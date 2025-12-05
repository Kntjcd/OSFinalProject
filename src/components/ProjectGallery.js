// src/components/ProjectGallery.js
import React from "react";

const projects = Array.from({ length: 10 }, (_, i) => `Project ${i + 1}`);

export default function ProjectGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {projects.map((proj, idx) => (
        <a
          href="#"
          key={idx}
          className="project-item border rounded p-4 text-center hover:scale-105 transition transform bg-white dark:bg-gray-700 dark:text-white"
        >
          {proj}
        </a>
      ))}
    </div>
  );
}
