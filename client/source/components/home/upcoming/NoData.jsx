import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { globalStyles } from "../../../styles/globalStyles";
import { useTheme } from "../../../theme/ThemeContext";

const NoData = ({ field, nav }) => {
  console.log(field);
  const { theme, isDarkMode } = useTheme();

  const handleCreate = () => {
    if (field === "All") {
      // Logic to ask the user for the type to create
      console.log("Prompt user to select a type for creation");
    } else {
      // Navigate to the appropriate creation screen
      console.log(`Navigate to create new ${field}`);
      if (nav) {
        // nav.navigate(`Create${field}`);
      }
    }
  };

  const message =
    field === "All"
      ? "No data available. Would you like to create a new item?"
      : `No ${field} available. Would you like to create a new ${field}?`;

  return (
    <View style={styles.container}>
      <Text style={[styles.messageText, { color: theme.text }]}>{message}</Text>
      <TouchableOpacity
        style={[
          globalStyles.button,
          { width: "50%", maxHeight: 40, backgroundColor: theme.primary },
        ]}
        onPress={handleCreate}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: "white",
            textAlign: "center",
            padding: 7,
          }}
        >
          {field === "All" ? "Create New" : `Create ${field}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  messageText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
});
