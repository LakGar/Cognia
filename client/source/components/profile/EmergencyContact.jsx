import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { globalStyles } from "../../styles/globalStyles";
import { useTheme } from "../../theme/ThemeContext";

const EmergencyContact = () => {
  const { theme } = useTheme();
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
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1696949706250-90624f778f6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzR8fHxlbnwwfHx8fHw%3D",
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.right}>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[globalStyles.subTitle, { color: "white" }]}>
                Marry Jane
              </Text>
            </View>

            <Text style={[globalStyles.username, { color: "red" }]}>
              +1(408) 576 8344
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
              <Text style={[styles.buttonText, { color: "white" }]}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  },
  buttonText: {
    fontWeight: "600",
    textAlign: "center",
  },
});
