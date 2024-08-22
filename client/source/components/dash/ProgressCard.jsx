// ProgressCard.js

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProgressCircle from "react-native-progress-circle";

const ProgressCard = ({ progress = 82 }) => {
  return (
    <View style={styles.card}>
      <ProgressCircle
        percent={progress}
        radius={50}
        borderWidth={8}
        color="#6CCF6F"
        shadowColor="#f0f0f0"
        bgColor="#fff"
      >
        <Text style={styles.progressText}>{`${progress}%`}</Text>
      </ProgressCircle>
      <Text style={styles.title}>Weekly progress</Text>
      <Text style={styles.subtitle}>4/5 tasks done.</Text>
    </View>
  );
};

export default ProgressCard;

const styles = StyleSheet.create({
  card: {
    width: 150,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  progressText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});
