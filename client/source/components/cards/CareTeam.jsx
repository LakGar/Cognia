import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";

const CareTeam = ({ patientInfo }) => {
  const { theme } = useTheme();

  const renderCard = ({ image, name, username, type }) => {
    return (
      <View
        style={[
          {
            backgroundColor: theme.cardBG,
            flexDirection: "row",
            padding: 15,
            borderRadius: 3,
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          },
          globalStyles.shadow,
        ]}
      >
        <View style={styles.left}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.right}>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[globalStyles.subTitle, { color: theme.text }]}>
                {name}
              </Text>
              <Text style={[globalStyles.username, { color: "grey" }]}>
                {type}
              </Text>
            </View>

            <Text style={[globalStyles.username, { color: theme.accent }]}>
              {username}
            </Text>
          </View>
          <View style={{ flexDirection: "row", height: 40, gap: 10 }}>
            <TouchableOpacity
              style={[
                globalStyles.button,
                {
                  backgroundColor: theme.primary,
                  width: 130,
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>
                Message
              </Text>
            </TouchableOpacity>
            {(type === "Doctor" || type === "Caregiver") && (
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    backgroundColor: theme.accent,
                    width: 130,
                    justifyContent: "center",
                  },
                ]}
              >
                <Text style={[styles.buttonText, { color: "white" }]}>
                  Request
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  // Check if all care team arrays are empty
  if (
    (!patientInfo.doctor || patientInfo.doctor.length === 0) &&
    (!patientInfo.caregiver || patientInfo.caregiver.length === 0) &&
    (!patientInfo.family || patientInfo.family.length === 0)
  ) {
    return null; // No care team members, so render nothing
  }

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
        Care Team
      </Text>
      {renderCard({
        image:
          "https://images.unsplash.com/photo-1723913497367-03ea2b196858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
        name: "Dr. Amy Chang",
        username: "@amychang",
        type: "Doctor",
      })}
      {renderCard({
        image:
          "https://plus.unsplash.com/premium_photo-1723650938522-5d199aef4e6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1Nnx8fGVufDB8fHx8fA%3D%3D",
        name: "Sally Mae",
        username: "@smae234",
        type: "Caregiver",
      })}
    </View>
  );
};

export default CareTeam;

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
  },
  buttonText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
});
