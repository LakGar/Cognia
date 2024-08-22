import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { globalStyles } from "../../styles/globalStyles";
import { useTheme } from "../../theme/ThemeContext";

const buttons = [
  { type: "Sleep", description: "Track your sleep", icon: "bed-outline" },
  {
    type: "Activities",
    description: "Log your activity",
    icon: "fitness-outline",
  },
  {
    type: "Friends",
    description: "Connect with friends",
    icon: "people-outline",
  },
  {
    type: "Community",
    description: "Join a community",
    icon: "chatbubbles-outline",
  },
  { type: "Mood", description: "Sync your mood", icon: "sync-outline" },
  { type: "Read", description: "Read articles", icon: "book-outline" },
];

const SupplementaryButtons = () => {
  const { theme } = useTheme();
  return (
    <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
      <Text
        style={{
          color: theme.text,
          fontWeight: "600",
          fontSize: 16,
          marginBottom: 10,
        }}
      >
        Quick Links
      </Text>
      <View style={styles.container}>
        {buttons.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              globalStyles.shadow,
              {
                backgroundColor: theme.cardAccent,

                height: 160,
                borderRadius: 3,
                padding: 15,
                justifyContent: "center",
                alignItems: "center",
                width: "48.5%",
                // marginBottom: index % 2 === 0 ? 10 : 0, // Add margin bottom to the second column only
              },
            ]}
          >
            <View style={[styles.icon, { backgroundColor: theme.accent }]}>
              <Icon name={item.icon} size={30} color={"white"} />
            </View>

            <Text style={[globalStyles.subTitle, { color: theme.text }]}>
              {item.type}
            </Text>
            <Text style={[styles.description, { color: "grey" }]}>
              {item.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SupplementaryButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    alignItems: "center",
    padding: 15,
    maxWidth: "44%", // Ensure two columns
    borderRadius: 20,
    justifyContent: "space-between",
    width: "49%",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  type: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    color: "white",
  },
  description: {
    fontSize: 15,
    color: "lightgrey",
    textAlign: "center",
    fontWeight: "600",
  },
});
