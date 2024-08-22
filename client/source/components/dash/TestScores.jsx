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
import { ProgressChart } from "react-native-chart-kit";

const TestScores = () => {
  const { theme } = useTheme();
  const tests = [
    { Test_ID: 1, Test_Name: "MMSE", Results: [{ Value: 23 }] },
    { Test_ID: 2, Test_Name: "MoCA", Results: [{ Value: 20 }] },
    { Test_ID: 3, Test_Name: "Clock Drawing Test", Results: [{ Value: 4 }] },
    { Test_ID: 4, Test_Name: "Memory Recall", Results: [{ Value: 8 }] },
  ];

  const userType = "patient"; // Replace with actual user type

  const renderCard = (test, index) => {
    const chartConfig = {
      backgroundColor: theme.cardBG,
      backgroundGradientFrom: theme.cardBG,
      backgroundGradientTo: theme.cardBG,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 1, // Stroke width for the chart
      barPercentage: 0.9,
    };

    const data = {
      data: [], // Example normalization, assuming max value is 30
    };

    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.cardBG }]}
        key={test.Test_ID}
      >
        <Text style={[styles.testName, { color: theme.subText }]}>
          {test.Test_Name}
        </Text>
        <ProgressChart
          data={data}
          width={100}
          height={100}
          strokeWidth={2}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={true}
        />
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
        {tests.map((test, index) => renderCard(test, index))}
      </ScrollView>
    </View>
  );
};

export default TestScores;

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
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
    width: 150,
    height: 180,
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
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
});
