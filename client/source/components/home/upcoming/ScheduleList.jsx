import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NoData from "./NoData";

const ScheduleList = () => {
  const count = 0;
  return (
    <View style={{ flex: 1 }}>
      {count === 0 ? (
        <NoData field="Schedule" nav="CreateAll" />
      ) : (
        <View>
          <Text>All</Text>
        </View>
      )}
    </View>
  );
};

export default ScheduleList;

const styles = StyleSheet.create({});
