import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../styles/globalStyles";
import BgImg from "../../../assets/connect.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../theme/ThemeContext";

const { width } = Dimensions.get("window");

const EmergencyButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme, isDarkMode } = useTheme();
  const renderButton = (name, icon) => (
    <TouchableOpacity
      style={[
        globalStyles.shadow,
        styles.button,
        { backgroundColor: theme.primary },
      ]}
    >
      <Icon name={icon} size={24} color="#fff" />
      <Text style={[{ color: "#fff", fontWeight: "600", fontSize: 16 }]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
  const profileImage =
    "https://images.unsplash.com/photo-1722898614951-a158891a7495?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <View
      style={{
        paddingHorizontal: 20,
        position: "absolute",
        bottom: 20,
        width: "100%",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          width: 70,
          height: 70,
          borderRadius: 35,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 2,
          borderColor: "white",
        }}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="alert" size={34} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={[
            globalStyles.screenContainer,
            { paddingTop: 0, backgroundColor: theme.backgroundColor },
          ]}
        >
          <View
            style={{
              width,
              paddingHorizontal: 20,
              paddingTop: 70,
              paddingBottom: 20,
              borderRadius: 24,
              backgroundColor: theme.cardAccent,
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text
                style={[
                  globalStyles.detailsText,
                  { fontSize: 15, color: theme.accent },
                ]}
              >
                Close
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 70,
                  width: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: profileImage }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    borderWidth: 3,
                    borderColor: "#fff",
                    objectFit: "cover",
                  }}
                />
              </TouchableOpacity>

              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text
                  style={{
                    fontWeight: "800",
                    fontSize: 30,
                    color: theme.text, // Apply theme color to "Hello Lola!"
                  }}
                >
                  Hello Lola! 👋
                </Text>
                <Text
                  style={{
                    color: theme.subText, // Apply theme color to date
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  +1456 989 9000
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  borderRadius: 12,
                  backgroundColor: "rgba(255,0,0,0.3)", // Apply theme color to icon background
                  height: 60,
                  width: 60,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="exclamation-thick"
                  size={30}
                  color={"rgba(255,0,0,0.9)"} // Apply theme color to icon
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text
              style={[
                globalStyles.titleText,
                { fontSize: 30, color: theme.text },
              ]}
            >
              Are you in emergency?
            </Text>
            <Text
              style={[
                {
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "500",
                  width: 290,
                  color: theme.subText,
                },
              ]}
            >
              Press the button below, help will reach you soon.
            </Text>
            <View
              style={{
                width: 300,
                height: 300,
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {[260, 230, 200].map((size, index) => (
                <TouchableOpacity
                  key={size}
                  style={{
                    backgroundColor: "red",
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    opacity: index === 2 ? 0.9 : 0.1 + 0.1 * index,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                  }}
                >
                  {index === 2 && (
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "800",
                        fontSize: 70,
                      }}
                    >
                      SOS
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={[
                globalStyles.titleText,
                { fontSize: 25, textAlign: "left", color: theme.text },
              ]}
            >
              Security Numbers
            </Text>
            <Text style={[globalStyles.subTitleText, { color: theme.subText }]}>
              List of Security
            </Text>
            <View style={{ flexWrap: "wrap", flexDirection: "row", gap: 20 }}>
              {renderButton("Police", "police-badge")}
              {renderButton("Fire Department", "fire-truck")}
              {renderButton("Ambulance", "ambulance")}
              {renderButton("Air Unit", "helicopter")}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EmergencyButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3c4826",
    width: "47%",
    gap: 5,
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 12,
    padding: 10,
  },
});
