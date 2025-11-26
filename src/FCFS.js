import React, { useState } from "react";

function FCFS() {
  const [processes, setProcesses] = useState([{ id: 1, arrival: "", burst: "" }]);
  const [result, setResult] = useState(null);

  const handleChange = (index, field, value) => {
    const updated = [...processes];
    updated[index][field] = value;
    setProcesses(updated);
  };

  const addProcess = () => {
    setProcesses([
      ...processes,
      { id: processes.length + 1, arrival: "", burst: "" }
    ]);
  };

  const calculateFCFS = () => {
    const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);

    let currentTime = 0;
    let results = [];

    sorted.forEach((p) => {
      const start = Math.max(currentTime, Number(p.arrival));
      const finish = start + Number(p.burst);

      results.push({
        id: p.id,
        arrival: p.arrival,
        burst: p.burst,
        start,
        finish,
        waiting: start - p.arrival,
        turnaround: finish - p.arrival
      });

      currentTime = finish;
    });

    setResult(results);
  };

  return (
    <div>
      <h1>FCFS Scheduling</h1>

      {processes.map((p, index) => (
        <div key={p.id}>
          <input
            type="number"
            placeholder="Arrival Time"
            value={p.arrival}
            onChange={(e) => handleChange(index, "arrival", e.target.value)}
          />
          <input
            type="number"
            placeholder="Burst Time"
            value={p.burst}
            onChange={(e) => handleChange(index, "burst", e.target.value)}
          />
        </div>
      ))}

      <button onClick={addProcess}>Add Process</button>
      <button onClick={calculateFCFS}>Calculate</button>

      {result && (
        <table border="1" style={{ marginTop: "20px" }}>
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
