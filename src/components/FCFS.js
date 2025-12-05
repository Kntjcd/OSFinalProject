// src/components/FcfsComponent.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        id: Date.now(),
        pid: processName,
        arrival: Number(arrival),
        burst: Number(burst),
      },
    ]);
    setProcessName("");
    setArrival("");
    setBurst("");
    setResults([]);
    setGantt([]);
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

  const fadeIn = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-2"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <input
          value={processName}
          onChange={(e) => setProcessName(e.target.value)}
          type="text"
          placeholder="Process Name"
          className="p-2 border rounded"
        />
        <input
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          type="number"
          placeholder="Arrival Time"
          className="p-2 border rounded"
        />
        <input
          value={burst}
          onChange={(e) => setBurst(e.target.value)}
          type="number"
          placeholder="Burst Time"
          className="p-2 border rounded"
        />
        <button
          onClick={addProcess}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </motion.div>

      <motion.div
        className="flex gap-4 mb-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
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
      </motion.div>

      {/* Preview processes */}
      <div>
        <h4 className="font-semibold mb-2">Processes</h4>
        <AnimatePresence>
          {processes.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-gray-500"
            >
              No processes added.
            </motion.div>
          ) : (
            <motion.table className="w-full table-auto border">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 border">Process</th>
                  <th className="p-2 border">Arrival</th>
                  <th className="p-2 border">Burst</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((p) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                  >
                    <td className="p-2 border">{p.pid}</td>
                    <td className="p-2 border">{p.arrival}</td>
                    <td className="p-2 border">{p.burst}</td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Results</h4>
        <AnimatePresence>
          {results.length === 0 ? (
            <motion.div
              key="nores"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-gray-500"
            >
              No results yet.
            </motion.div>
          ) : (
            <motion.table
              className="w-full table-auto border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 border">Process</th>
                  <th className="p-2 border">Waiting</th>
                  <th className="p-2 border">Turnaround</th>
                  <th className="p-2 border">Finish</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <motion.tr
                    key={r.pid}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                  >
                    <td className="p-2 border">{r.pid}</td>
                    <td className="p-2 border">{r.waiting}</td>
                    <td className="p-2 border">{r.turnaround}</td>
                    <td className="p-2 border">{r.finish}</td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          )}
        </AnimatePresence>
      </div>

      {/* Gantt */}
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Gantt Chart</h4>
        <div className="flex gap-2">
          <AnimatePresence>
            {gantt.length === 0 ? (
              <motion.div
                key="nogantt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-gray-500"
              >
                No Gantt to display
              </motion.div>
            ) : (
              gantt.map((g) => (
                <motion.div
                  key={g.id}
                  layout
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.98, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="border p-2 bg-blue-300 dark:bg-blue-800 text-center rounded"
                  style={{ minWidth: Math.max((g.finish - g.start) * 36, 60) }}
                >
                  <div className="font-bold">{g.pid}</div>
                  <div className="text-sm">
                    {g.start} → {g.finish}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default FcfsComponent;
