import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { globalStyles } from "../../styles/globalStyles";
import HomeHeader from "../../components/home/HomeHeader";
import SectionSleepMood from "../../components/home/SectionSleepMood";
import DailySummary from "../../components/home/DailySummary";
import StepsNActivityTracker from "../../components/home/StepsNActivityTracker";
import SupplementaryButtons from "../../components/home/SupplementaryButtons";
import EmergencyButton from "../../components/home/EmergencyButton";
import { useTheme } from "../../theme/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/authSlice";

const PatientHome = () => {
  const { theme, isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userToken && !userInfo) {
      dispatch(getUserInfo(userToken));
    }
  }, [dispatch, userToken, userInfo]);

  console.log("userInfo: ", userInfo);
  return (
    <View
      style={[
        globalStyles.screenContainer,

        { paddingTop: 0, backgroundColor: theme.backgroundColor },
      ]}
    >
      <ScrollView style={{ width: "100%", flex: 1 }}>
        <HomeHeader />
        <DailySummary />
        <SectionSleepMood />
        <StepsNActivityTracker />
        <SupplementaryButtons />
      </ScrollView>
      <EmergencyButton />
    </View>
  );
};

export default PatientHome;

const styles = StyleSheet.create({});
