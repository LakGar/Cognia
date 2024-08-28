import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { useTheme } from "../../theme/ThemeContext";
import AddEmergencyContactModal from "./AddEmergencyContactModal";
import { useDispatch, useSelector } from "react-redux";
import { updatePatient } from "../../redux/patientSlice";
import _ from "lodash";

const EmergencyContact = ({ patientInfo }) => {
  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const emergencyContacts = patientInfo?.emergencyContacts || [];

  const handleAddContact = (newContact) => {
    const updatedPatientInfo = _.cloneDeep(patientInfo);

    if (!updatedPatientInfo.emergencyContacts) {
      updatedPatientInfo.emergencyContacts = [];
    }

    updatedPatientInfo.emergencyContacts.push(newContact);

    dispatch(
      updatePatient({
        token: userToken,
        userId: userInfo._id,
        patientData: updatedPatientInfo,
      })
    );
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Text
        style={{
          color: theme.text,
          fontWeight: "600",
          fontSize: 16,
          marginBottom: 10,
        }}
      >
        Emergency Contact
      </Text>
      {emergencyContacts.length > 0 ? (
        <View
          style={[
            {
              backgroundColor: "rgba(255, 0,0,0.4)",
              flexDirection: "row",
              padding: 15,
              borderRadius: 3,
              alignItems: "center",
              gap: 10,
            },
            globalStyles.shadow,
          ]}
        >
          <View style={styles.left}>
            <View style={styles.profileImage}>
              <Text style={styles.nameLetter}>
                {emergencyContacts[0].name.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.right}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[globalStyles.subTitle, { color: "white" }]}>
                  {emergencyContacts[0].name}
                </Text>
              </View>
              <Text style={[globalStyles.username, { color: "red" }]}>
                {emergencyContacts[0].phone}
              </Text>
            </View>
            <View style={{ flexDirection: "row", height: 40, gap: 10 }}>
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    backgroundColor: "red",
                    width: 130,
                    justifyContent: "center",
                  },
                ]}
              >
                <Text style={[styles.buttonText, { color: "white" }]}>
                  Call
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text style={{ color: "white", marginBottom: 10 }}>
            No emergency contact available. Please add one.
          </Text>
          <TouchableOpacity
            style={[
              globalStyles.button,
              {
                backgroundColor: "dodgerblue",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                borderRadius: 5,
              },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              Add Emergency Contact
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <AddEmergencyContactModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddContact}
      />
    </View>
  );
};

export default EmergencyContact;

const styles = StyleSheet.create({
  left: {
    flex: 0.3,
  },
  right: {
    flex: 1,
    justifyContent: "space-between",
    gap: 4,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  nameLetter: {
    fontSize: 38,
    color: "rgba(255,0,0,0.4)",
    fontWeight: "800",
  },
  buttonText: {
    fontWeight: "600",
    textAlign: "center",
  },
});
