// src/components/ProfileCard.js
import React from "react";

const ProfileCard = () => {
  return (
    <div className="glass p-6 rounded-2xl shadow-lg w-80 profile-card sticky top-6">
      <img
        src="/pfp.jpg"
        alt="Profile"
        className="w-40 h-40 rounded-full mx-auto border-4 border-blue-500"
      />
      <h2 className="text-xl font-bold mt-4">Kent Jeced Alcantara</h2>
      <p className="text-gray-600 dark:text-gray-300">
        BSIT 3B • Photojournalist • Graphic Artist
      </p>
    </div>
  );
};

export default ProfileCard;
