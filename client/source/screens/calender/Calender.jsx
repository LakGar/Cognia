import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import WeekView from "../../components/calender/WeekView";
import TaskTest from "../../test/TaskTest";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/taskSlice";
import PatientInfoTest from "../../test/patientInfoTest";

const Calender = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const loading = useSelector((state) => state.task?.loading);
  const { userToken } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userToken) {
      dispatch(fetchTasks(userToken));
    }
  }, [dispatch, userToken]);

  return (
    <View style={{ flex: 1 }}>
      {/* <WeekView tasks={tasks} /> */}
      <PatientInfoTest />
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({});
