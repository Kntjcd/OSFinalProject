import React, { useState } from "react";
import "./App.css";

function App() {
  // FCFS Data
  const [processes, setProcesses] = useState([
    { pid: "P1", arrival: 0, burst: 4 },
    { pid: "P2", arrival: 1, burst: 3 },
    { pid: "P3", arrival: 2, burst: 1 },
  ]);

  const [results, setResults] = useState([]);
  const [gantt, setGantt] = useState([]);

  const calculateFCFS = () => {
    let time = 0;
    let ganttData = [];
    let output = [];

    processes
      .sort((a, b) => a.arrival - b.arrival)
      .forEach((p) => {
        const start = Math.max(time, p.arrival);
        const finish = start + p.burst;
        const waiting = start - p.arrival;
        const turnaround = finish - p.arrival;

        ganttData.push({ pid: p.pid, start, finish });
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
      {/* Left - Profile */}
      <div className="profile">
        <img src="profile.jpg" alt="Profile" className="pfp" />
        <h2>Kent Jeced Alcantara</h2>
        <p>BSIT Student • Developer</p>
      </div>

      {/* Right - Resume */}
      <div className="resume">
        <h1>My Résumé</h1>
        <p><b>About Me:</b> Passionate IT student specializing in web development and programming.</p>

        <h2>Skills</h2>
        <ul>
          <li>JavaScript</li>
          <li>React JS</li>
          <li>PHP</li>
          <li>MySQL</li>
        </ul>

        <h2>Education</h2>
        <p>BS Information Technology</p>

        <h2>CPU Scheduling Simulation (FCFS)</h2>

        <button onClick={calculateFCFS}>Run FCFS Scheduling</button>

        {/* Gantt Chart */}
        <div className="gantt">
          {gantt.map((g) => (
            <div key={g.pid} className="gantt-block">
              {g.pid} ({g.start} - {g.finish})
            </div>
          ))}
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Process</th>
              <th>Arrival</th>
              <th>Burst</th>
              <th>Waiting</th>
              <th>Turnaround</th>
              <th>Finish Time</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.pid}>
                <td>{r.pid}</td>
                <td>{r.arrival}</td>
                <td>{r.burst}</td>
                <td>{r.waiting}</td>
                <td>{r.turnaround}</td>
                <td>{r.finish}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Projects */}
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
