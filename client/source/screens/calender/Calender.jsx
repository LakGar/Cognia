import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WeekView from "../../components/calender/WeekView";

const Calender = () => {
  return (
    <View style={{ flex: 1 }}>
      <WeekView />
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({});
