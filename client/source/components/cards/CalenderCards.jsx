import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  UIManager,
  Platform,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../styles/globalStyles";
import moment from "moment";
import FullCalenderCard from "./FullCalenderCard";

const { width } = Dimensions.get("window");

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CalenderCard = ({ time, duration, title, status, task }) => {
  const startTime = moment(time, "hh:mm A");
  const top = (startTime.hours() * 60 + startTime.minutes()) * (50 / 60); // Adjusting for 50px per hour
  const height = duration * 0.8333333;
  const isSmall = duration < 40 && duration > 30;
  const tooSmall = duration <= 30;
  const [modalOpen, setModalOpen] = useState(false);

  const type = task.type;
  const backgroundColor =
    type === "appointment"
      ? "#D3E3FC"
      : type === "schedule"
      ? "#FDE2E4"
      : type === "personal"
      ? "#FFE5B4"
      : type === "medication"
      ? "#F7C6E0"
      : null;

  const titleColor =
    type === "appointment"
      ? "#1B4F72"
      : type === "schedule"
      ? "#C0392B"
      : type === "personal"
      ? "#E67E22"
      : type == "medication"
      ? "#A569BD"
      : null;

  return (
    <TouchableOpacity
      onPress={() => setModalOpen(true)}
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
      {modalOpen && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalOpen}
          onRequestClose={() => setModalOpen(false)}
        >
          <FullCalenderCard task={task} setModal={setModalOpen} />
        </Modal>
      )}
    </TouchableOpacity>
  );
};

export default CalenderCard;
