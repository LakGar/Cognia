import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";

const CognitiveTests = () => {
  const { theme } = useTheme();
  const tests = [
    { Test_ID: 1, Test_Name: "MMSE", Results: [{ Value: 23 }] },
    { Test_ID: 2, Test_Name: "MoCA", Results: [{ Value: 20 }] },
    { Test_ID: 3, Test_Name: "Clock Drawing Test", Results: [{ Value: 4 }] },
    { Test_ID: 4, Test_Name: "Memory Recall", Results: [{ Value: 8 }] },
  ];
  const userType = "patient"; // Replace with actual user type
  const renderCard = (test) => {
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.cardBG }]}
        key={test.Test_ID}
      >
        <Text style={[styles.testName, { color: theme.subText }]}>
          {test.Test_Name}
        </Text>
        <Text style={[styles.testValue, { color: theme.text }]}>
          {test.Results && test.Results.length > 0
            ? test.Results[test.Results.length - 1].Value
            : "No value"}
        </Text>
        <TouchableOpacity
          style={[
            globalStyles.button,
            { backgroundColor: theme.primary, height: 30, maxHeight: 30 },
          ]}
        >
          <Text style={styles.buttonText}>
            {userType === "caregiver" ? "Schedule" : "Request"}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cognitive Tests</Text>
      <ScrollView
        horizontal={true}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {tests.map((test) => renderCard(test))}
      </ScrollView>
    </View>
  );
};

export default CognitiveTests;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  scrollView: {
    paddingBottom: 10,
  },
  scrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    width: 110,
    height: 130,
    padding: 10,
    marginLeft: 20,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    justifyContent: "space-between",
  },
  testName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  testValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    padding: 7,
  },
});
