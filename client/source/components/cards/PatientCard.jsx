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
import { useNavigation } from "@react-navigation/native";

const PatientCard = ({ patientInfo }) => {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { theme, isDarkMode } = useTheme();

  const toggleCard = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleModal = (item) => {
    setSelectedItem(item);
    setIsModalVisible(!isModalVisible);
  };

  const renderDetail = (label, value, unit) => (
    <View style={styles.statRow}>
      <Text
        style={[styles.scoreText, { color: theme.text, fontWeight: "500" }]}
      >
        {label}
      </Text>
      <View style={[styles.score, { backgroundColor: "lightgrey" }]}>
        <Text style={[styles.scoreText, { color: "black" }]}>
          {value} {unit}
        </Text>
      </View>
    </View>
  );

  const renderListAsButtons = (label, items) => {
    if (items.length === 0) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("EditPatient", { patientInfo })}
          style={[styles.addButton]}
        >
          <Text style={{ color: "white" }}>Add {label}</Text>
        </TouchableOpacity>
      );
    }
    return items.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => toggleModal(item)}
        style={[
          styles.itemButton,
          { backgroundColor: isDarkMode ? "grey" : "lightgrey" },
        ]}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>{item}</Text>
      </TouchableOpacity>
    ));
  };

  if (!patientInfo || !patientInfo.medicalInformation) {
    return (
      <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
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
        <Text style={{ color: theme.text, marginBottom: 10 }}>
          Looks like there is no medical information on you. Add some to track
          your progress.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditPatient", { patientInfo })}
          style={styles.addButton}
        >
          <Text style={{ color: "white" }}>Add Medical Information</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const medicalInfo = patientInfo?.medicalInformation;
  const height = medicalInfo.height.feet + "'" + medicalInfo.height.inches;

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
          <TouchableOpacity
            style={{ position: "absolute", top: 10, right: 20 }}
            onPress={() => navigation.navigate("EditPatient", { patientInfo })}
          >
            <Text style={{ color: theme.accent, fontWeight: "500" }}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.detailsContainer}>
            {renderDetail("Age", medicalInfo.age, "")}
            {renderDetail("Weight", medicalInfo.weight, "kg")}
            {renderDetail("Height", height, "ft")}
            {renderDetail("Blood Type", medicalInfo.bloodType)}
            {renderDetail("Dementia Stage", medicalInfo.dementiaStage)}

            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Medications
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
              {renderListAsButtons("Medications", medicalInfo.medications)}
            </View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Surgeries
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
              {renderListAsButtons("Surgeries", medicalInfo.surgeries)}
            </View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Allergies
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
              {renderListAsButtons("Allergies", medicalInfo.allergies)}
            </View>
            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => toggleModal(null)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Details</Text>
                  <Text>{selectedItem}</Text>
                  <Button title="Close" onPress={() => toggleModal(null)} />
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
    marginTop: 20,
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
    fontWeight: "500",
    fontSize: 15,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
  },
  itemButton: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 14,
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "dodgerblue",
  },
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
