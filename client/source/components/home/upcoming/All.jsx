import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NoData from "./NoData";

const All = () => {
  const count = 0;
  return (
    <View style={{ flex: 1 }}>
      {count === 0 ? (
        <NoData field="All" nav="CreateAll" />
      ) : (
        <View>
          <Text>All</Text>
        </View>
      )}
    </View>
  );
};

export default All;

const styles = StyleSheet.create({});
