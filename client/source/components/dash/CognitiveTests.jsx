import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";
import { LineChart } from "react-native-chart-kit";
import _ from "lodash";

const CognitiveTests = ({ patientInfo }) => {
  const { theme } = useTheme();
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // Ensure that patientInfo.test is defined and is an array
  const tests = patientInfo?.test || [];

  // Filter to get the latest test for each type
  const latestTests = tests.reduce((acc, test) => {
    if (
      !acc[test.testName] ||
      new Date(test.date) > new Date(acc[test.testName].date)
    ) {
      acc[test.testName] = test;
    }
    return acc;
  }, {});

  const userType = "patient"; // Replace with actual user type

  const renderCard = (test) => {
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.cardBG }]}
        key={test._id}
        onPress={() => handleCardPress(test)}
      >
        <Text style={[styles.testName, { color: theme.subText }]}>
          {test.testName}
        </Text>
        <Text style={[styles.testValue, { color: theme.text }]}>
          {test.testResult}
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

  const handleCardPress = (test) => {
    setSelectedTest(test);
    setModalVisible(true);
  };

  const getTrendAndRecommendation = () => {
    const testGroup = tests.filter((t) => t.testName === selectedTest.testName);

    // Sort tests by date (assuming they have a date field)
    const sortedTests = _.orderBy(testGroup, ["date"], ["asc"]);

    const trend = sortedTests
      .map((t) => parseFloat(t.testResult))
      .filter((value) => !isNaN(value));
    const dates = sortedTests.map((t) =>
      new Date(t.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
      })
    );

    // Ensure the lengths of the trend and dates arrays are the same
    if (trend.length !== dates.length || trend.length === 0) {
      return {
        trend: [0],
        dates: ["N/A"],
        recommendation: "No data available",
        isImproving: false,
      };
    }

    // Simple trend analysis (e.g., is the latest result better or worse than the previous one?)
    const isImproving =
      trend.length > 1 && trend[trend.length - 1] > trend[trend.length - 2];

    const recommendation = isImproving
      ? "Keep up the good work! Your progress is improving."
      : "It looks like there is a decline in your progress. Please consult with your doctor for advice.";

    return { trend, dates, recommendation, isImproving };
  };

  const chartConfig = {
    backgroundGradientFrom: theme.backgroundColor,
    backgroundGradientTo: theme.backgroundColor,
    color: () => theme.accent,
    strokeWidth: 2, // optional, default 3
    decimalPlaces: 0, // optional, defaults to 2dp
    labelColor: () => theme.text,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: theme.accent,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Cognitive Tests</Text>
      <ScrollView
        horizontal={true}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {Object.values(latestTests).map((test) => renderCard(test))}
      </ScrollView>

      {selectedTest && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={[
              styles.modalView,
              { backgroundColor: theme.backgroundColor },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {selectedTest.testName} Trend
            </Text>
            <View style={styles.trendContainer}>
              <LineChart
                data={{
                  labels: getTrendAndRecommendation().dates,
                  datasets: [
                    {
                      data: getTrendAndRecommendation().trend,
                      color: () => theme.accent,
                      strokeWidth: 2,
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 40} // from react-native
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
            <Text style={[styles.recommendationText, { color: theme.text }]}>
              {getTrendAndRecommendation().recommendation}
            </Text>
            <TouchableOpacity
              style={[globalStyles.button, { backgroundColor: theme.primary }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
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
  modalView: {
    margin: 20,
    marginTop: 60,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  trendContainer: {
    marginVertical: 10,
  },
  trendText: {
    fontSize: 16,
  },
  recommendationText: {
    fontSize: 14,
    marginVertical: 15,
    textAlign: "center",
  },
});
