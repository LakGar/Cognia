const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cronJobs = require("./middlewares/cronJob");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Static folder for uploaded files
app.use("/uploads", express.static("uploads"));

// Routes
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const taskRoutes = require("./routes/taskRoutes");
const caregiverRoutes = require("./routes/caregiverRoutes");
const appointmentsRoutes = require("./routes/appointmentRoutes");
// const commentRoutes = require("./routes/commentRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/caregivers", caregiverRoutes);
app.use("/api/appointments", appointmentsRoutes);

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    cronJobs.updateOverdueTasks();
    cronJobs.updateOverdueCarePlans();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Welcome to the Social Media App API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
