// src/navigation/AppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./MainNavigator";
import ModalSelector from "react-native-modal-selector";
import MoodSelector from "../components/home/mood/MoodSelector";
import TaskDetail from "../components/Details/TaskDetail";
import EditProfile from "../components/Create/Edit/EditProfile";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="AddMood" component={MoodSelector} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
