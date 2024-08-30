import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useTheme } from "../../theme/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";
import { Picker } from "@react-native-picker/picker";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updatePatient } from "../../redux/patientSlice";

const StepsNActivityTracker = ({ patientInfo = {} }) => {
  const { theme, isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);

  const [modalVisible, setModalVisible] = useState(false);
  const [activityType, setActivityType] = useState("Walking");
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState("");
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    calculateTotalTimeForToday();
  }, [patientInfo]);

  const calculateTotalTimeForToday = () => {
    const today = new Date().toDateString();
    const activitiesForToday = patientInfo?.activity?.filter((activity) => {
      const activityDate = new Date(activity.createdAt).toDateString();
      return activityDate === today;
    });

    const totalTimeForToday = activitiesForToday?.reduce(
      (total, activity) => total + activity.duration,
      0
    );

    setTotalTime(totalTimeForToday || 0);
  };

  const handleCardPress = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    const newActivity = {
      activityType,
      duration,
      notes,
      createdAt: new Date(),
    };

    const updatedPatientInfo = _.cloneDeep(patientInfo);
    const existingActivities = updatedPatientInfo.activity || [];
    updatedPatientInfo.activity = [...existingActivities, newActivity];

    dispatch(
      updatePatient({
        token: userToken,
        userId: userInfo._id,
        patientData: updatedPatientInfo,
      })
    )
      .unwrap()
      .then(() => {
        calculateTotalTimeForToday();
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Error updating patient:", error);
      });
  };

  const activityOptions = [
    "Walking",
    "Running",
    "Cycling",
    "Swimming",
    "Dancing",
    "Yoga",
    "Meditation",

    "Hiking Trail",
  ];
  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={[
            {
              backgroundColor: theme.cardAccent,
              flex: 1,
              borderRadius: 20,
              padding: 15,
              justifyContent: "space-between",
            },
          ]}
          onPress={handleCardPress}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              right: 10,
              top: 10,
            }}
          >
            <Text style={{ fontWeight: "600", color: "grey" }}>4:55AM</Text>
            <Icon name="chevron-forward" color="grey" size={20} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              marginBottom: 20,
            }}
          >
            <Icon name="fitness-outline" size={15} color="red" />
            <Text style={[styles.cardText, { color: theme.text }]}>
              Activities
            </Text>
          </View>

          <Text style={[styles.cardValue, { color: theme.text }]}>
            {totalTime}{" "}
            <Text style={{ color: theme.accent, fontSize: 16 }}>mins</Text>
          </Text>
        </TouchableOpacity>
      </View>

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
              Create Activity
            </Text>
          </View>
          <ScrollView style={{ width: "100%" }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={[styles.label, { color: theme.subText }]}>
                Activity Type
              </Text>

              <Picker
                selectedValue={activityType}
                onValueChange={(itemValue) => setActivityType(itemValue)}
                style={{ color: theme.text }}
                mode="dropdown"
                textStyle={{ color: theme.text }}
              >
                {activityOptions.map((option) => (
                  <Picker.Item
                    key={option}
                    label={option}
                    value={option}
                    color={isDarkMode ? "white" : "black"}
                  />
                ))}
              </Picker>
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={[styles.label, { color: theme.subText }]}>
                Duration (mins)
              </Text>
              <View
                style={[
                  styles.input,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: theme.cardBG,
                    paddingVertical: 10,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => setDuration(Math.max(0, duration - 5))}
                >
                  <Icon name="remove-circle-outline" size={30} color={"red"} />
                </TouchableOpacity>
                <Text style={{ color: theme.text, fontSize: 24 }}>
                  {duration}
                </Text>
                <TouchableOpacity onPress={() => setDuration(duration + 5)}>
                  <Icon
                    name="add-circle-outline"
                    size={30}
                    color={theme.accent}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={[styles.label, { color: theme.subText }]}>
                Notes
              </Text>
              <TextInput
                style={[
                  styles.textArea,
                  { backgroundColor: theme.cardBG, color: theme.text },
                ]}
                placeholder="Add any notes here"
                placeholderTextColor={theme.subText}
                multiline
                numberOfLines={4}
                value={notes}
                onChangeText={setNotes}
              />
            </View>

            <TouchableOpacity
              style={[
                globalStyles.button,
                { backgroundColor: theme.primary, alignItems: "center" },
              ]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save Activity</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default StepsNActivityTracker;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  cardsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    gap: 10,
  },
  cardText: {
    fontWeight: "700",
    color: "lightgrey",
  },
  cardValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
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
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    marginBottom: 16,
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
