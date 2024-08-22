import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { globalStyles } from "../../styles/globalStyles";
import LogoBig from "../../../assets/Logo-big.png";

const WelcomeScreens = () => {
  return (
    // <View style={globalStyles.screenContainer}>
    <View style={globalStyles.screenContainerCenter}>
      <Image
        source={LogoBig}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </View>
    // </View>
  );
};

export default WelcomeScreens;

const styles = StyleSheet.create({});
