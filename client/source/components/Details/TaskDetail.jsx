import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { globalStyles } from "../../styles/globalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../../theme/ThemeContext";

const TaskDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();

  // Destructure the data passed through navigation
  const { task, backgroundColor, titleColor, statusColor } = route.params;

  // Use state to manage the editable title, description, date, time, and duration
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(new Date(task.dueDate));
  const [time, setTime] = useState(new Date()); // Default to current time
  const [duration, setDuration] = useState(parseInt(task.duration));
  const [isEditMode, setIsEditMode] = useState(false);

  // Date and Time pickers visibility states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  return (
    <View style={[styles.container, { backgroundColor, paddingTop: 60 }]}>
      <View style={globalStyles.cardHeaderContainer}>
        <Text
          style={[globalStyles.detailsText, { fontSize: 16 }]}
          onPress={() => navigation.goBack()}
        >
          Back
        </Text>
        <TouchableOpacity onPress={toggleEditMode}>
          <Ionicons name="pencil-outline" size={24} color={titleColor} />
        </TouchableOpacity>
        <View style={globalStyles.whiteButton}>
          <Text
            style={[
              globalStyles.statusText,
              { color: statusColor, fontSize: 15 },
            ]}
          >
            {task.status}
          </Text>
        </View>
      </View>

      <Text style={[globalStyles.dateText, { fontSize: 19 }]}>
        {formattedDate}
      </Text>

      {isEditMode && (
        <>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={[globalStyles.details, { color: titleColor }]}>
              Change Date: {formattedDate}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <Text style={[globalStyles.details, { color: titleColor }]}>
              Change Time: {formattedTime}
            </Text>
          </TouchableOpacity>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={1}
            maximumValue={240}
            step={1}
            value={duration}
            onValueChange={(value) => setDuration(value)}
            minimumTrackTintColor={statusColor}
            maximumTrackTintColor="#000000"
          />
          <Text style={[globalStyles.details, { color: titleColor }]}>
            Duration: {duration} minutes
          </Text>
        </>
      )}

      <TextInput
        style={[
          styles.input,
          globalStyles.titleText,
          {
            color: titleColor,
            backgroundColor: isEditMode ? "rgba(0,0,0,0.1)" : "transparent",
          },
        ]}
        value={title}
        onChangeText={setTitle}
        editable={isEditMode}
        multiline={true}
      />
      <TextInput
        style={[
          styles.input,
          globalStyles.subTitleText,
          {
            color: titleColor,
            opacity: 0.7,
            fontSize: 16,
            backgroundColor: isEditMode ? "rgba(0,0,0,0.1)" : "transparent",
          },
        ]}
        value={description}
        onChangeText={setDescription}
        editable={isEditMode}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="time-outline" size={12} color="#888" />
        <Text style={[globalStyles.details, { color: "grey", fontSize: 15 }]}>
          {formattedTime} | {duration} minutes
        </Text>
      </View>
      <View style={[globalStyles.avatarContainer, { marginVertical: 20 }]}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/1.jpg",
          }}
          style={[
            globalStyles.personImage,
            { width: 50, height: 50, borderRadius: "50%" },
          ]}
        />
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/women/2.jpg",
          }}
          style={[
            globalStyles.personImage,
            { width: 50, height: 50, borderRadius: "50%" },
          ]}
        />
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/3.jpg",
          }}
          style={[
            globalStyles.personImage,
            { width: 50, height: 50, borderRadius: "50%" },
          ]}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 15,
          maxHeight: 60,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={[
            globalStyles.button,
            globalStyles.buttonPrimary,
            { backgroundColor: "#7ed957" },
          ]}
        >
          <Text style={{ color: "#fff" }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            globalStyles.button,
            globalStyles.buttonPrimary,
            { backgroundColor: "red" },
          ]}
        >
          <Text style={{ color: "#fff" }}>Delete</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    fontSize: 16,
    marginVertical: 20,
    padding: 15,
    borderRadius: 23,
  },
});
