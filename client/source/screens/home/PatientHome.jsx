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

const PatientHome = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);
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
