import React from 'react';
import data from '../data.json';

function Leaderboard() {
  // Sort data by the most recent value
  const sortedData = [...data].sort((a, b) => {
    const aLastValue = a.data[a.data.length - 1].value;
    const bLastValue = b.data[b.data.length - 1].value;
    return bLastValue - aLastValue;
  });

  return (
    <div className="w-full max-w-2xl bg-white p-4 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b-2">
            <th className="p-2 text-left">Rank</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-right">Not Realness</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((person, index) => (
            <tr key={person.name} className="border-b hover:bg-gray-50">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{person.name}</td>
              <td className="p-2 text-right">
                {person.data[person.data.length - 1].value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard; 