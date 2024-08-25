import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeContext";
import Upcoming from "./Upcoming";
import { globalStyles } from "../../styles/globalStyles";

// Get device width
const { width } = Dimensions.get("window");
const today = new Date();
// Format date to Tuesday, Jan 9, 2024
const formattedDate = today.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const HomeHeader = ({ firstName, profilePicture, tasks }) => {
  const navigation = useNavigation();
  const { theme, isDarkMode } = useTheme();

  return (
    <View
      style={[
        globalStyles.shadow,
        {
          width: width, // Use the full width of the screen
          paddingHorizontal: 20,
          paddingTop: 70,
          paddingBottom: 20,
          borderRadius: 24,
          backgroundColor: theme.cardAccent, // Apply theme color to background
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            height: 70,
            width: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: profilePicture }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              borderWidth: 3,
              borderColor: "white",
              objectFit: "cover",
            }}
          />
        </TouchableOpacity>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text
            style={{
              fontWeight: "800",
              fontSize: 30,
              color: theme.text, // Apply theme color to "Hello Lola!"
            }}
          >
            Hello {firstName}! 👋
          </Text>
          <Text
            style={{
              color: theme.subText, // Apply theme color to date
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {formattedDate}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            borderRadius: 12,
            backgroundColor: theme.cardBG, // Apply theme color to icon background
            height: 60,
            width: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="notifications"
            size={30}
            color={theme.subText} // Apply theme color to icon
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={[
          {
            height: 40,
            width: "100%",
            paddingHorizontal: 10,
            borderRadius: 12,
            backgroundColor: theme.cardBG,
            marginBottom: 10,
            color: theme.textColor, // Apply theme color to text input
          },
        ]}
        placeholder="Search..."
        placeholderTextColor={theme.subText} // Apply theme color to placeholder text
      />
      <Upcoming tasks={tasks} />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
