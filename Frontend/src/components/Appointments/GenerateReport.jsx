const generatePDF = () => {
  if (!filteredAppointments || filteredAppointments.length === 0) {
    alert("No matching appointments to generate a report.");
    return;
  }

  console.log("Generating PDF with appointments:", filteredAppointments);

  const doc = new jsPDF();
  doc.text("Appointment Report", 20, 10);

  const tableColumn = ["Email", "Doctor", "Date", "Day", "Time", "Location", "Note"];
  const tableRows = [];

  filteredAppointments.forEach((appointment) => {
    tableRows.push([
      appointment.email || "N/A",
      appointment.doctorName || "N/A",
      new Date(appointment.date).toLocaleDateString("en-CA"), // Format Date
      appointment.day || "N/A",
      appointment.time || "N/A",
      appointment.location || "N/A",
      appointment.note || "N/A",
    ]);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 10 },
    theme: "grid",
  });

  doc.save("Appointment_Report.pdf");
};
