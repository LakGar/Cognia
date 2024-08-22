import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { globalStyles } from "../../styles/globalStyles";
import Logo from "../../../assets/Logo.png";
import LogoDark from "../../../assets/LogoDark.png";

import { useTheme } from "../../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const AuthScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={[
        globalStyles.screenContainer,
        {
          justifyContent: "space-between",
          paddingHorizontal: 20,
          backgroundColor: theme.backgroundColor,
        },
      ]}
    >
      <Text style={[styles.smallLogoText, { color: theme.accent }]}>
        COGNIA
      </Text>
      {!isDarkMode ? (
        <Image style={[styles.logoImage]} source={Logo} />
      ) : (
        <Image style={[styles.logoImage]} source={LogoDark} />
      )}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.buttonText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: theme.secondary }]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={[styles.buttonText]}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  smallLogoText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    fontWeight: "800",
    width: "100%",
    textAlign: "left",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    paddingVertical: 10,
    textAlign: "center",
  },
  logoImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 40,
  },
});
