import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  UIManager,
  Platform,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../styles/globalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import FullCalenderCard from "./FullCalenderCard";

const { width, height } = Dimensions.get("window");

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskCard = ({ task }) => {
  const navigation = useNavigation();
  const status = task.status;
  const [modalOpen, setModalOpen] = useState();

  // Define the color based on the status
  const backgroundColor =
    status === "completed"
      ? "#D3E3FC"
      : status === "overdue"
      ? "#FDE2E4"
      : status === "in-progress"
      ? "#FFE5B4"
      : "#F7C6E0";

  const titleColor =
    status === "completed"
      ? "#1B4F72"
      : status === "overdue"
      ? "#C0392B"
      : status === "in-progress"
      ? "#E67E22"
      : "#A569BD";

  const statusColor =
    status === "completed"
      ? "#1B4F72"
      : status === "overdue"
      ? "#C0392B"
      : status === "in-progress"
      ? "#E67E22"
      : "#A569BD";

  const assignedTo = task.assignedTo;
  const assignedBy = task.assignedBy || "";

  // Format the date and time
  const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formattedTime = new Date(task.dueTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  // Convert durations to hours if greater than 60 minutes
  const formattedDuration =
    task.durations > 60
      ? `${(task.durations / 60).toFixed(1)} hours`
      : `${task.durations} mins`;

  return (
    <TouchableOpacity
      style={[globalStyles.cardContainer, { backgroundColor }]}
      onPress={() => setModalOpen(true)}
    >
      <View style={globalStyles.cardHeaderContainer}>
        <View style={globalStyles.whiteButton}>
          <Text style={[globalStyles.statusText, { color: statusColor }]}>
            {status}
          </Text>
        </View>

        <Text style={globalStyles.detailsText}>Details</Text>
      </View>
      <Text style={globalStyles.dateText}>{formattedDate}</Text>
      <View style={globalStyles.contentContainer}>
        <Text
          style={[globalStyles.titleText, { color: titleColor, marginTop: 10 }]}
        >
          {task.taskName}
        </Text>
        <Text
          style={[
            globalStyles.subTitleText,
            { color: titleColor, opacity: 0.7 },
          ]}
        >
          {task.description}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="time-outline" size={12} color="#888" />
          <Text style={[globalStyles.details, { color: "grey" }]}>
            {formattedTime} | {formattedDuration}
          </Text>
        </View>
        <View style={globalStyles.avatarContainer}>
          <Image
            source={{
              uri: assignedTo.profilePicture,
            }}
            style={globalStyles.personImage}
          />
          {!assignedBy === "" && (
            <Image
              source={{
                uri: assignedBy.profilePicture,
              }}
              style={globalStyles.personImage}
            />
          )}
        </View>
      </View>
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

export default TaskCard;
