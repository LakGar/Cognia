import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome5, Fontisto } from "react-native-vector-icons";

import { useTheme } from "../../theme/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updatePatient } from "../../redux/patientSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";

const SectionSleepMood = ({ patientInfo = {} }) => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);

  const [modalVisible, setModalVisible] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [quality, setQuality] = useState(3);
  const [notes, setNotes] = useState("");
  const [currentSleep, setCurrentSleep] = useState(null);
  const [currentMood, setCurrentMood] = useState(
    patientInfo.mood.moodType || "Set mood"
  );

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  useEffect(() => {
    checkExistingSleepDataForToday();
  }, [patientInfo]);

  const checkExistingSleepDataForToday = () => {
    const today = new Date().toDateString();
    const sleepForToday = patientInfo?.sleep?.find((sleep) => {
      const sleepDate = new Date(sleep.createdAt).toDateString();
      return sleepDate === today;
    });
    console.log(sleepForToday);

    if (sleepForToday) {
      setCurrentSleep(sleepForToday);
      setStartTime(new Date(sleepForToday.startTime));
      setEndTime(new Date(sleepForToday.endTime));
      setQuality(sleepForToday.quality);
      setNotes(sleepForToday.notes);
    }
  };
  const updateMood = (newMood) => {
    // Create a deep copy of patientInfo to avoid mutation errors
    const updatedPatientInfo = _.cloneDeep(patientInfo);

    // Add the new mood to the mood array
    updatedPatientInfo.mood = updatedPatientInfo.mood || [];
    updatedPatientInfo.mood.push(newMood);

    // Dispatch the updatePatient action with the updated data
    dispatch(
      updatePatient({
        token: userToken,
        userId: userInfo._id,
        patientData: updatedPatientInfo,
      })
    )
      .unwrap()
      .then(() => {
        console.log("Mood updated successfully");
      })
      .catch((error) => {
        console.error("Error updating mood:", error);
      });
  };
  const handleSave = () => {
    if (endTime <= startTime) {
      alert("End time cannot be before the start time. Please correct it.");
      return;
    }
    const updatedSleep = {
      _id: currentSleep?._id,
      startTime,
      endTime,
      quality,
      notes,
      createdAt: currentSleep?.createdAt || new Date(),
    };

    // Create a deep copy of patientInfo to avoid mutation errors
    const updatedPatientInfo = _.cloneDeep(patientInfo);
    const sleepArray = updatedPatientInfo.sleep || [];

    if (currentSleep) {
      // Update existing sleep data for today
      const sleepIndex = sleepArray.findIndex(
        (sleep) => sleep._id === currentSleep._id
      );
      if (sleepIndex >= 0) {
        sleepArray[sleepIndex] = updatedSleep;
      }
    } else {
      // Add new sleep data
      sleepArray.push(updatedSleep);
    }

    updatedPatientInfo.sleep = sleepArray;

    // Dispatch the updatePatient action with the updated data
    dispatch(
      updatePatient({
        token: userToken,
        userId: userInfo._id,
        patientData: updatedPatientInfo,
      })
    )
      .unwrap()
      .then(() => {
        setCurrentSleep(updatedSleep); // Update the currentSleep state
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Error updating patient:", error);
      });
  };

  const moodIcons = {
    happy: "smile",
    sad: "frown",
    calm: "meh",
    anxious: "exclamation-circle",
    excited: "grin-stars",
    tired: "tired",
    frustrated: "angry",
  };

  const moodColors = {
    happy: "#b4cfa4",
    sad: "#f4d35e",
    // calm: "#a0c5e3",
    anxious: "#ff9c5b",
    anger: "#bba6dd",
    digust: "#cb7876",
  };
  const handleStartTimeConfirm = (selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) setStartTime(selectedTime);
  };

  const handleEndTimeConfirm = (selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) setEndTime(selectedTime);
  };

  const renderDots = (opacity, color, height, width) => (
    <View
      style={{
        width,
        height,
        borderRadius: 12,
        backgroundColor: color,
        opacity,
        marginRight: 5,
      }}
    ></View>
  );

  const renderBlocks = (opacity, color, height, width) => (
    <View
      style={{
        width,
        height,
        borderRadius: 6,
        backgroundColor: color,
        opacity,
        marginRight: 5,
      }}
    ></View>
  );
  const calcSleep = () => {
    const durationMs = endTime - startTime;
    const hours = Math.floor(durationMs / 3600000); // 1 hour = 3600000 ms
    const minutes = Math.floor((durationMs % 3600000) / 60000); // 1 minute = 60000 ms

    return `${hours}h ${minutes}m`;
  };
  return (
    <View>
      <Text
        style={{
          color: theme.text,
          fontWeight: "600",
          fontSize: 16,
          marginBottom: 10,
          paddingHorizontal: 20,
        }}
      >
        Trackers
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={[
            globalStyles.shadow,
            {
              backgroundColor: moodColors[currentMood] || "grey",
              flex: 1,
              height: 190,
              borderRadius: 20,
              padding: 15,
              justifyContent: "space-between",
            },
          ]}
          onPress={() => navigation.navigate("AddMood", { patientInfo })}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <FontAwesome5
                name={moodIcons[currentMood]}
                size={15}
                color="white"
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  marginLeft: 3,
                  fontSize: 14,
                }}
              >
                Mood
              </Text>
            </View>
            <Text
              style={[globalStyles.titleText, { color: "white", fontSize: 18 }]}
            >
              {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            {renderDots(0.6, "white", 10, 5)}
            {renderDots(0.7, "white", 24, 5)}
            {renderDots(0.7, "white", 40, 5)}
            {renderDots(1, "white", 69, 5)}
            {renderDots(1, "white", 62, 5)}
            {renderDots(1, "white", 50, 5)}
            {renderDots(0.8, "white", 33, 5)}
            {renderDots(0.6, "white", 29, 5)}
            {renderDots(0.5, "white", 9, 5)}
            {renderDots(0.4, "white", 5, 5)}
          </View>
        </TouchableOpacity>
        {/* Sleep Card */}
        <TouchableOpacity
          style={[
            globalStyles.shadow,
            {
              backgroundColor: "#9bb169",
              flex: 1,
              height: 190,
              borderRadius: 20,
              padding: 15,
              justifyContent: "space-between",
            },
          ]}
          onPress={() => setModalVisible(true)}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <FontAwesome5 name={"moon"} size={15} color="white" />
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  marginLeft: 3,
                  fontSize: 14,
                }}
              >
                Sleep
              </Text>
            </View>
            <Text
              style={[globalStyles.titleText, { color: "white", fontSize: 18 }]}
            >
              {calcSleep()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {renderBlocks(1, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(1, "white", 17, 17)}
            {renderBlocks(1, "white", 17, 17)}
            {renderBlocks(1, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(1, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(1, "white", 17, 17)}
            {renderBlocks(1, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(1, "white", 17, 17)}
            {renderBlocks(1, "white", 17, 17)}
            {renderBlocks(1, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(1, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(0.3, "white", 17, 17)}
            {renderBlocks(1, "white", 17, 17)}
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal for Adding/Updating Sleep Data */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={[
            styles.modalView,
            {
              backgroundColor: theme.backgroundColor,
            },
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="chevron-down" size={26} color={theme.text} />
            </TouchableOpacity>
            <Text
              style={[
                globalStyles.name,
                { flex: 1, textAlign: "left", color: theme.text },
              ]}
            >
              {currentSleep ? "Update Sleep" : "Add Sleep"}
            </Text>
          </View>
          <ScrollView style={{ width: "100%" }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={[styles.label, { color: theme.subText }]}>
                Start Time
              </Text>
              <TouchableOpacity
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    backgroundColor: theme.cardBG,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                  },
                ]}
                onPress={() => setShowStartTimePicker(true)}
              >
                <Icon
                  name="time-outline"
                  size={24}
                  color={isDarkMode ? "darkgrey" : "lightgrey"}
                />
                <Text style={{ color: theme.text }}>
                  {startTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={showStartTimePicker}
                mode="time"
                date={startTime}
                onConfirm={handleStartTimeConfirm}
                onCancel={() => setShowStartTimePicker(false)}
                textColor={isDarkMode ? "white" : "black"}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={[styles.label, { color: theme.subText }]}>
                End Time
              </Text>
              <TouchableOpacity
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    backgroundColor: theme.cardBG,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                  },
                ]}
                onPress={() => setShowEndTimePicker(true)}
              >
                <Icon
                  name="time-outline"
                  size={24}
                  color={isDarkMode ? "darkgrey" : "lightgrey"}
                />
                <Text style={{ color: theme.text }}>
                  {endTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={showEndTimePicker}
                mode="time"
                date={endTime}
                onConfirm={handleEndTimeConfirm}
                onCancel={() => setShowEndTimePicker(false)}
                textColor={isDarkMode ? "white" : "black"}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={[styles.label, { color: theme.subText }]}>
                Quality (1-5)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { color: theme.text, backgroundColor: theme.cardBG },
                ]}
                value={quality.toString()}
                onChangeText={(text) => setQuality(Number(text))}
                keyboardType="numeric"
                placeholder="Quality"
                placeholderTextColor={theme.subText}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={[styles.label, { color: theme.subText }]}>
                Notes
              </Text>
              <TextInput
                style={[
                  styles.textArea,
                  { color: theme.text, backgroundColor: theme.cardBG },
                ]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add any notes here"
                placeholderTextColor={theme.subText}
                multiline
              />
            </View>

            <TouchableOpacity
              style={[
                globalStyles.button,
                { backgroundColor: theme.primary, alignItems: "center" },
              ]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>
                {currentSleep ? "Update Sleep" : "Save Sleep"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default SectionSleepMood;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    minHeight: 40,
    justifyContent: "center",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    textAlignVertical: "top",
    height: 100,
    fontSize: 18,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
});
