import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import patientService from "../services/patientServices"; // Assuming you have a patientService file

const PatientInfoTest = () => {
  const [userId, setUserId] = useState("66cd26c182197c1a24555bbd");
  const [patientInfo, setPatientInfo] = useState(null);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(""); // Add a state for the token

  // State for patient fields
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");
  const [surgeries, setSurgeries] = useState("");

  const [sleepStartTime, setSleepStartTime] = useState("");
  const [sleepEndTime, setSleepEndTime] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");

  const [moodType, setMoodType] = useState("");
  const [moodIntensity, setMoodIntensity] = useState("");

  const [activityType, setActivityType] = useState("");
  const [activityDuration, setActivityDuration] = useState("");

  const handleCreatePatient = async () => {
    try {
      const response = await patientService.createPatient(
        {
          userId,
          medicalInformation: {
            height: { feet: Number(heightFeet), inches: Number(heightInches) },
            weight: Number(weight),
            bloodType,
            allergies: allergies.split(","),
            medications: medications.split(","),
            surgeries: surgeries.split(","),
          },
          emergencyContacts: [
            { name: "John Doe", relationship: "Father", phone: "1234567890" },
          ],
        },
        token
      );
      setPatientInfo(response);
      setMessage("Patient created successfully");
    } catch (error) {
      console.log(error);
      setMessage("Error creating patient");
    }
  };

  const handleGetPatient = async () => {
    try {
      const response = await patientService.getPatientById(userId, token);
      setPatientInfo(response);
      setMessage("Patient fetched successfully");
    } catch (error) {
      setMessage("Error fetching patient");
    }
  };

  const handleUpdatePatient = async () => {
    try {
      const response = await patientService.updatePatient(
        userId,
        {
          medicalInformation: {
            height: { feet: Number(heightFeet), inches: Number(heightInches) },
            weight: Number(weight),
            bloodType,
            allergies: allergies.split(","),
            medications: medications.split(","),
            surgeries: surgeries.split(","),
          },
        },
        token
      );
      setPatientInfo(response);
      setMessage("Patient updated successfully");
    } catch (error) {
      setMessage("Error updating patient");
    }
  };

  const handleDeletePatient = async () => {
    try {
      await patientService.deletePatient(userId, token);
      setPatientInfo(null);
      setMessage("Patient deleted successfully");
    } catch (error) {
      setMessage("Error deleting patient");
    }
  };

  const handleAddSleep = async () => {
    try {
      const response = await patientService.addSleepEntry(
        userId,
        {
          startTime: new Date(sleepStartTime),
          endTime: new Date(sleepEndTime),
          quality: Number(sleepQuality),
        },
        token
      );
      setPatientInfo(response);
      setMessage("Sleep entry added successfully");
    } catch (error) {
      setMessage("Error adding sleep entry");
    }
  };

  const handleAddMood = async () => {
    try {
      const response = await patientService.addMoodEntry(
        userId,
        {
          moodType,
          intensity: Number(moodIntensity),
        },
        token
      );
      setPatientInfo(response);
      setMessage("Mood entry added successfully");
    } catch (error) {
      setMessage("Error adding mood entry");
    }
  };

  const handleAddActivity = async () => {
    try {
      const response = await patientService.addActivityEntry(
        userId,
        {
          activityType,
          duration: Number(activityDuration),
        },
        token
      );
      setPatientInfo(response);
      setMessage("Activity entry added successfully");
    } catch (error) {
      setMessage("Error adding activity entry");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", flex: 1 }}>
        <Text style={styles.title}>Patient Info Test</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter User ID"
          value={userId}
          onChangeText={(text) => setUserId(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Token"
          value={token}
          onChangeText={(text) => setToken(text)}
        />

        <View style={styles.section}>
          <Text style={styles.subtitle}>Medical Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Height (Feet)"
            value={heightFeet}
            onChangeText={(text) => setHeightFeet(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Height (Inches)"
            value={heightInches}
            onChangeText={(text) => setHeightInches(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Weight"
            value={weight}
            onChangeText={(text) => setWeight(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Blood Type"
            value={bloodType}
            onChangeText={(text) => setBloodType(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Allergies (comma separated)"
            value={allergies}
            onChangeText={(text) => setAllergies(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Medications (comma separated)"
            value={medications}
            onChangeText={(text) => setMedications(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Surgeries (comma separated)"
            value={surgeries}
            onChangeText={(text) => setSurgeries(text)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Sleep Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Start Time"
            value={sleepStartTime}
            onChangeText={(text) => setSleepStartTime(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="End Time"
            value={sleepEndTime}
            onChangeText={(text) => setSleepEndTime(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Quality (1-5)"
            value={sleepQuality}
            onChangeText={(text) => setSleepQuality(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddSleep}>
            <Text style={styles.buttonText}>Add Sleep Entry</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Mood Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Mood Type"
            value={moodType}
            onChangeText={(text) => setMoodType(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Intensity (1-10)"
            value={moodIntensity}
            onChangeText={(text) => setMoodIntensity(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddMood}>
            <Text style={styles.buttonText}>Add Mood Entry</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Activity Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Activity Type"
            value={activityType}
            onChangeText={(text) => setActivityType(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Duration (minutes)"
            value={activityDuration}
            onChangeText={(text) => setActivityDuration(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddActivity}>
            <Text style={styles.buttonText}>Add Activity Entry</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.button} onPress={handleCreatePatient}>
            <Text style={styles.buttonText}>Create Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleGetPatient}>
            <Text style={styles.buttonText}>Get Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleUpdatePatient}>
            <Text style={styles.buttonText}>Update Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDeletePatient}>
            <Text style={styles.buttonText}>Delete Patient</Text>
          </TouchableOpacity>
        </View>

        {message && <Text style={styles.message}>{message}</Text>}
        {patientInfo && (
          <View style={styles.infoContainer}>
            <Text style={styles.subtitle}>Patient Information:</Text>
            <Text style={styles.infoText}>
              {JSON.stringify(patientInfo, null, 2)}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  message: {
    fontSize: 16,
    color: "green",
    marginTop: 20,
  },
  infoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  infoText: {
    fontSize: 14,
    fontFamily: "monospace",
  },
});

export default PatientInfoTest;
