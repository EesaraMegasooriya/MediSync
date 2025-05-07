import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function PrescriptionHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/prescriptions/history'); // 👈 no username
        setHistory(res.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 font-semibold text-lg">Loading history...</div>;
  }

  if (history.length === 0) {
    return <div className="text-center mt-10 font-semibold text-lg">No prescription history found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">All Prescription History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Medication</th>
              <th className="py-2 px-4 text-left">Doctor</th>
              <th className="py-2 px-4 text-left">Prescriptions</th>
              <th className="py-2 px-4 text-left">Tips</th>
              <th className="py-2 px-4 text-left">Action</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {history.map((entry, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-2 px-4">{entry.username}</td>
                <td className="py-2 px-4">{entry.medicationName}</td>
                <td className="py-2 px-4">{entry.doctorName}</td>
                <td className="py-2 px-4">
                  <ul className="list-disc list-inside text-sm">
                    {entry.prescriptions.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4">
                  <ul className="list-disc list-inside text-sm">
                    {entry.tips.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 capitalize">{entry.action}</td>
                <td className="py-2 px-4">{moment(entry.timestamp).format('YYYY-MM-DD HH:mm')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PrescriptionHistory;
