import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

function PrescriptionHistory() {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/prescriptions/history');
        const userHistory = res.data.filter(entry => entry.userId === userId);
        setHistory(userHistory);
        setFiltered(userHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  useEffect(() => {
    const filteredData = history.filter(entry =>
      entry.medicationName?.toLowerCase().includes(search.toLowerCase()) ||
      entry.doctorName?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData);
  }, [search, history]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Prescription History", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [['User', 'Medication', 'Doctor', 'Prescriptions', 'Tips', 'Action', 'Date']],
      body: filtered.map(entry => [
        entry.username || 'N/A',
        entry.medicationName,
        entry.doctorName,
        entry.prescriptions.join(', '),
        entry.tips.join(', '),
        entry.action,
        moment(entry.timestamp).format('YYYY-MM-DD HH:mm')
      ])
    });

    doc.save("prescription-history.pdf");

    Swal.fire({
      title: 'Exported!',
      text: 'PDF file has been downloaded.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  if (loading) {
    return <div className="text-center mt-10 font-semibold text-lg">Loading history...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-40 p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Your Prescription History</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Filter by Medication or Doctor Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm w-80"
        />
        <button
          onClick={exportToPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
        >
          Export to PDF
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center font-semibold text-lg">No matching history found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Medication</th>
                <th className="py-2 px-4 text-left">Doctor</th>
                <th className="py-2 px-4 text-left">Prescriptions</th>
                <th className="py-2 px-4 text-left">Tips</th>
                <th className="py-2 px-4 text-left">Action</th>
                <th className="py-2 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filtered.map((entry, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-2 px-4">{entry.medicationName}</td>
                  <td className="py-2 px-4">{entry.doctorName}</td>
                  <td className="py-2 px-4">
                    <ul className="list-disc list-inside text-sm">
                      {entry.prescriptions.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </td>
                  <td className="py-2 px-4">
                    <ul className="list-disc list-inside text-sm">
                      {entry.tips.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </td>
                  <td className="py-2 px-4 capitalize">{entry.action}</td>
                  <td className="py-2 px-4">{moment(entry.timestamp).format('YYYY-MM-DD HH:mm')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PrescriptionHistory;
