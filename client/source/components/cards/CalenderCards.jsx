import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  UIManager,
  Platform,
  Dimensions,
} from "react-native";
import React from "react";
import { globalStyles } from "../../styles/globalStyles";
import moment from "moment";

const { width } = Dimensions.get("window");

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CalenderCard = ({ time, duration, title, status }) => {
  const startTime = moment(time, "hh:mm A");
  const top = (startTime.hours() * 60 + startTime.minutes()) * (50 / 60); // Adjusting for 50px per hour
  const height = duration * 0.8333333;
  const isSmall = duration < 40 && duration > 30;
  const tooSmall = duration <= 30;

  const backgroundColor =
    status === "Task"
      ? "rgba(211, 227, 252, 0.6)"
      : status === "Appointment"
      ? "rgba(253, 226, 228, 0.6)"
      : status === "Schedule"
      ? "rgba(255, 229, 180, 0.6)"
      : "rgba(247, 198, 224, 0.6)";

  const titleColor =
    status === "Task"
      ? "#1B4F72"
      : status === "Appointment"
      ? "#C0392B"
      : status === "Schedule"
      ? "#E67E22"
      : "#A569BD";

  return (
    <TouchableOpacity
      style={[
        globalStyles.cardContainer,
        {
          position: "absolute",
          top,
          height,
          width: "180%",
          backgroundColor: backgroundColor, // Set to your desired color
          borderRadius: 8,
          padding: isSmall ? 6 : tooSmall ? 3 : 10,
          marginLeft: 44,
          borderLeftColor: titleColor,
          borderLeftWidth: 6,
          marginTop: 25,
        },
      ]}
    >
      <Text
        style={{
          color: titleColor,
          fontWeight: "600",
          fontSize: isSmall ? 10 : tooSmall ? 11 : 14,
        }}
      >
        {title}
      </Text>
      {/* <Text style={{ color: "black" }}>{time}</Text> */}
    </TouchableOpacity>
  );
};

export default CalenderCard;
