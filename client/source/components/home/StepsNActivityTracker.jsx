import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { BarChart } from "react-native-chart-kit";
import { globalStyles } from "../../styles/globalStyles";
import { useTheme } from "../../theme/ThemeContext";

const screenWidth = Dimensions.get("window").width;

const StepsNActivityTracker = () => {
  const { theme } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);

  // Hardcoded data
  const stepCount = 6543;
  const totalDuration = 85; // in minutes
  const stepsData = [
    500, 800, 700, 600, 400, 300, 500, 900, 1200, 1000, 800, 600, 400, 300, 200,
    100, 50, 30, 20, 40, 60, 80, 100, 120,
  ];

  const barData = {
    labels: ["0:00", "6:00", "12:00", "18:00"],
    datasets: [
      {
        data: stepsData.filter((_, index) => index % 1 === 0),
      },
    ],
  };

  const handleCardPress = (chartType) => {
    setSelectedChart(chartType);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={[
            {
              backgroundColor: theme.cardAccent,
              flex: 1,
              borderRadius: 20,
              padding: 15,
              justifyContent: "space-between",
            },
          ]}
          onPress={() => handleCardPress("steps")}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              right: 10,
              top: 10,
            }}
          >
            <Text style={{ fontWeight: "600", color: "grey" }}>4:55AM</Text>
            <Icon name="chevron-forward" color="grey" size={20} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              marginBottom: 20,
            }}
          >
            <Icon name="flame" size={15} color="orange" />
            <Text style={[styles.cardText, { color: theme.text }]}>Steps</Text>
          </View>

          <Text style={[styles.cardValue, { color: theme.text }]}>
            {stepCount}{" "}
            <Text
              style={{ color: theme.accent, fontSize: 16, fontWeight: "600" }}
            >
              Steps
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              backgroundColor: theme.cardAccent,

              flex: 1,
              borderRadius: 20,
              padding: 15,
              justifyContent: "space-between",
            },
          ]}
          onPress={() => handleCardPress("duration")}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              right: 10,
              top: 10,
            }}
          >
            <Text style={{ fontWeight: "600", color: "grey" }}>4:55AM</Text>
            <Icon name="chevron-forward" color="grey" size={20} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              marginBottom: 20,
            }}
          >
            <Icon name="fitness-outline" size={15} color="red" />
            <Text style={[styles.cardText, { color: theme.text }]}>
              Activities
            </Text>
          </View>

          <Text style={[styles.cardValue, { color: theme.text }]}>
            {totalDuration}{" "}
            <Text
              style={{ color: theme.accent, fontSize: 16, fontWeight: "600" }}
            >
              mins
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {selectedChart === "steps" ? "Steps Chart" : "Duration Chart"}
          </Text>
          <BarChart
            data={barData}
            width={screenWidth - 60}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 6,
              },
              barPercentage: 0.2,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 6,
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default StepsNActivityTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  cardsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    gap: 10,
  },
  cardText: {
    fontWeight: "700",
    color: "lightgrey",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#3A668C",
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
