import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { globalStyles } from "../styles/globalStyles";
import { useTheme } from "../theme/ThemeContext";

const RenderButtons = ({ item, selectedItem, setSelectedItem }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[
        globalStyles.button,
        {
          maxHeight: 40,
          backgroundColor:
            selectedItem === item ? theme.primary : theme.secondary,
        },
      ]}
      onPress={() => {
        setSelectedItem(item);
        console.log(`Selected item: ${item}`);
      }}
    >
      <Text
        style={[
          {
            fontSize: 14,
            fontWeight: "500",
            paddingVertical: 10,
            textAlign: "center",
            color: selectedItem ? "white" : theme.text,
          },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderButtons;
