const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const Patient = require("../models/patientSchema");
const Caregiver = require("../models/caregiverSchema");
const auth = require("../middlewares/auth");
const updateLoginStreak = require("../middlewares/updateLoginStreak");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { auth, password } = req.body;
  console.log(`logging in user`);

  try {
    // Find the user by email or phone number
    const user = await User.findOne({
      $or: [{ email: auth }, { phoneNumber: auth }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/", async (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
      userType,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to create a new patient and add them to the caregiver's patient list
router.post("/caregivers/add-patient", auth, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      dateOfBirth,
      occupation,
      address,
      gender,
      medicalInformation,
      doctorId, // Accept doctorId from the request body
    } = req.body;

    // Get the caregiver ID from the authenticated user's caregiverInfo
    const currentUser = await User.findById(req.userId); // Use req.userId
    const caregiverId = currentUser.caregiverInfo;

    if (!caregiverId) {
      return res.status(400).json({ message: "Invalid caregiver information" });
    }

    // Check if the doctor exists
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.userType !== "DOCTOR") {
      return res.status(400).json({ message: "Invalid doctor information" });
    }

    // Check if a patient with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists" });
    }

    // Create a new user for the patient
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      occupation,
      address,
      userType: "PATIENT",
      password: "defaultPassword", // Consider using a secure random password and notify the patient
    });

    const savedUser = await newUser.save();

    // Create a new patient profile
    const newPatient = new Patient({
      medicalInformation,
      caregiver: currentUser._id, // Link caregiver as the current user
      doctor: doctor._id, // Link the doctor
    });

    const savedPatient = await newPatient.save();

    // Update the user's patientInfo with the new patient's ID
    savedUser.patientInfo = savedPatient._id;
    await savedUser.save();

    // Find the caregiver and add the new patient to their patient list
    const caregiver = await Caregiver.findById(caregiverId);
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

    caregiver.patient.push(savedUser._id);
    await caregiver.save();

    res.status(201).json({
      message: "Patient created and added to caregiver's patient list",
      patient: savedUser,
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/doctors", auth, async (req, res) => {
  try {
    // Query for users where userType is "DOCTOR"
    const doctors = await User.find({ userType: "DOCTOR" }).select("-password");
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/careteam", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "careTeam.user",
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.careTeam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update", auth, async (req, res) => {
  const {
    firstName,
    lastName,
    bio,
    occupation,
    address,
    privacySettings,
    profilePicture,
  } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (bio) user.bio = bio;
    if (occupation) user.occupation = occupation;
    if (address) user.address = address;
    if (privacySettings) user.privacySettings = privacySettings;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Received request to get user with ID:", id);

  if (!id || id === "undefined") {
    console.error("Invalid or undefined ID");
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
