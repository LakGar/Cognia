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

const profileImage =
  "https://images.unsplash.com/photo-1722898614951-a158891a7495?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Get device width
const { width } = Dimensions.get("window");
const today = new Date();
// Format date to Tuesday, Jan 9, 2024
const formattedDate = today.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const HomeHeader = () => {
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
            source={{ uri: profileImage }}
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
            Hello Lola! 👋
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
      <Upcoming />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
