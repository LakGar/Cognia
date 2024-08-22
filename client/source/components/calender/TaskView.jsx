import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeContext";
import CalenderCard from "../cards/CalenderCards";

const { width } = Dimensions.get("window");

const TaskView = () => {
  const { theme } = useTheme();

  // Function to generate hours from 12 AM to 12 AM
  const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hourLabel =
        i === 0
          ? "12 AM"
          : i < 12
          ? `${i} AM`
          : i === 12
          ? "12 PM"
          : `${i - 12} PM`;
      hours.push(
        <View
          key={i}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            height: 50,
          }}
        >
          <Text style={{ color: theme.subText, fontWeight: "500", flex: 0.13 }}>
            {hourLabel}
          </Text>
          <View
            style={{ flex: 1, height: 0.4, backgroundColor: "grey" }}
          ></View>
        </View>
      );
    }
    return hours;
  };

  const events = [
    {
      time: "10:00 AM",
      duration: 60,
      title: "Doctor's Appointment",
      type: "appointment",
    },
    {
      time: "02:00 PM",
      duration: 120,
      title: "Meeting with Caregiver",
      type: "task",
    },
    {
      time: "09:00 AM",
      duration: 30,
      title: "Morning Medication",
      type: "prescription",
    },
    {
      time: "04:00 PM",
      duration: 90,
      title: "Exercise Routine",
      type: "schedule",
    },
  ];

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {generateHours()}
          <CalenderCard
            title="Dinner"
            time="6:00PM"
            duration={25}
            status="Schedule"
          />
          <CalenderCard
            title="Doctor's Appointment"
            time="09:00AM"
            duration={240}
            status="Appointment"
          />
          <CalenderCard
            title="Doctor's Appointment"
            time="02:00PM"
            duration={80}
            status="Task"
          />
          <CalenderCard
            title="Book Club"
            time="11:00PM"
            duration={120}
            status="Task"
          />
          <CalenderCard
            title="Take Tylenol"
            time="02:00AM"
            duration={20}
            status="Prescription"
          />
          <CalenderCard
            title="Do the Laundry"
            time="06:30AM"
            duration={320}
            status="Task"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TaskView;

const styles = StyleSheet.create({});
