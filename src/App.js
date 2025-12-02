import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  /* ========================
      THEME SYSTEM
  ========================= */
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.body.className = theme; 
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  /* ========================
      STATES
  ========================= */
  const [processName, setProcessName] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");

  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState([]);
  const [gantt, setGantt] = useState([]);
  const [showFCFS, setShowFCFS] = useState(false);

  /* ========================
      ADD PROCESS
  ========================= */
  const addProcess = () => {
    if (!processName || arrival === "" || burst === "") {
      alert("Fill up all fields.");
      return;
    }

    setProcesses([
      ...processes,
      { pid: processName, arrival: Number(arrival), burst: Number(burst) },
    ]);

    setProcessName("");
    setArrival("");
    setBurst("");
  };

  /* ========================
      CLEAR TABLE
  ========================= */
  const clearTable = () => {
    setProcesses([]);
    setResults([]);
    setGantt([]);
  };

  /* ========================
      FCFS CALCULATION
  ========================= */
  const calculateFCFS = () => {
    if (processes.length === 0) {
      alert("Please add at least one process.");
      return;
    }

    let time = 0;
    let ganttData = [];
    let output = [];

    const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);

    sorted.forEach((p, index) => {
      const start = Math.max(time, p.arrival);
      const finish = start + p.burst;
      const waiting = start - p.arrival;
      const turnaround = finish - p.arrival;

      ganttData.push({ pid: p.pid, start, finish, id: index });
      output.push({
        pid: p.pid,
        arrival: p.arrival,
        burst: p.burst,
        waiting,
        turnaround,
        finish,
      });

      time = finish;
    });

    setResults(output);
    setGantt(ganttData);
  };

  return (
    <div className={`app-wrapper ${theme}`}>
      {/* THEME TOGGLE BUTTON */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      {/* HEADER */}
      <header className="header">
        <div className="logo">KJA</div>
        <nav className="menu">
          <a href="#about">ABOUT ME</a>
          <a href="#projects">PROJECTS</a>
          <a href="#contact">CONTACT US</a>
        </nav>
      </header>

      <div className="container">
        {/* LEFT PANEL */}
        <div className="profile">
          <img src="profile.jpg" alt="Profile" className="pfp" />
          <h2>Kent Jeced Alcantara</h2>
          <p>BSIT 3B Student • Photojournalist • Graphic Artist</p>
          <p>Cordova, Cebu City, Philippines</p>
          <p>Email: alcantarakentjeced@gmail.com</p>
          <p>
            GitHub: <a href="https://github.com/Kntjcd" target="_blank">https://github.com/Kntjcd</a>
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="resume">
          {/* ABOUT ME */}
          <h1 id="about">My Résumé</h1>
          <h2>About Me</h2>
          <p>I love exploring, learning foreign languages, and designing or making pubmats.</p>

          {/* SKILLS */}
          <h2>Skills</h2>
          <ul>
            <li>JavaScript / React JS</li>
            <li>PHP & MySQL</li>
            <li>HTML / CSS / Responsive Web Design</li>
            <li>Graphic Design / Layout Design / Adobe Photoshop & Illustrator</li>
            <li>Photojournalism & Visual Storytelling</li>
            <li>Basic Git & Version Control</li>
            <li>Problem Solving & Creativity</li>
          </ul>

          {/* PROJECTS */}
          <h2 id="projects">Projects</h2>
          <ul>
            <li>
              <b>Project:</b> SSG and BANAG BANAG School Publication Pubmats<br />
              <b>Tech Used:</b> Laptop<br />
              <b>Role:</b> Layout Artist / Designer
            </li>
          </ul>

          {/* EDUCATION */}
          <h2>Education</h2>
          <p><b>School:</b> Cordova Public College</p>
          <p><b>Course:</b> BSIT</p>
          <p><b>Year Level / Expected Graduation:</b> 3rd Year</p>

          {/* EXPERIENCE */}
          <h2>Experience</h2>
          <p>I worked as a Website Designer under Libetario Digital Marketing Services.</p>

          {/* ACHIEVEMENTS */}
          <h2>Achievements</h2>
          <p>I have been a consistent SSG Officer from my First Year College until now.</p>

          {/* LANGUAGES */}
          <h2>Languages</h2>
          <p>Cebuano, Tagalog, Ilonggo, English</p>

          {/* CPU Scheduling Simulation Button */}
          <h2>CPU Scheduling Simulation</h2>
          <button onClick={() => setShowFCFS(true)}>
            First Come First Serve Scheduling Algorithm
          </button>

          {/* FCFS MODAL */}
          {showFCFS && (
            <div className="modal-bg">
              <div className="modal-box">
                <button className="close-btn" onClick={() => setShowFCFS(false)}>
                  Close
                </button>

                <h2>First Come First Serve Scheduling Algorithm</h2>

                <div className="input-section">
                  <input
                    type="text"
                    placeholder="Process Name (e.g., P1)"
                    value={processName}
                    onChange={(e) => setProcessName(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Arrival Time"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Burst Time"
                    value={burst}
                    onChange={(e) => setBurst(e.target.value)}
                  />
                  <div className="button-group">
                    <button onClick={addProcess}>Add Process</button>
                    <button onClick={calculateFCFS}>Calculate</button>
                    <button
                      onClick={clearTable}
                      style={{ background: "red", color: "white" }}
                    >
                      Clear Table
                    </button>
                  </div>
                </div>

                {/* TABLE */}
                <table>
                  <thead>
                    <tr>
                      <th>Process</th>
                      <th>Arrival</th>
                      <th>Burst</th>
                      <th>Waiting</th>
                      <th>Turnaround</th>
                      <th>Finish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.length > 0
                      ? results.map((r, index) => (
                          <tr key={index}>
                            <td>{r.pid}</td>
                            <td>{r.arrival}</td>
                            <td>{r.burst}</td>
                            <td>{r.waiting}</td>
                            <td>{r.turnaround}</td>
                            <td>{r.finish}</td>
                          </tr>
                        ))
                      : processes.map((p, index) => (
                          <tr key={index}>
                            <td>{p.pid}</td>
                            <td>{p.arrival}</td>
                            <td>{p.burst}</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                          </tr>
                        ))}
                  </tbody>
                </table>

                {/* GANTT */}
                <h3>Gantt Chart</h3>
                <div className="gantt">
                  {gantt.map((g) => (
                    <div key={g.id} className="gantt-block">
                      {g.pid} ({g.start} - {g.finish})
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GALLERY */}
          <h2>My Layout Gallery</h2>
          <div className="gallery">
            {["layout1.jpg", "layout2.jpg", "layout3.jpg", "layout4.jpg"].map(
              (img, index) => (
                <img
                  key={index}
                  src={img}
                  className="gallery-item"
                  alt={`Project ${index + 1}`}
                />
              )
            )}
          </div>

          {/* CONTACT US */}
          <h2 id="contact">Contact Me</h2>
          <p>Email: alcantarakentjeced@gmail.com</p>
          <p>GitHub: <a href="https://github.com/Kntjcd" target="_blank">https://github.com/Kntjcd</a></p>
        </div>
      </div>
    </div>
  );
}

export default App;
