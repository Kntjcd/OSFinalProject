import React, { useState } from "react";

function FCFS() {
  const [processes, setProcesses] = useState([
    { id: 1, arrival: "", burst: "" },
  ]);
  const [result, setResult] = useState(null);

  const handleChange = (index, field, value) => {
    const updated = [...processes];
    updated[index][field] = value;
    setProcesses(updated);
  };

  const addProcess = () => {
    setProcesses([
      ...processes,
      { id: processes.length + 1, arrival: "", burst: "" },
    ]);
  };

  const calculateFCFS = () => {
    // Validate
    for (let p of processes) {
      if (p.arrival === "" || p.burst === "") {
        alert("Please fill in all Arrival and Burst times.");
        return;
      }
    }

    // Sort by arrival time (as numbers)
    const sorted = [...processes].sort(
      (a, b) => Number(a.arrival) - Number(b.arrival)
    );

    let currentTime = 0;
    let results = [];

    sorted.forEach((p) => {
      const arrival = Number(p.arrival);
      const burst = Number(p.burst);

      const start = Math.max(currentTime, arrival);
      const finish = start + burst;

      results.push({
        id: p.id,
        arrival,
        burst,
        start,
        finish,
        waiting: start - arrival,
        turnaround: finish - arrival,
      });

      currentTime = finish;
    });

    setResult(results);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "15px" }}
      >
        FCFS Scheduling
      </h1>

      {processes.map((p, index) => (
        <div key={p.id} style={{ marginBottom: "10px" }}>
          <input
            type="number"
            placeholder="Arrival Time"
            value={p.arrival}
            onChange={(e) => handleChange(index, "arrival", e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            type="number"
            placeholder="Burst Time"
            value={p.burst}
            onChange={(e) => handleChange(index, "burst", e.target.value)}
            style={{ padding: "5px" }}
          />
        </div>
      ))}

      <button onClick={addProcess} style={{ marginRight: "10px" }}>
        Add Process
      </button>
      <button onClick={calculateFCFS}>Calculate</button>

      {result && (
        <table
          border="1"
          style={{
            marginTop: "20px",
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
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
            {result.map((r) => (
              <tr key={r.id}>
                <td>P{r.id}</td>
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
      )}
    </div>
  );
}

export default FCFS;
