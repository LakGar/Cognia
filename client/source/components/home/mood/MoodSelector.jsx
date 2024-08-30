import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { globalStyles } from "../../../styles/globalStyles";
import Happy from "../../../../assets/happy.jpg";
import Disgust from "../../../../assets/disgust.jpg";
import Anger from "../../../../assets/angry.jpg";
import Sad from "../../../../assets/sad.jpg";
import Anxiety from "../../../../assets/anxiety.jpg";
import scared from "../../../../assets/scared.png";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { useTheme } from "../../../theme/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { updatePatient } from "../../../redux/patientSlice";

const MoodSelector = ({ route }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const { patientInfo } = route.params;

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [backgroundColor, setBackgroundColor] = useState(theme.backgroundColor);
  const [notes, setNotes] = useState("");
  const [currentMood, setCurrentMood] = useState(null);

  useEffect(() => {
    // Find the latest mood for today
    const today = new Date().toDateString();
    const moodsForToday = patientInfo?.mood.filter((mood) => {
      const moodDate = new Date(mood.createdAt).toDateString();
      return moodDate === today;
    });

    if (moodsForToday && moodsForToday.length > 0) {
      // Get the latest mood
      const latestMood = moodsForToday.reduce((latest, current) => {
        return new Date(latest.createdAt) > new Date(current.createdAt)
          ? latest
          : current;
      });

      setCurrentMood(latestMood);
      setSelectedIndex(getMoodIndex(latestMood.moodType));
      setNotes(latestMood.notes);
    }
  }, [patientInfo]);

  useEffect(() => {
    const color =
      selectedIndex === 0
        ? "#f41b04"
        : selectedIndex === 1
        ? "#75c145"
        : selectedIndex === 2
        ? "#f44abf"
        : selectedIndex === 3
        ? "#de6f15"
        : selectedIndex === 4
        ? "#f2c126"
        : "#fff";

    setBackgroundColor(color);
  }, [selectedIndex]);

  const getMoodIndex = (moodType) => {
    switch (moodType.toLowerCase()) {
      case "angry":
        return 0;
      case "disgusted":
        return 1;
      case "sad":
        return 2;
      case "anxious":
        return 3;
      case "happy":
        return 4;
      default:
        return -1;
    }
  };

  const getMoodType = () => {
    switch (selectedIndex) {
      case 0:
        return "angry";
      case 1:
        return "disgusted";
      case 2:
        return "sad";
      case 3:
        return "anxious";
      case 4:
        return "happy";
      default:
        return "";
    }
  };

  const handleNodePress = (index) => {
    setSelectedIndex(index);
    setCurrentMood(null); // Reset the current mood when selecting a new one
  };

  const handleSaveMood = () => {
    const moodType = getMoodType();

    if (!moodType) {
      alert("Please select a mood.");
      return;
    }

    const newMood = {
      moodType,
      notes,
      createdAt: new Date(),
    };

    const updatedPatientInfo = {
      ...patientInfo,
      mood: [...(patientInfo.mood || []), newMood],
    };

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
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error updating mood:", error);
      });
  };

  const handleAddNewMood = () => {
    setCurrentMood(null);
    setSelectedIndex(-1);
    setNotes("");
  };

  const renderNodes = () => {
    const nodes = [];

    for (let i = 0; i < 5; i++) {
      nodes.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.node,
            { backgroundColor: i <= selectedIndex ? "#FFCC00" : "#937500" },
          ]}
          onPress={() => handleNodePress(i)}
        >
          <View
            style={{
              backgroundColor: i <= selectedIndex ? "#fff" : "#c9a000",
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
          ></View>
        </TouchableOpacity>
      );

      if (i < 4) {
        nodes.push(
          <View
            key={`line-${i}`}
            style={[
              styles.line,
              { backgroundColor: i < selectedIndex ? "#FFCC00" : "#937500" },
            ]}
          />
        );
      }
    }

    return nodes;
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      {currentMood && (
        <View style={styles.currentMoodContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-back" size={26} color={"white"} />
            </TouchableOpacity>
            <Text
              style={[
                globalStyles.name,
                { flex: 1, textAlign: "left", color: "white" },
              ]}
            >
              Current mood
            </Text>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
              onPress={handleAddNewMood} // Changed to handleAddNewMood
            >
              <Icon name="add" size={34} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.moodText}>
            {currentMood.moodType.toUpperCase()}
          </Text>
          <Image
            source={
              selectedIndex === 0
                ? Anger
                : selectedIndex === 1
                ? Disgust
                : selectedIndex === 2
                ? Sad
                : selectedIndex === 3
                ? Anxiety
                : selectedIndex === 4
                ? Happy
                : null
            }
            style={{
              width: "50%",
              height: 300,
              marginBottom: 30,
            }}
          />
          <TextInput
            style={[styles.input]}
            placeholder="I had a bad day today because...."
            multiline={true}
            value={notes}
            onChangeText={setNotes}
            placeholderTextColor={"white"}
          />
        </View>
      )}
      {!currentMood && (
        <>
          <Image
            source={
              selectedIndex === 0
                ? Anger
                : selectedIndex === 1
                ? Disgust
                : selectedIndex === 2
                ? Sad
                : selectedIndex === 3
                ? Anxiety
                : selectedIndex === 4
                ? Happy
                : null
            }
            style={styles.backgroundImage}
          />
          <View style={styles.overlay} />
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-back" size={26} color={"white"} />
              </TouchableOpacity>
              <Text
                style={[
                  globalStyles.name,
                  { flex: 1, textAlign: "left", color: "white" },
                ]}
              >
                Close
              </Text>
            </View>

            <View>
              <Text style={styles.headerText}>How are you feeling today?</Text>
            </View>

            <View style={[styles.content2, { width: "100%" }]}>
              <Text style={styles.moodText}>
                I'm Feeling
                {selectedIndex === 0
                  ? " Angry"
                  : selectedIndex === 1
                  ? " Disgusted"
                  : selectedIndex === 2
                  ? " Sad"
                  : selectedIndex === 3
                  ? " Anxious"
                  : selectedIndex === 4
                  ? " Happy"
                  : " _______"}
              </Text>
              <TextInput
                style={[styles.input]}
                placeholder="I had a bad day today because...."
                multiline={true}
                value={notes}
                onChangeText={setNotes}
                placeholderTextColor={"white"}
              />
              <View style={styles.nodesContainer}>{renderNodes()}</View>
              <TouchableOpacity
                style={[styles.setMoodButton]}
                onPress={handleSaveMood}
              >
                <Text style={styles.setMoodButtonText}>Set Mood</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default MoodSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    paddingVertical: 60,
  },
  currentMoodContainer: {
    padding: 20,
    alignItems: "center",
  },
  trashButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "50%",
    objectFit: "contain",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content2: {
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    left: 20,
    padding: 10,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    marginVertical: 50,
  },
  moodText: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontWeight: "700",
    fontSize: 30,
    marginBottom: 40,
  },
  nodesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 8,
  },
  node: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: 30,
    height: 5,
    marginVertical: 3,
  },
  setMoodButton: {
    backgroundColor: "white",
    width: "100%",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  setMoodButtonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: "100%",
    padding: 15,
    borderRadius: 24,
    height: 200,
    color: "white",
    fontSize: 20,
  },
  currentMoodContainer: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
});
