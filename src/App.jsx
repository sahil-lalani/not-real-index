import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import data from './data.json';
import 'chart.js/auto';
import { Routes, Route, NavLink } from 'react-router-dom';
import Leaderboard from './components/Leaderboard';

function App() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    if (data && data[0] && data[0].data) {
      const labels = data[0].data.map(point => point.date);
      const datasets = data.map(person => ({
        label: person.name,
        data: person.data.map(point => point.value),
        fill: false,
        borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        tension: 0.1
      }));

      setChartData({
        labels,
        datasets
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen gap-4 p-4 md:p-8 md:gap-8 bg-blue-200">
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        Not Real Index
      </h1>
      <p className="text-sm md:text-base text-gray-500 text-center">
        Sponsored by{" "}
        <a href="https://abs.framer.website" target="_blank" className="hover:underline">
          Alpha Beta Sigma
        </a>
      </p>

      <div className="flex flex-row items-center gap-4">
        <NavLink 
          to="/" 
          className={({ isActive }) =>
            `${isActive ? 'underline' : ''}`
          }
        >
          Graph
        </NavLink>
        <NavLink 
          to="/leaderboard" 
          className={({ isActive }) =>
            `${isActive ? 'underline' : ''}`
          }
        >
          Leaderboard
        </NavLink>
        <button className={({ isActive }) =>
          `${isActive ? 'underline' : ''}`
        } disabled>
          Trading Cards (coming soon)
        </button>
      </div>
      
      <Routes>
        <Route 
          path="/" 
          element={
            chartData.datasets.length ? (
              <div className="w-full max-w-2xl bg-white p-2 md:p-4 rounded-lg">
                <Line data={chartData} />
              </div>
            ) : (
              <div>Loading...</div>
            )
          } 
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
