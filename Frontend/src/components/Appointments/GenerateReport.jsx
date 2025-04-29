const generatePDF = () => {
  if (filteredAppointments.length === 0) {
    alert("No matching appointments to generate a report.");
    return;
  }

  // Create new PDF document
  const doc = new jsPDF();
  
  // Add title and metadata
  doc.setFontSize(18);
  doc.text("Appointment Report", 14, 22);
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  // Define columns for the table
  const tableColumn = ["Email", "Doctor", "Date", "Day", "Time", "Location", "Note"];
  const tableRows = [];

  // Process each appointment for the report
  filteredAppointments.forEach((appointment) => {
    const formattedDate = new Date(appointment.date).toLocaleDateString("en-CA");
    
    // Truncate note if it's too long
    const truncatedNote = appointment.note?.length > 30 
      ? appointment.note.substring(0, 30) + "..." 
      : appointment.note || "N/A";
    
    tableRows.push([
      appointment.email || "N/A",
      appointment.doctorName || "N/A",
      formattedDate,
      appointment.day || "N/A",
      appointment.time || "N/A",
      appointment.location || "N/A",
      truncatedNote
    ]);
  });

  // Generate table with appointments data
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 35,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [66, 139, 202] },
    theme: "grid"
  });
  
  // Log success message and save PDF
  console.log(`Generated PDF with ${filteredAppointments.length} appointments`);
  doc.save("Appointment_Report.pdf");
};