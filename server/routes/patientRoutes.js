const express = require("express");
const User = require("../models/userSchema");
const Patient = require("../models/patientSchema");
const auth = require("../middlewares/auth");

const router = express.Router();

// Add PatientInformation to the userID sent
router.post("/patient", auth, async (req, res) => {
  const {
    userId,
    medicalInformation,
    doctor,
    caregiver,
    family,
    sleep,
    mood,
    activity,
    emergencyContacts,
  } = req.body;

  try {
    const patient = new Patient({
      medicalInformation,
      doctor,
      caregiver,
      family,
      sleep,
      mood,
      activity,
      emergencyContacts,
    });

    const savedPatient = await patient.save();

    const user = await User.findById(userId);
    user.patientInfo = savedPatient._id;
    await user.save();

    res.status(201).json(savedPatient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update PatientInformation for the userID sent
router.put("/patient/:userId", auth, async (req, res) => {
  const { userId } = req.params;
  const {
    medicalInformation,
    doctor,
    caregiver,
    family,
    sleep,
    mood,
    activity,
    emergencyContacts,
  } = req.body;

  try {
    const user = await User.findById(userId).populate("patientInfo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patient = await Patient.findById(user.patientInfo._id);
    if (!patient) {
      return res.status(404).json({ message: "Patient information not found" });
    }

    if (medicalInformation) patient.medicalInformation = medicalInformation;
    if (doctor) patient.doctor = doctor;
    if (caregiver) patient.caregiver = caregiver;
    if (family) patient.family = family;
    if (sleep) patient.sleep = sleep;
    if (mood) patient.mood = mood;
    if (activity) patient.activity = activity;
    if (emergencyContacts) patient.emergencyContacts = emergencyContacts;

    await patient.save();

    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Get patient information
router.get("/patient/:userId", auth, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("patientInfo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.patientInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// Delete PatientInfo for the userID sent
router.delete("/patient/:userId", auth, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patient = await Patient.findByIdAndDelete(user.patientInfo._id);
    if (!patient) {
      return res.status(404).json({ message: "Patient information not found" });
    }

    user.patientInfo = null;
    await user.save();

    res.json({ message: "Patient information deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/patient/:userId/sleep", auth, async (req, res) => {
  const { userId } = req.params;
  const { startTime, endTime, quality, notes } = req.body;

  try {
    const user = await User.findById(userId).populate("patientInfo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patient = await Patient.findById(user.patientInfo._id);
    if (!patient) {
      return res.status(404).json({ message: "Patient information not found" });
    }

    patient.sleep.push({
      startTime,
      endTime,
      quality,
      notes,
      createdAt: new Date(),
    });
    await patient.save();

    res.status(201).json(patient.sleep);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a sleep entry for the userID sent
router.put("/patient/:userId/sleep/:sleepId", auth, async (req, res) => {
  const { userId, sleepId } = req.params;
  const { startTime, endTime, quality, notes } = req.body;

  try {
    const user = await User.findById(userId).populate("patientInfo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patient = await Patient.findById(user.patientInfo._id);
    if (!patient) {
      return res.status(404).json({ message: "Patient information not found" });
    }

    const sleepEntry = patient.sleep.id(sleepId);
    if (!sleepEntry) {
      return res.status(404).json({ message: "Sleep entry not found" });
    }

    sleepEntry.startTime = startTime || sleepEntry.startTime;
    sleepEntry.endTime = endTime || sleepEntry.endTime;
    sleepEntry.quality = quality || sleepEntry.quality;
    sleepEntry.notes = notes || sleepEntry.notes;

    await patient.save();

    res.json(patient.sleep);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a sleep entry for the userID sent
router.delete("/patient/:userId/sleep/:sleepId", auth, async (req, res) => {
  const { userId, sleepId } = req.params;

  try {
    const user = await User.findById(userId).populate("patientInfo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patient = await Patient.findById(user.patientInfo._id);
    if (!patient) {
      return res.status(404).json({ message: "Patient information not found" });
    }

    const sleepEntry = patient.sleep.id(sleepId);
    if (!sleepEntry) {
      return res.status(404).json({ message: "Sleep entry not found" });
    }

    sleepEntry.remove();
    await patient.save();

    res.json({ message: "Sleep entry deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new mood entry for the userID sent
router.post("/patient/:userId/mood", auth, async (req, res) => {
  const { userId } = req.params;
  const { moodType, intensity, notes } = req.body;

  try {
    const user = await User.findById(userId).populate("patientInfo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patient = await Patient.findById(user.patientInfo._id);
    if (!patient) {
      return res.status(404).json({ message: "Patient information not found" });
    }

    patient.mood.push({ moodType, intensity, notes, createdAt: new Date() });
    await patient.save();

    res.status(201).json(patient.mood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a mood entry for the userID sent
router.put("/patient/:userId/mood/:moodId", auth, async (req, res) => {
  const { userId, moodId } = req.params;
  const { moodType, intensity, notes } = req.body;

  try {
    const user = await User.findById(userId).populate("patientInfo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patient = await Patient.findById(user.patientInfo._id);
    if (!patient) {
      return res.status(404).json({ message: "Patient information not found" });
    }

    const moodEntry = patient.mood.id(moodId);
    if (!moodEntry) {
      return res.status(404).json({ message: "Mood entry not found" });
    }

    moodEntry.moodType = moodType || moodEntry.moodType;
    moodEntry.intensity = intensity || moodEntry.intensity;
    moodEntry.notes = notes || moodEntry.notes;

    await patient.save();

    res.json(patient.mood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a mood entry for the userID sent
router.delete("/patient/:userId/mood/:moodId", auth, async (req, res) => {
  const { userId, moodId } = req.params;

  try {
    const user = await User.findById(userId).populate("patientInfo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patient = await Patient.findById(user.patientInfo._id);
    if (!patient) {
      return res.status(404).json({ message: "Patient information not found" });
    }

    const moodEntry = patient.mood.id(moodId);
    if (!moodEntry) {
      return res.status(404).json({ message: "Mood entry not found" });
    }

    moodEntry.remove();
    await patient.save();

    res.json({ message: "Mood entry deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new activity entry for the userID sent
router.post("/patient/:userId/activity", auth, async (req, res) => {
  const { userId } = req.params;
  const { activityType, duration, notes } = req.body;

  try {
    const user = await User.findById(userId).populate("patientInfo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patient = await Patient.findById(user.patientInfo._id);
    if (!patient) {
      return res.status(404).json({ message: "Patient information not found" });
    }

    patient.activity.push({
      activityType,
      duration,
      notes,
      createdAt: new Date(),
    });
    await patient.save();

    res.status(201).json(patient.activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update an activity entry for the userID sent
router.put("/patient/:userId/activity/:activityId", auth, async (req, res) => {
  const { userId, activityId } = req.params;
  const { activityType, duration, notes } = req.body;

  try {
    const user = await User.findById(userId).populate("patientInfo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patient = await Patient.findById(user.patientInfo._id);
    if (!patient) {
      return res.status(404).json({ message: "Patient information not found" });
    }

    const activityEntry = patient.activity.id(activityId);
    if (!activityEntry) {
      return res.status(404).json({ message: "Activity entry not found" });
    }

    activityEntry.activityType = activityType || activityEntry.activityType;
    activityEntry.duration = duration || activityEntry.duration;
    activityEntry.notes = notes || activityEntry.notes;

    await patient.save();

    res.json(patient.activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete an activity entry for the userID sent
router.delete(
  "/patient/:userId/activity/:activityId",
  auth,
  async (req, res) => {
    const { userId, activityId } = req.params;

    try {
      const user = await User.findById(userId).populate("patientInfo");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const patient = await Patient.findById(user.patientInfo._id);
      if (!patient) {
        return res
          .status(404)
          .json({ message: "Patient information not found" });
      }

      const activityEntry = patient.activity.id(activityId);
      if (!activityEntry) {
        return res.status(404).json({ message: "Activity entry not found" });
      }

      activityEntry.remove();
      await patient.save();

      res.json({ message: "Activity entry deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
