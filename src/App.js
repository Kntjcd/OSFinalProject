import React, { useState } from "react";
import "./App.css";

function App() {
  const [processName, setProcessName] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");

  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState([]);
  const [gantt, setGantt] = useState([]);

  // Add process to table
  const addProcess = () => {
    if (!processName || arrival === "" || burst === "") {
      alert("Fill up all fields.");
      return;
    }

    setProcesses([
      ...processes,
      { pid: processName, arrival: Number(arrival), burst: Number(burst) },
    ]);

    // Clear inputs
    setProcessName("");
    setArrival("");
    setBurst("");
  };

  // Clear all process data
  const clearTable = () => {
    setProcesses([]);
    setResults([]);
    setGantt([]);
  };

  // Calculate FCFS
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
    <div className="container">

      {/* LEFT SIDE - PROFILE */}
      <div className="profile">
        <img src="profile.jpg" alt="Profile" className="pfp" />
        <h2>Kent Jeced Alcantara</h2>
        <p>BSIT Student • Developer</p>
      </div>

      {/* RIGHT SIDE - RESUME & FCFS */}
      <div className="resume">
        <h1>My Résumé</h1>
        <p><b>About Me:</b> Passionate IT student specializing in web development.</p>

        <h2>Skills</h2>
        <ul>
          <li>JavaScript</li>
          <li>React JS</li>
          <li>PHP</li>
          <li>MySQL</li>
        </ul>

        <h2>CPU Scheduling Simulation – FCFS</h2>

        {/* INPUT FIELDS */}
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

          <button onClick={addProcess}>Add Process</button>
          <button onClick={calculateFCFS}>Calculate</button>
          <button onClick={clearTable} style={{ background: "red", color: "white" }}>
            Clear Table
          </button>
        </div>

        {/* PROCESS TABLE */}
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

        {/* GANTT CHART */}
        <h3>Gantt Chart</h3>
        <div className="gantt">
          {gantt.map((g) => (
            <div key={g.id} className="gantt-block">
              {g.pid} ({g.start} - {g.finish})
            </div>
          ))}
        </div>

        {/* PROJECT LIST */}
        <h2>My Projects</h2>
        <ul>
          <li><a href="#">Project 1</a></li>
          <li><a href="#">Project 2</a></li>
          <li><a href="#">Project 3</a></li>
        </ul>
      </div>
    </div>
  );
}

export default App;