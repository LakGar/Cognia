import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../styles/globalStyles";
import { FontAwesome5 } from "@expo/vector-icons"; // Assuming you are using FontAwesome icons
import { useNavigation } from "@react-navigation/native"; // Import the hook
import { useTheme } from "../../theme/ThemeContext";

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

const renderDots = (opacity, color, height, width) => {
  return (
    <View
      style={{
        width: width,
        height: height,
        borderRadius: 12,
        backgroundColor: color,
        opacity: opacity,
        marginRight: 5,
      }}
    ></View>
  );
};
const renderBlocks = (opacity, color, height, width) => {
  return (
    <View
      style={{
        width: width,
        height: height,
        borderRadius: 6,
        backgroundColor: color,
        opacity: opacity,
        marginRight: 5,
      }}
    ></View>
  );
};

const SectionSleepMood = () => {
  const [currentMood, setCurrentMood] = useState("anger"); // Default mood
  const navigation = useNavigation();
  const { theme } = useTheme();

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
        {/* Mood Card */}
        <TouchableOpacity
          style={[
            globalStyles.shadow,
            {
              backgroundColor: moodColors[currentMood],
              flex: 1,
              height: 190,
              borderRadius: 20,
              padding: 15,
              justifyContent: "space-between",
            },
          ]}
          onPress={() => navigation.navigate("AddMood")}
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
        {/* First Sleep Card */}
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
        >
          <View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <FontAwesome5 name={"heart"} size={15} color="white" />
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
              7h 30m
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
    </View>
  );
};

export default SectionSleepMood;

const styles = StyleSheet.create({});
