// src/navigation/AppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./MainNavigator";
import ModalSelector from "react-native-modal-selector";
import MoodSelector from "../components/home/mood/MoodSelector";
import TaskDetail from "../components/Details/TaskDetail";
import EditProfile from "../components/Edit/EditProfile";
import CreateTask from "../components/Create/CreateTask";
import AddPatientInfo from "../components/Create/AddPatientInfo";
import EditPatient from "../components/Edit/EditPatient";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="AddMood" component={MoodSelector} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="CreateTask" component={CreateTask} />
      <Stack.Screen name="AddPatientInfo" component={AddPatientInfo} />
      <Stack.Screen name="EditPatient" component={EditPatient} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
