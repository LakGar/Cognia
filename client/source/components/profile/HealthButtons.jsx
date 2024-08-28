import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import _ from "lodash"; // Import lodash for deep cloning
import { useTheme } from "../../theme/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { updatePatient } from "../../redux/patientSlice";

const HealthButtons = ({ patientInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState("");
  const [score, setScore] = useState("");
  const { theme } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);

  const toggleCard = () => {
    setIsExpanded(!isExpanded);
  };

  const openModal = (testType) => {
    setSelectedTest(testType);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedTest("");
    setScore("");
  };

  const handleAddTest = () => {
    if (!score) {
      alert("Please enter a score");
      return;
    }

    // Create a deep copy of patientInfo to avoid mutation errors
    const updatedPatientInfo = _.cloneDeep(patientInfo);

    // Ensure test array exists
    if (!updatedPatientInfo.test) {
      updatedPatientInfo.test = [];
    }

    // Add the test to the test array
    updatedPatientInfo.test.push({
      testName: selectedTest,
      testResult: score,
      testDate: new Date(),
    });

    // Dispatch the updatePatient action with the updated data
    dispatch(
      updatePatient({
        token: userToken,
        userId: userInfo._id,
        patientData: updatedPatientInfo,
      })
    )
      .unwrap()
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating patient:", error);
      });
  };

  const findLatestTestResult = (testName) => {
    const tests = patientInfo?.test?.filter((t) => t.testName === testName);
    if (tests && tests.length > 0) {
      const latestTest = tests.reduce((latest, current) => {
        return new Date(latest.testDate) > new Date(current.testDate)
          ? latest
          : current;
      });
      return latestTest.testResult;
    }
    return null;
  };

  const renderStat = (label, value) => (
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

  const renderEmptyBlock = (label) => (
    <View style={styles.emptyBlock}>
      <Text style={{ color: theme.text, marginBottom: 10 }}>
        No {label} score available.
      </Text>
      <TouchableOpacity
        onPress={() => openModal(label)}
        style={styles.addButton}
      >
        <Text style={{ color: "white" }}>Add Score</Text>
      </TouchableOpacity>
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
          Health Tests
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
        <>
          <View
            style={[
              styles.card,
              globalStyles.shadow,
              { backgroundColor: theme.cardBG },
            ]}
          >
            <Text style={[globalStyles.username, { color: theme.text }]}>
              Cognitive Scores
            </Text>
            {findLatestTestResult("MMSE")
              ? renderStat("MMSE:", findLatestTestResult("MMSE"))
              : renderEmptyBlock("MMSE")}
            {findLatestTestResult("MoCA")
              ? renderStat("MoCA:", findLatestTestResult("MoCA"))
              : renderEmptyBlock("MoCA")}
          </View>

          <View
            style={[
              styles.card,
              globalStyles.shadow,
              { backgroundColor: theme.cardBG },
            ]}
          >
            <Text style={[globalStyles.username, { color: theme.text }]}>
              Physical & Mental Health
            </Text>
            {findLatestTestResult("Depression")
              ? renderStat("Depression:", findLatestTestResult("Depression"))
              : renderEmptyBlock("Depression")}
            {findLatestTestResult("ADL")
              ? renderStat("ADLs:", findLatestTestResult("ADL"))
              : renderEmptyBlock("ADL")}
            {findLatestTestResult("IADL")
              ? renderStat("IADLs:", findLatestTestResult("IADL"))
              : renderEmptyBlock("IADL")}
          </View>

          <View
            style={[
              styles.card,
              globalStyles.shadow,
              { backgroundColor: theme.cardBG },
            ]}
          >
            <Text style={[globalStyles.username, { color: theme.text }]}>
              Health Metrics
            </Text>
            {findLatestTestResult("Gait Speed")
              ? renderStat("Gait Speed:", findLatestTestResult("Gait Speed"))
              : renderEmptyBlock("Gait Speed")}
            {renderStat("Sleep Quality:", "4/5")}
            {renderStat("Physical Activity:", "Moderate")}
          </View>
        </>
      )}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add {selectedTest} Score</Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={score}
              onChangeText={setScore}
              placeholder={`Enter ${selectedTest} score`}
              placeholderTextColor="grey"
              keyboardType="numeric"
            />
            <Button title="Save" onPress={handleAddTest} />
            <Button title="Cancel" onPress={closeModal} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HealthButtons;

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    padding: 15,
    borderRadius: 3,
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
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
    fontSize: 15,
  },
  emptyBlock: {
    width: "100%",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  addButton: {
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
  input: {
    borderBottomWidth: 1,
    borderColor: "grey",
    marginBottom: 15,
    padding: 5,
    width: "100%",
    fontSize: 16,
  },
});
