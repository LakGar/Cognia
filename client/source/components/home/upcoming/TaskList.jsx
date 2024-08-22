import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import NoData from "./NoData";
import TaskCard from "../../cards/TaskCard";

const TaskList = () => {
  const count = 1;
  const tasks = [
    {
      id: 1,
      title: "Do The Taxes and give my mother the moeny",
      description: "Complete the monthly financial report",
      dueDate: "2024-12-01",
      dueTime: "10:00 AM",
      duration: "2 hours",
      status: "Completed",
    },
    {
      id: 2,
      title: "Meeting",
      description: "Attend the team meeting",
      dueDate: "2024-12-02",
      dueTime: "02:00 PM",
      duration: "1 hour",
      status: "in progress",
    },
    {
      id: 3,
      title: "Project plan",
      description: "Update the project plan",
      dueDate: "2024-12-03",
      dueTime: "09:00 AM",
      duration: "1.5 hours",
      status: "pending",
    },
    {
      id: 4,
      title: "New marketing strategy",
      description: "Review the new marketing strategy",
      dueDate: "2024-12-04",
      dueTime: "03:00 PM",
      duration: "2 hours",
      status: "missed",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      {count === 0 ? (
        <NoData field="Task" nav="CreateAll" />
      ) : (
        <View
          style={{
            justifyConten: "center",
            alignItems: "center",
            flex: 1,
            marginVertical: 0,
          }}
        >
          <FlatList
            data={tasks}
            renderItem={({ item }) => <TaskCard task={item} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({});
