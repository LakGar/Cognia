import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { globalStyles } from "../../styles/globalStyles";
import { useTheme } from "../../theme/ThemeContext";

const DailySummary = () => {
  const today = moment().startOf("day");
  const { theme } = useTheme();

  // Dummy data for tasks
  const tasks = [
    { id: 1, type: "medication", status: "completed", title: "Take Aspirin" },
    { id: 2, type: "medication", status: "pending", title: "Take Vitamin D" },
    { id: 3, type: "task", status: "completed", title: "Walk 30 minutes" },
    { id: 4, type: "task", status: "pending", title: "Read a book" },
    { id: 5, type: "task", status: "completed", title: "Stretching exercises" },
  ];

  const medicationTasks = tasks.filter((task) => task.type === "medication");
  const otherTasks = tasks.filter((task) => task.type !== "medication");

  const countCompletedTasks = (tasks) => {
    return tasks.filter((task) => task.status === "completed").length;
  };

  const renderTaskCard = (title, tasks, type) => {
    const totalTasks = tasks.length;
    const completedTasks = countCompletedTasks(tasks);
    const completionPercentage =
      totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    return (
      <View
        style={[
          {
            backgroundColor: theme.cardBG,
            flex: 1,
            height: 160,
            borderRadius: 20,
            padding: 15,
            justifyContent: "space-between",
          },
          globalStyles.shadow,
        ]}
      >
        <View style={{ flexDirection: "row", gap: 3 }}>
          <Icon
            name={type === "medication" ? "medical-outline" : "reader-outline"}
            size={18}
            color={"orange"}
          />
          <Text style={{ color: theme.text, fontWeight: "700", fontSize: 15 }}>
            {title}
          </Text>
        </View>
        <Text
          style={{
            color: theme.subText,
            fontWeight: "600",
            fontSize: 14,
            padding: 5,
          }}
        >
          {`${completedTasks}/${totalTasks} ${title}`}
        </Text>
        <View
          style={[styles.progressBar, { backgroundColor: theme.cardAccent }]}
        >
          <View
            style={[
              styles.progress,
              {
                width: `${completionPercentage}%`,
                backgroundColor: theme.primary,
              },
            ]}
          />
        </View>
        <TouchableOpacity
          style={[
            globalStyles.button,
            {
              maxHeight: 40,
              backgroundColor: theme.secondary,
              justifyContent: "center",
            },
          ]}
          onPress={() =>
            console.log(
              type === "medication"
                ? "Navigating to AddMedication"
                : "Navigating to CreateTask"
            )
          }
        >
          <Text
            style={[
              globalStyles.username,
              { color: "white", textAlign: "center" },
            ]}
          >
            {type === "medication" ? "Add Prescriptions" : "Add Tasks"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          color: theme.text,
          fontWeight: "600",
          fontSize: 16,
          marginBottom: 10,
        }}
      >
        Daily Summary
      </Text>
      <View style={{ flexDirection: "row", gap: 15 }}>
        {renderTaskCard("Daily Tasks", otherTasks, "task")}
        {renderTaskCard("Prescriptions", medicationTasks, "medication")}
      </View>
    </View>
  );
};

export default DailySummary;

const styles = StyleSheet.create({
  progressBar: {
    height: 10,
    backgroundColor: "#3c4826",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
  },
  progress: {
    height: "100%",
    backgroundColor: "#9bb265",
  },
});
