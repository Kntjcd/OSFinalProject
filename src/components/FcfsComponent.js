import React, { useState } from "react";

function FcfsComponent() {
  const [processName, setProcessName] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState([]);
  const [gantt, setGantt] = useState([]);

  // Add process
  const addProcess = () => {
    if (!processName || arrival === "" || burst === "") {
      alert("Please fill out all fields.");
      return;
    }

    setProcesses([
      ...processes,
      {
        pid: processName,
        arrival: Number(arrival),
        burst: Number(burst),
      },
    ]);

    setProcessName("");
    setArrival("");
    setBurst("");
  };

  // Clear all
  const clearTable = () => {
    setProcesses([]);
    setResults([]);
    setGantt([]);
  };

  // FCFS Calculation
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

      ganttData.push({
        pid: p.pid,
        start,
        finish,
        id: index,
      });

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
    <div className="space-y-4">
      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Process Name"
          value={processName}
          onChange={(e) => setProcessName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Arrival Time"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Burst Time"
          value={burst}
          onChange={(e) => setBurst(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          onClick={addProcess}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={calculateFCFS}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Calculate FCFS
        </button>

        <button
          onClick={clearTable}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
      </div>

      {/* Process Table */}
      {processes.length > 0 && (
        <table className="w-full table-auto border mt-4">
          <thead>
            <tr className="bg-gray-300 dark:bg-gray-700">
              <th className="p-2 border">Process</th>
              <th className="p-2 border">Arrival</th>
              <th className="p-2 border">Burst</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p, i) => (
              <tr key={i}>
                <td className="p-2 border">{p.pid}</td>
                <td className="p-2 border">{p.arrival}</td>
                <td className="p-2 border">{p.burst}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <table className="w-full table-auto border mt-4">
          <thead>
            <tr className="bg-gray-300 dark:bg-gray-700">
              <th className="p-2 border">Process</th>
              <th className="p-2 border">Waiting Time</th>
              <th className="p-2 border">Turnaround Time</th>
              <th className="p-2 border">Finish Time</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td className="p-2 border">{r.pid}</td>
                <td className="p-2 border">{r.waiting}</td>
                <td className="p-2 border">{r.turnaround}</td>
                <td className="p-2 border">{r.finish}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Gantt Chart */}
      {gantt.length > 0 && (
        <div className="flex gap-2 mt-4">
          {gantt.map((g) => (
            <div
              key={g.id}
              className="border p-2 bg-blue-300 dark:bg-blue-800 text-center"
            >
              <p className="font-bold">{g.pid}</p>
              <p>
                {g.start} → {g.finish}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FcfsComponent;
