import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ShowGraph = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {

        const userId = localStorage.getItem('userId'); // Get userId from localStorage
        if (!userId) {
            setError('User ID is missing. Please log in again.');
            setLoading(false);
            return;
        }

        const response = await fetch(`http://localhost:5000/api/healthrecords/getallrecords/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch records');
        }
        const data = await response.json();
        setRecords(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const data = {
    labels: records.map(record => new Date(record.diagnosisDate).toLocaleDateString()),
    datasets: [{
      label: 'Health Records Over Time',
      data: records.map(record => record.level === 'High' ? 2 : 1),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        
        position: 'top',
      },
      title: {
        display: true,
        text: 'Health Status Trend'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 3,
        ticks: {
          callback: function(value) {
            if (value === 1) return 'Normal';
            if (value === 2) return 'High';
            return '';
          }
        }
      }
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg m-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Health Status Graph</h2>
      <div className="w-full h-[60vh]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ShowGraph;