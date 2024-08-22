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
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { globalStyles } from "../../styles/globalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ApptCard = ({ appointment }) => {
  const [expanded, setExpanded] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current; // Initial position off-screen

  const status = appointment.status;

  // Define the color based on the status
  const backgroundColor =
    status === "completed"
      ? "#D3E3FC"
      : status === "missed"
      ? "#F8D7DA"
      : status === "upcoming"
      ? "#D1ECF1"
      : "#F7C6E0";

  const titleColor =
    status === "completed"
      ? "#5a94ef"
      : status === "missed"
      ? "#721C24"
      : status === "upcoming"
      ? "#0C5460"
      : "#A569BD";

  const statusColor =
    status === "completed"
      ? "#5a94ef"
      : status === "missed"
      ? "#721C24"
      : status === "upcoming"
      ? "#0C5460"
      : "#A569BD";

  // Format the date and time
  const formattedDate = new Date(appointment.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formattedTime = appointment.time;

  const toggleExpand = () => {
    if (expanded) {
      // Slide out animation
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setExpanded(false));
    } else {
      setExpanded(true);
      // Slide in animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[globalStyles.cardContainer, { backgroundColor }]}
        onPress={toggleExpand}
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
            style={[
              globalStyles.titleText,
              { color: titleColor, marginTop: 10 },
            ]}
          >
            {appointment.title}
          </Text>
          <Text
            style={[
              globalStyles.subTitleText,
              { color: titleColor, opacity: 0.7 },
            ]}
          >
            {appointment.description}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="time-outline" size={12} color="#888" />
            <Text style={globalStyles.details}>
              {formattedTime} | {appointment.duration}
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

      {expanded && (
        <Modal
          transparent={true}
          animationType="slide-down" // Disable default animation since we're using our own
          visible={expanded}
          onRequestClose={toggleExpand}
        >
          <TouchableOpacity style={styles.overlay} onPress={toggleExpand}>
            <Animated.View
              style={[
                {
                  width: width,
                  height: height * 0.7, // The height of the expanded modal
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  padding: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleExpand}
              >
                <Ionicons name={"chevron-down"} color={"black"} size={24} />
              </TouchableOpacity>
              <Text style={styles.expandedTitle}>{appointment.title}</Text>
              <Text>Appointment Description: {appointment.description}</Text>
              <Text style={styles.detailText}>
                Duration: {appointment.duration}
              </Text>
              <Text style={styles.detailText}>
                Status: {appointment.status}
              </Text>
              {/* Add any additional details you want to show when expanded */}
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
};

export default ApptCard;

const styles = StyleSheet.create({
  expandedContent: {},
});
