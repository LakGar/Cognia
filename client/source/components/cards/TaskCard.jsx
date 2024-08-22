import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  UIManager,
  Platform,
  Dimensions,
} from "react-native";
import React from "react";
import { globalStyles } from "../../styles/globalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskCard = ({ task }) => {
  const navigation = useNavigation();
  const status = task.status;

  // Define the color based on the status
  const backgroundColor =
    status === "Completed"
      ? "#D3E3FC"
      : status === "missed"
      ? "#FDE2E4"
      : status === "in progress"
      ? "#FFE5B4"
      : "#F7C6E0";

  const titleColor =
    status === "Completed"
      ? "#1B4F72"
      : status === "missed"
      ? "#C0392B"
      : status === "in progress"
      ? "#E67E22"
      : "#A569BD";

  const statusColor =
    status === "Completed"
      ? "#1B4F72"
      : status === "missed"
      ? "#C0392B"
      : status === "in progress"
      ? "#E67E22"
      : "#A569BD";

  // Format the date and time
  const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formattedTime = task.dueTime;

  return (
    <TouchableOpacity
      style={[globalStyles.cardContainer, { backgroundColor }]}
      onPress={() =>
        navigation.navigate("TaskDetail", {
          task,
          backgroundColor,
          titleColor,
          statusColor,
          formattedDate,
        })
      }
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
          {task.title}
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
            {formattedTime} | {task.duration}
          </Text>
        </View>
        <View style={globalStyles.avatarContainer}>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/1.jpg", // Random person image URL
            }}
            style={globalStyles.personImage}
          />
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/women/2.jpg", // Random person image URL
            }}
            style={globalStyles.personImage}
          />
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/3.jpg", // Random person image URL
            }}
            style={globalStyles.personImage}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;
