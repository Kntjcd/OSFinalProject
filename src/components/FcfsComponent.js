import React, { useState } from "react";

/**
 * FCFS component
 * - Add processes (name, arrival, burst)
 * - Calculate FCFS (waiting, turnaround, finish)
 * - Clear table
 * - Shows Gantt chart
 */
export default function FCFS() {
  const [processName, setProcessName] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const [processes, setProcesses] = useState([]); // raw input rows
  const [results, setResults] = useState([]); // computed rows
  const [gantt, setGantt] = useState([]); // gantt blocks

  // Add process to the list
  const addProcess = () => {
    if (!processName.trim() || arrival === "" || burst === "") {
      alert("Please fill in Process Name, Arrival, and Burst time.");
      return;
    }
    const newProcess = {
      id: Date.now(), // unique id
      pid: processName.trim(),
      arrival: Number(arrival),
      burst: Number(burst),
    };
    setProcesses((prev) => [...prev, newProcess]);
    // clear inputs
    setProcessName("");
    setArrival("");
    setBurst("");
    // reset previous results/gantt so user knows to recalc
    setResults([]);
    setGantt([]);
  };

  // Remove a process before calculation
  const removeProcess = (id) => {
    setProcesses((prev) => prev.filter((p) => p.id !== id));
  };

  // Clear everything
  const clearTable = () => {
    setProcesses([]);
    setResults([]);
    setGantt([]);
  };

  // FCFS calculation
  const calculateFCFS = () => {
    if (processes.length === 0) {
      alert("Add at least one process before calculating.");
      return;
    }

    // sort by arrival (stable)
    const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);

    let time = 0;
    const computed = [];
    const ganttData = [];

    for (let i = 0; i < sorted.length; i++) {
      const p = sorted[i];
      const start = Math.max(time, p.arrival);
      const finish = start + p.burst;
      const waiting = start - p.arrival;
      const turnaround = finish - p.arrival;

      computed.push({
        id: p.id,
        pid: p.pid,
        arrival: p.arrival,
        burst: p.burst,
        start,
        finish,
        waiting,
        turnaround,
      });

      ganttData.push({ pid: p.pid, start, finish });
      time = finish;
    }

    setResults(computed);
    setGantt(ganttData);
  };

  return (
    <div style={{ padding: 8 }}>
      <h2 style={{ marginTop: 0 }}>FCFS Scheduling</h2>

      {/* Input row */}
      <div className="input-section" style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Process Name (P1)"
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

        <div className="button-group" style={{ alignItems: "center" }}>
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

      {/* Input list / preview (before calculation) */}
      <div style={{ marginBottom: 12 }}>
        <strong>Processes (preview)</strong>
        <div style={{ marginTop: 8 }}>
          {processes.length === 0 ? (
            <div style={{ color: "var(--subtext)" }}>No processes added.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Process</th>
                  <th>Arrival</th>
                  <th>Burst</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((p) => (
                  <tr key={p.id}>
                    <td>{p.pid}</td>
                    <td>{p.arrival}</td>
                    <td>{p.burst}</td>
                    <td>
                      <button
                        onClick={() => removeProcess(p.id)}
                        style={{
                          background: "#ff4d4f",
                          padding: "6px 10px",
                          borderRadius: 6,
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Results table */}
      <div style={{ marginTop: 6 }}>
        <strong>Results</strong>
        <div style={{ marginTop: 8 }}>
          {results.length === 0 ? (
            <div style={{ color: "var(--subtext)" }}>
              No computed results. Click <b>Calculate</b> to compute.
            </div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Process</th>
                    <th>Arrival</th>
                    <th>Burst</th>
                    <th>Start</th>
                    <th>Finish</th>
                    <th>Waiting</th>
                    <th>Turnaround</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.id}>
                      <td>{r.pid}</td>
                      <td>{r.arrival}</td>
                      <td>{r.burst}</td>
                      <td>{r.start}</td>
                      <td>{r.finish}</td>
                      <td>{r.waiting}</td>
                      <td>{r.turnaround}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Gantt chart */}
      <div style={{ marginTop: 14 }}>
        <strong>Gantt Chart</strong>
        <div
          className="gantt"
          style={{
            marginTop: 10,
            alignItems: "center",
          }}
        >
          {gantt.length === 0 ? (
            <div style={{ color: "var(--subtext)" }}>
              No Gantt chart to show.
            </div>
          ) : (
            gantt.map((g, idx) => {
              const width = Math.max(g.finish - g.start, 1) * 36; // visual scaling
              return (
                <div
                  key={idx}
                  className="gantt-block"
                  style={{
                    minWidth: 40,
                    width,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{g.pid}</div>
                  <div style={{ fontSize: 12 }}>
                    {g.start} - {g.finish}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
