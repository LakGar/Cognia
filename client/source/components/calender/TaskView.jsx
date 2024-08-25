import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeContext";
import CalenderCard from "../cards/CalenderCards";
import moment from "moment";

const { width } = Dimensions.get("window");

const TaskView = ({ tasks, activeDate }) => {
  const { theme, isDarkMode } = useTheme();

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
            style={{
              flex: 1,
              height: 0.4,
              backgroundColor: isDarkMode
                ? "rgba(255,255,255,0.3)"
                : "rgba(0,0,0,0.3)",
            }}
          ></View>
        </View>
      );
    }
    return hours;
  };

  // Filter and sort tasks based on the active date
  const filteredTasks = tasks
    .filter((task) => moment(task.dueDate).isSame(activeDate, "day"))
    .sort((a, b) => moment(a.dueTime).diff(moment(b.dueTime)));

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
          {filteredTasks.map((task) => (
            <CalenderCard
              key={task._id}
              title={task.taskName}
              time={moment(task.dueTime).format("hh:mm A")}
              duration={task.durations}
              status={task.type}
              task={task}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TaskView;

const styles = StyleSheet.create({});
