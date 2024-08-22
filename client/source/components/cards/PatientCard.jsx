import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Icon from "react-native-vector-icons/Ionicons";
import { globalStyles } from "../../styles/globalStyles";

const PatientCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { theme } = useTheme();

  const toggleCard = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const renderDetail = (label, value) => (
    <View style={styles.statRow}>
      <Text
        style={[styles.scoreText, { color: theme.text, fontWeight: "400" }]}
      >
        {label}
      </Text>
      <View style={[styles.score, { backgroundColor: "lightgrey" }]}>
        <Text style={[styles.scoreText, { color: "black" }]}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontWeight: "600",
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          PatientCard
        </Text>
        <TouchableOpacity onPress={toggleCard}>
          <Icon
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <View
          style={[
            styles.cardContainer,
            globalStyles.shadow,
            { backgroundColor: theme.cardBG },
          ]}
        >
          <View style={styles.detailsContainer}>
            {renderDetail("Age", "75")}
            {renderDetail("Weight", "70 kg")}
            {renderDetail("Height", "170 cm")}
            {renderDetail("Blood Type", "O+")}
            {renderDetail("Dementia Stage", "Moderate")}

            <TouchableOpacity
              onPress={toggleModal}
              style={[
                globalStyles.button,
                {
                  backgroundColor: theme.secondary,
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={[styles.prescriptionsText]}>Prescriptions</Text>
            </TouchableOpacity>

            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={toggleModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Prescriptions</Text>
                  <Text>- Prescription 1</Text>
                  <Text>- Prescription 2</Text>
                  <Text>- Prescription 3</Text>
                  <Button title="Close" onPress={toggleModal} />
                </View>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </View>
  );
};

export default PatientCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    borderRadius: 3,
  },

  detailsContainer: {
    marginTop: 10,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
  },
  score: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
  },
  scoreText: {
    fontWeight: "600",
    fontSize: 16,
  },
  prescriptionsText: { color: "white", textAlign: "center", padding: 10 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
