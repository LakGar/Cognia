import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Switch,
  ScrollView,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../theme/ThemeContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/authSlice";
import { createTask } from "../../redux/taskSlice";
import moment from "moment";

const CreateTaskForm = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [dueTime, setDueTime] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [repeatCount, setRepeatCount] = useState(1);
  const [repeatInterval, setRepeatInterval] = useState("weekly"); // 'weekly', 'monthly', 'yearly'
  const [teamMembers, setTeamMembers] = useState([]);
  const [type, setType] = useState("personal");
  const [priority, setPriority] = useState("low");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (userToken && !userInfo) {
      dispatch(getUserInfo(userToken));
    }
  }, [dispatch, userToken, userInfo]);

  const handleToggleRepeat = () => setRepeat((previousState) => !previousState);

  const handleDayToggle = (day) => {
    setDaysOfWeek((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };
  // Function to format the date
  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleConfirm = (date) => {
    setShowDatePicker(false);
    setDueDate(date);
  };

  const handleTimeConfirm = (selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setDueTime(selectedTime);
  };

  const handleCreateOrUpdateTask = () => {
    const tasksToCreate = [];

    if (repeat && daysOfWeek.length > 0) {
      const startDate = moment(dueDate);

      for (let i = 0; i < repeatCount; i++) {
        daysOfWeek.forEach((day) => {
          // Clone the start date and set the correct day of the week
          let nextDate = startDate.clone().day(day);

          // Check if the calculated date is before the start date (necessary when the first occurrence is in a future week)
          if (nextDate.isBefore(startDate, "day")) {
            nextDate.add(1, "week"); // Move to the next week
          }

          if (i > 0) {
            // Add the repetition interval (e.g., weekly) to the date
            nextDate.add(i * 7, "days");
          }

          // Construct the task data for each unique date
          const taskData = {
            taskName,
            description,
            dueDate: nextDate.toISOString(), // Set the correct due date for each task
            dueTime: moment(dueTime).toISOString(), // Ensure dueTime remains consistent
            priority,
            assignedTo: userInfo._id,
            status: "due",
            type,
            durations: duration,
          };

          tasksToCreate.push(taskData);
        });
      }
    } else {
      const taskData = {
        taskName,
        description,
        dueDate: moment(dueDate).toISOString(),
        dueTime: moment(dueTime).toISOString(),
        priority,
        assignedTo: userInfo._id,
        status: "due",
        type,
        durations: duration,
      };

      tasksToCreate.push(taskData);
    }

    // Dispatch each task creation separately
    tasksToCreate.forEach((taskData) => {
      dispatch(
        createTask({
          token: userToken,
          taskData,
        })
      );
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[
        globalStyles.screen,
        {
          width: "100%",
          height: "100%",
          backgroundColor: theme.backgroundColor,
        },
      ]}
    >
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text
            style={[
              globalStyles.name,
              { flex: 1, textAlign: "left", color: theme.text },
            ]}
          >
            Create Task
          </Text>
          <TouchableOpacity
            style={[
              globalStyles.button,
              {
                backgroundColor: theme.primary,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                maxWidth: 80,
              },
            ]}
            onPress={handleCreateOrUpdateTask}
          >
            <Text style={[styles.buttonText]}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                backgroundColor: isDarkMode ? "darkgrey" : "lightgrey",
                padding: 6,
                borderRadius: "50%",
                marginLeft: 20,
              },
            ]}
          >
            <Icon name={"options"} color={theme.text} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={[styles.repeatOptions, { gap: 15 }]}>
            <TouchableOpacity
              style={[
                styles.repeatOption,
                {
                  flex: 1,
                  backgroundColor:
                    type === "schedule" ? theme.primary : theme.secondary,
                },
              ]}
              onPress={() => setType("schedule")}
            >
              <Text style={styles.repeatOptionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.repeatOption,
                {
                  flex: 1,
                  backgroundColor:
                    type === "personal" ? theme.primary : theme.secondary,
                },
              ]}
              onPress={() => setType("personal")}
            >
              <Text style={styles.repeatOptionText}>Personal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.repeatOption,
                {
                  flex: 1,
                  backgroundColor:
                    type === "medication" ? theme.primary : theme.secondary,
                },
              ]}
              onPress={() => setType("medication")}
            >
              <Text style={styles.repeatOptionText}>Prescriptions</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
            }}
          >
            <View
              style={{
                flex: 0.6,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: userInfo?.profilePicture }}
                style={{ width: 110, height: 110, borderRadius: "50%" }}
              />
              <Text
                style={{
                  color: theme.text,
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "100%",
                  paddingVertical: 10,
                  fontSize: 20,
                }}
              >
                {userInfo.firstName} {userInfo.lastName}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: theme.subText,
                  fontWeight: "500",
                  paddingBottom: 10,
                }}
              >
                Title
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { color: theme.text, backgroundColor: theme.cardBG },
                ]}
                placeholder="Laundry"
                placeholderTextColor={isDarkMode ? "darkgrey" : "lightgrey"}
                value={taskName}
                onChangeText={setTaskName}
              />
              <Text
                style={{
                  color: theme.subText,
                  fontWeight: "500",
                  paddingBottom: 10,
                }}
              >
                Descriptions
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { color: theme.text, backgroundColor: theme.cardBG },
                ]}
                placeholder="Do my son's laundry..."
                placeholderTextColor={isDarkMode ? "darkgrey" : "lightgrey"}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>
          <Text
            style={{
              color: theme.subText,
              fontWeight: "500",
              paddingBottom: 10,
            }}
          >
            Team Members
          </Text>

          {/* Team Members Placeholder */}
          <View style={styles.teamMembersContainer}>
            {teamMembers.map((member, index) => (
              <Image
                key={index}
                source={{ uri: member }}
                style={styles.teamMember}
              />
            ))}
            <TouchableOpacity style={styles.addMemberButton}>
              <Icon name="add-circle" size={40} color={theme.accent} />
            </TouchableOpacity>
          </View>

          {/* Date and Time */}
          <Text
            style={{
              color: theme.subText,
              fontWeight: "500",
              paddingBottom: 10,
            }}
          >
            Date and Time
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={[
              styles.input,
              {
                color: theme.text,
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
                backgroundColor: theme.cardBG,
              },
            ]}
          >
            <Icon
              name="calendar-clear-outline"
              size={24}
              color={isDarkMode ? "darkgrey" : "lightgrey"}
            />
            <Text style={{ color: theme.text, flex: 1, fontWeight: "500" }}>
              {formatDate(dueDate)}
            </Text>
            <DateTimePickerModal
              isVisible={showDatePicker}
              mode="date"
              date={dueDate} // Ensure dueDate is passed here
              onConfirm={handleConfirm}
              onCancel={() => setShowDatePicker(false)}
              textColor="black" // Explicitly set the text color
            />
            <Icon
              name="chevron-down"
              size={20}
              color={isDarkMode ? "darkgrey" : "lightgrey"}
            />
          </TouchableOpacity>

          <View style={styles.timeContainer}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setShowTimePicker(true)}
            >
              <Text
                style={{
                  color: theme.subText,
                  fontWeight: "500",
                  paddingBottom: 10,
                }}
              >
                From
              </Text>
              <View
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.cardBG,
                    flexDirection: "row",
                    gap: 10,
                  },
                ]}
              >
                <Icon
                  name="time-outline"
                  size={24}
                  color={isDarkMode ? "darkgrey" : "lightgrey"}
                />
                <Text style={{ color: theme.text, fontWeight: "500", flex: 1 }}>
                  {dueTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                {showTimePicker && (
                  <DateTimePickerModal
                    isVisible={showTimePicker}
                    mode="time"
                    date={dueTime} // Ensure dueTime is passed here
                    onConfirm={handleTimeConfirm}
                    onCancel={() => setShowTimePicker(false)}
                    textColor="black" // Explicitly set the text color
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }}>
              <Text
                style={{
                  color: theme.subText,
                  fontWeight: "500",
                  paddingBottom: 10,
                }}
              >
                Duration (mins)
              </Text>
              <View
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.cardBG,
                    flexDirection: "row",
                    gap: 10,
                  },
                ]}
              >
                <Icon
                  name="time-outline"
                  size={24}
                  color={isDarkMode ? "darkgrey" : "lightgrey"}
                />
                <TextInput
                  style={[
                    {
                      color: theme.text,
                      backgroundColor: theme.cardBG,
                      flex: 1,
                    },
                  ]}
                  placeholder="30"
                  keyboardType="numeric"
                  value={duration}
                  onChangeText={setDuration}
                  placeholderTextColor={isDarkMode ? "darkgrey" : "lightgrey"}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Repeat and Toggle */}
          <View style={styles.repeatContainer}>
            <Text style={{ color: theme.text }}>Repeat</Text>
            <Switch
              value={repeat}
              onValueChange={handleToggleRepeat}
              thumbColor={repeat ? theme.primary : "#f4f3f4"}
              trackColor={{ false: "#767577", true: theme.primary }}
            />
          </View>

          {repeat && (
            <>
              <View>
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: "500",
                    paddingBottom: 10,
                  }}
                >
                  Repeat on
                </Text>
                <View style={styles.repeatOptions}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.repeatOption,
                          {
                            backgroundColor: daysOfWeek.includes(index)
                              ? theme.primary
                              : theme.secondary,
                          },
                        ]}
                        onPress={() => handleDayToggle(index)}
                      >
                        <Text style={styles.repeatOptionText}>{day}</Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: "500",
                    paddingBottom: 10,
                  }}
                >
                  Repeat Frequency
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { color: theme.text, backgroundColor: theme.cardBG },
                  ]}
                  placeholder="1"
                  keyboardType="numeric"
                  value={repeatCount}
                  onChangeText={(value) => setRepeatCount(parseInt(value, 10))}
                  placeholderTextColor={isDarkMode ? "darkgrey" : "lightgrey"}
                />
                <View style={styles.repeatOptions}>
                  <TouchableOpacity
                    style={[
                      styles.repeatOption,
                      {
                        backgroundColor:
                          repeatInterval === "weekly"
                            ? theme.primary
                            : theme.secondary,
                        flex: 1,
                      },
                    ]}
                    onPress={() => setRepeatInterval("weekly")}
                  >
                    <Text style={styles.repeatOptionText}>Weekly</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.repeatOption,
                      {
                        backgroundColor:
                          repeatInterval === "monthly"
                            ? theme.primary
                            : theme.secondary,
                        flex: 1,
                      },
                    ]}
                    onPress={() => setRepeatInterval("monthly")}
                  >
                    <Text style={styles.repeatOptionText}>Monthly</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.repeatOption,
                      {
                        backgroundColor:
                          repeatInterval === "yearly"
                            ? theme.primary
                            : theme.secondary,
                        flex: 1,
                      },
                    ]}
                    onPress={() => setRepeatInterval("yearly")}
                  >
                    <Text style={styles.repeatOptionText}>Yearly</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTaskForm;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
  },
  form: {
    padding: 16,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    flex: 1,
    minHeight: 40,
    maxHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  teamMembersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  teamMember: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  addMemberButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 16,
    height: 80,
  },
  repeatContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 3,
  },
  repeatOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  repeatOption: {
    width: 36,
    height: 36,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  repeatOptionText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
