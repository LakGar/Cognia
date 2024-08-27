import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import NoData from "./NoData";
import TaskCard from "../../cards/TaskCard";
import moment from "moment";

const TaskList = ({ tasks }) => {
  const today = moment().startOf("day");
  const nextWeek = moment().add(7, "days").endOf("day");

  // Filter tasks for the next 7 days
  const tasksUpcomingWeek = tasks.filter((task) =>
    moment(task.dueDate).isBetween(today, nextWeek, null, "[]")
  );

  return (
    <View style={{ flex: 1 }}>
      {tasksUpcomingWeek.length === 0 ? (
        <NoData field="Task" nav="CreateAll" />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginVertical: 0,
          }}
        >
          <FlatList
            data={tasksUpcomingWeek}
            renderItem={({ item }) => <TaskCard task={item} />}
            keyExtractor={(item) => item._id}
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
