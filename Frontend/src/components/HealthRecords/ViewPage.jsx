import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReportCard = ({ diseaseName, diagnosisDate, level, status, hospitalName, diagnosedBy, symptoms, labTestResult, doctorsNote, additionalNote, ...record }) => {
  const navigate = useNavigate();
  const formattedDate = new Date(diagnosisDate).toLocaleDateString();

  const downloadPDF = () => {
    try {
      const doc = new window.jspdf.jsPDF();
      
      // Letterhead
      doc.setFillColor(41, 128, 185);
      doc.rect(0, 0, 220, 45, 'F');
      
      // Logo placeholder (you can add actual logo)
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(30);
      doc.setFont(undefined, 'bold');
      doc.text('MediSync', 20, 25);
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.text('Healthcare Management System', 20, 35);

      // Document Title
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 50, 220, 15, 'F');
      doc.setTextColor(41, 128, 185);
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('MEDICAL RECORD REPORT', 105, 60, { align: 'center' });

      // Reference Number and Date
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(10);
      doc.text(`Ref: MS-${Date.now().toString().slice(-8)}`, 20, 80);
      doc.text(`Generated: ${new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`, 20, 87);

      // Patient Disease Information
      doc.setFillColor(41, 128, 185);
      doc.setTextColor(255, 255, 255);
      doc.rect(20, 100, 170, 8, 'F');
      doc.setFontSize(12);
      doc.text('DISEASE INFORMATION', 25, 106);

      const data = [
        [{ content: 'Disease Name:', styles: { fontStyle: 'bold' } }, diseaseName],
        [{ content: 'Diagnosis Date:', styles: { fontStyle: 'bold' } }, formattedDate],
        [{ content: 'Level:', styles: { fontStyle: 'bold' } }, level],
        [{ content: 'Current Status:', styles: { fontStyle: 'bold' } }, status || 'Normal'],
      ];

      doc.autoTable({
        startY: 110,
        margin: { left: 20, right: 20 },
        body: data,
        styles: { 
          fontSize: 11,
          cellPadding: 5,
        },
        columnStyles: {
          0: { cellWidth: 60, fillColor: [250, 250, 250] },
          1: { cellWidth: 110 }
        },
        alternateRowStyles: {
          fillColor: [245, 250, 255]
        }
      });

      // Hospital Information
      doc.setFillColor(41, 128, 185);
      doc.setTextColor(255, 255, 255);
      doc.rect(20, doc.autoTable.previous.finalY + 10, 170, 8, 'F');
      doc.text('HOSPITAL DETAILS', 25, doc.autoTable.previous.finalY + 16);

      const hospitalData = [
        [{ content: 'Hospital Name:', styles: { fontStyle: 'bold' } }, hospitalName || 'N/A'],
        [{ content: 'Diagnosed By:', styles: { fontStyle: 'bold' } }, diagnosedBy || 'N/A'],
      ];

      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 20,
        margin: { left: 20, right: 20 },
        body: hospitalData,
        styles: { 
          fontSize: 11,
          cellPadding: 5
        },
        columnStyles: {
          0: { cellWidth: 60, fillColor: [250, 250, 250] },
          1: { cellWidth: 110 }
        },
        alternateRowStyles: {
          fillColor: [245, 250, 255]
        }
      });

      // Medical Information
      doc.setFillColor(41, 128, 185);
      doc.setTextColor(255, 255, 255);
      doc.rect(20, doc.autoTable.previous.finalY + 10, 170, 8, 'F');
      doc.text('MEDICAL DETAILS', 25, doc.autoTable.previous.finalY + 16);

      const medicalData = [
        [{ content: 'Symptoms:', styles: { fontStyle: 'bold' } }, symptoms || 'N/A'],
        [{ content: 'Lab Test Result:', styles: { fontStyle: 'bold' } }, labTestResult || 'N/A'],
        [{ content: 'Doctor\'s Note:', styles: { fontStyle: 'bold' } }, doctorsNote || 'N/A'],
        [{ content: 'Additional Note:', styles: { fontStyle: 'bold' } }, additionalNote || 'N/A'],
      ];

      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 20,
        margin: { left: 20, right: 20 },
        body: medicalData,
        theme: 'striped',
        styles: { 
          fontSize: 11,
          cellPadding: 5
        },
        columnStyles: {
          0: { cellWidth: 60, fillColor: [250, 250, 250] },
          1: { cellWidth: 110 }
        },
        alternateRowStyles: {
          fillColor: [245, 250, 255]
        }
      });

      // Footer
      const pageHeight = doc.internal.pageSize.height;
      doc.setDrawColor(41, 128, 185);
      doc.line(20, pageHeight - 20, 190, pageHeight - 20);
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.text('This is a computer-generated document. No signature is required.', 105, pageHeight - 15, { align: 'center' });
      doc.text('© MediSync Healthcare Management System', 105, pageHeight - 10, { align: 'center' });

      doc.save(`MediSync_Report_${diseaseName}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

 // Find and replace the ReportCard component's return statement with this:
return (
  <div className="bg-white shadow-lg rounded-lg p-6 text-center w-72">
    <h2 className="font-bold text-lg">{diseaseName}</h2>
    <p className="text-gray-600">Date: {formattedDate}</p>
    <p className="text-gray-600">Level: {level}</p>
    <p className={`font-semibold ${status === "High" ? "text-red-500" : "text-green-500"}`}>
      Current Status: {status || 'Normal'}
    </p>
    <div className="flex justify-center gap-4 mt-4">
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg" 
        onClick={() => navigate("/records/update", { 
          state: { 
            record: {
              diseaseName,
              diagnosisDate,
              level,
              status,
              hospitalName,
              diagnosedBy,
              symptoms,
              labTestResult,
              doctorsNote,
              additionalNote,
              ...record
            }
          }
        })}
      >
        View
      </button>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={downloadPDF}
      >
        Download
      </button>
    </div>
  </div>
);
}

// search bar
const ViewRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/healthrecords/getallrecords/user/507f1f77bcf86cd799439011');
        if (!response.ok) {
          throw new Error('Failed to fetch records');
        }
        const data = await response.json();
        const sortedRecords = data.sort((a, b) => 
          new Date(b.diagnosisDate) - new Date(a.diagnosisDate)
        );
        setRecords(sortedRecords);
        setFilteredRecords(sortedRecords);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = records.filter((record) => {
      return (
        record.diseaseName.toLowerCase().includes(query) ||
        record.hospitalName?.toLowerCase().includes(query) ||
        new Date(record.diagnosisDate).toLocaleDateString().includes(query) ||
        record.level?.toLowerCase().includes(query)
      );
    });

    setFilteredRecords(filtered);
  };

  if (loading) return <main id="main" className="main"><div className="p-8">Loading...</div></main>;
  if (error) return <main id="main" className="main"><div className="p-8">Error: {error}</div></main>;

 // Update the return statement in ViewRecords component
 return (
  <main id="main" className="main">
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col mb-6 mt-20">
        {/* Title moved to left corner */}
        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-left">View Records</h1>
        
        {/* Search bar below title */}
        <div className="relative w-full md:w-1/2 max-w-2xl">
          <input
            type="text"
            placeholder="Search by disease, hospital, date, or level..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && filteredRecords.length === 0 && (
            <p className="text-red-500 mt-2">No records found matching your search.</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {filteredRecords.map((record, index) => (
          <ReportCard key={record._id || index} {...record} />
        ))}
      </div>

      {filteredRecords.length === 0 && searchQuery && (
        <div className="text-center mt-8">
          <p className="text-gray-500">No records found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  </main>
);
}
export default ViewRecords;
