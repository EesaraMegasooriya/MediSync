// reminderJob.js
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const dayjs = require("dayjs");
const Appointment = require("./Models/AppointmentModel"); // Adjust path if needed

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your_email@gmail.com",         // Replace with your Gmail
    pass: "your_app_password",            // Use Gmail App Password
  },
});

// Reminder function
const sendReminders = async () => {
  const tomorrowStart = dayjs().add(1, "day").startOf("day").toDate();
  const tomorrowEnd = dayjs().add(1, "day").endOf("day").toDate();

  const upcomingAppointments = await Appointment.find({
    date: { $gte: tomorrowStart, $lte: tomorrowEnd },
    reminder_sent: { $ne: true }, // <-- Fix here
  });

  for (const appt of upcomingAppointments) {
    const mailOptions = {
      from: "your_email@gmail.com",
      to: appt.email,
      subject: "⏰ Appointment Reminder - MediSync",
      text: `Hello!

This is a reminder for your appointment with Dr. ${appt.doctorName} on ${dayjs(appt.date).format("YYYY-MM-DD")} at ${appt.time}, located at ${appt.location}.

Note: ${appt.note || "No additional notes"}

- MediSync Team`,
    };

    try {
      await transporter.sendMail(mailOptions);
      appt.reminder_sent = true; // <-- Fix here
      await appt.save();
      console.log(`✅ Reminder sent to ${appt.email}`);
    } catch (err) {
      console.error(`❌ Failed to send to ${appt.email}:`, err);
    }
  }
};

// Schedule to run daily at 9 AM
cron.schedule("0 9 * * *", () => {
  console.log("📬 Running daily appointment reminder job...");
  sendReminders();
});
