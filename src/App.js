import React, { useState, useEffect } from "react";
import "./App.css";
import { FaGithub, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

function App() {
  const [theme, setTheme] = useState("dark");
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // FCFS Scheduler States
  const [processName, setProcessName] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState([]);
  const [gantt, setGantt] = useState([]);
  const [showFCFS, setShowFCFS] = useState(false);

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

  const clearTable = () => {
    setProcesses([]);
    setResults([]);
    setGantt([]);
  };

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
      {/* HEADER */}
      <header className="header">
        <div className="logo">KJA</div>
        <nav className={`nav ${burgerOpen ? "open" : ""}`}>
          <a href="#about" onClick={() => setBurgerOpen(false)}>ABOUT ME</a>
          <a href="#projects" onClick={() => setBurgerOpen(false)}>PROJECTS</a>
          <a href="#contact" onClick={() => setBurgerOpen(false)}>CONTACT US</a>
          <a
            href="https://github.com/Kntjcd"
            target="_blank"
            rel="noreferrer"
            className="github-btn"
          >
            <FaGithub />
          </a>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </nav>
        <div className="burger" onClick={() => setBurgerOpen(!burgerOpen)}>
          {burgerOpen ? <FaTimes /> : <FaBars />}
        </div>
      </header>

      {/* MAIN CONTENT */}
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
          <section id="about">
            <h1>About Me</h1>
            <p>I love exploring, learning foreign languages, and designing or making pubmats.</p>
            <p>If you want to know more about me, click the download button below:</p>
            <a href="/Kent_Alcantara_Resume.pdf" download>
              <button>Download My Resume</button>
            </a>
          </section>

          {/* FCFS CPU Scheduling */}
          <section>
            <h2>CPU Scheduling Simulation</h2>
            <button onClick={() => setShowFCFS(true)}>
              First Come First Serve Scheduling Algorithm
            </button>
          </section>

          {showFCFS && (
            <div className="modal-bg">
              <div className="modal-box">
                <button className="close-btn" onClick={() => setShowFCFS(false)}>Close</button>
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
                    <button onClick={clearTable} style={{ background: "red", color: "white" }}>Clear Table</button>
                  </div>
                </div>

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
                      ))
                    }
                  </tbody>
                </table>

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

          {/* PROJECTS */}
          <section id="projects">
            <h1>Projects</h1>
            <div className="gallery">
              {Array.from({ length: 10 }, (_, i) => `layout${i + 1}.jpg`).map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Project ${index + 1}`}
                    className="gallery-item"
                  />
                )
              )}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact">
            <h1>Contact Me</h1>
            <form className="contact-form">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Message" rows="5" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
