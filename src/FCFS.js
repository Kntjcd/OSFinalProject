import React, { useState } from "react";

export default function FCFS() {
  const [processName, setProcessName] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [processes, setProcesses] = useState([]);
  const [gantt, setGantt] = useState([]);

  const addProcess = () => {
    if (!processName || arrivalTime === "" || burstTime === "") return;

    const newProcess = {
      name: processName,
      arrival: parseInt(arrivalTime),
      burst: parseInt(burstTime),
    };

    setProcesses([...processes, newProcess]);

    setProcessName("");
    setArrivalTime("");
    setBurstTime("");
  };

  const clearTable = () => {
    setProcesses([]);
    setGantt([]);
  };

  const calculateFCFS = () => {
    if (processes.length === 0) return;

    let sorted = [...processes].sort((a, b) => a.arrival - b.arrival);

    let currentTime = 0;
    let ganttData = [];
    let computed = sorted.map((p) => {
      let start = Math.max(currentTime, p.arrival);
      let completion = start + p.burst;
      let turnaround = completion - p.arrival;
      let waiting = turnaround - p.burst;

      ganttData.push({ name: p.name, start, finish: completion });

      currentTime = completion;

      return {
        ...p,
        completion,
        turnaround,
        waiting,
      };
    });

    setProcesses(computed);
    setGantt(ganttData);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>First Come First Serve (FCFS) Scheduling</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Process Name (e.g., P1)"
          value={processName}
          onChange={(e) => setProcessName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Arrival Time"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Burst Time"
          value={burstTime}
          onChange={(e) => setBurstTime(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={addProcess}>Add Process</button>
      </div>

      <table border="1" width="100%" cellPadding="5">
        <thead>
          <tr>
            <th>Process</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Completion</th>
            <th>Turnaround</th>
            <th>Waiting</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((p, index) => (
            <tr key={index}>
              <td>{p.name}</td>
              <td>{p.arrival}</td>
              <td>{p.burst}</td>
              <td>{p.completion ?? "-"}</td>
              <td>{p.turnaround ?? "-"}</td>
              <td>{p.waiting ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button onClick={calculateFCFS} style={{ marginRight: "10px" }}>
          CALCULATE
        </button>
        <button onClick={clearTable}>CLEAR TABLE</button>
      </div>

      <h3 style={{ marginTop: "30px" }}>Gantt Chart</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        {gantt.map((g, i) => (
          <div
            key={i}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginRight: "5px",
              minWidth: `${g.finish - g.start}0px`,
              textAlign: "center",
            }}
          >
            {g.name}
            <div style={{ fontSize: "12px" }}>
              {g.start} - {g.finish}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
