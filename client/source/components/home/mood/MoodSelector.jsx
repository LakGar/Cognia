import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { globalStyles } from "../../../styles/globalStyles";
import Happy from "../../../../assets/happy.jpg";
import Disgust from "../../../../assets/disgust.jpg";
import Anger from "../../../../assets/angry.jpg";
import Sad from "../../../../assets/sad.jpg";
import Anxiety from "../../../../assets/anxiety.jpg";
import scared from "../../../../assets/scared.png";

import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { useTheme } from "../../../theme/ThemeContext";

const MoodSelector = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [backgroundColor, setBackgroundColor] = useState(theme.backgroundColor);

  const handleNodePress = (index) => {
    setSelectedIndex(index);
  };

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
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>

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
            placeholderTextColor={"white"}
          />
          <View style={styles.nodesContainer}>{renderNodes()}</View>
          <TouchableOpacity
            style={[styles.setMoodButton]}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={styles.setMoodButtonText}>Set Mood</Text>
          </TouchableOpacity>
        </View>
      </View>
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
});
