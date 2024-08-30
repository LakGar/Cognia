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
import { fetchTasks } from "../../redux/taskSlice";
import { useNavigation } from "@react-navigation/native";
import { getPatientById } from "../../redux/patientSlice";

const PatientHome = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const patientInfoRedux = useSelector((state) => state.patient.currentPatient);

  const tasks = useSelector((state) => state.task.tasks);
  const loading = useSelector((state) => state.task?.loading);

  useEffect(() => {
    if (userToken && !userInfo) {
      dispatch(getUserInfo(userToken));
    }
    if (userToken && !tasks.length) {
      dispatch(fetchTasks(userToken));
    }
  }, [dispatch, userToken, userInfo, tasks.length]);

  console.log(`[PatientHome] userInfo: ${JSON.stringify(userInfo, null, 2)}`);

  useEffect(() => {
    if (userInfo && !userInfo.patientInfo) {
      navigation.navigate("AddPatientInfo");
    }
  });

  useEffect(() => {
    if (userToken && userInfo?.patientInfo) {
      dispatch(
        getPatientById({ token: userToken, userId: userInfo.patientInfo })
      );
    }
  }, [dispatch, userToken, userInfo?.patientInfo]);

  return (
    <View
      style={[
        globalStyles.screenContainer,
        { paddingTop: 0, backgroundColor: theme.backgroundColor },
      ]}
    >
      <ScrollView style={{ width: "100%", flex: 1 }}>
        {userInfo && (
          <HomeHeader
            firstName={userInfo.firstName}
            profilePicture={userInfo.profilePicture}
            tasks={tasks}
          />
        )}
        <DailySummary tasks={tasks} />
        <SectionSleepMood patientInfo={patientInfoRedux} />
        <StepsNActivityTracker patientInfo={patientInfoRedux} />
        <SupplementaryButtons />
      </ScrollView>
      <EmergencyButton />
    </View>
  );
};

export default PatientHome;

const styles = StyleSheet.create({});
