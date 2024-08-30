import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "../../theme/ThemeContext";
import CarePlanSummary from "../../components/dash/CarePlanSummary";
import PatientCard from "../../components/cards/PatientCard";
import { ScrollView } from "react-native-gesture-handler";
import TestScores from "../../components/dash/TestScores";
import StepsActivitiesTrend from "../../components/dash/StepsActivitiesTrend";
import QuizesReadingTrends from "../../components/dash/QuizesReadingTrends";
import CognitiveTests from "../../components/dash/CognitiveTests";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/authSlice";
import { getPatientById } from "../../redux/patientSlice";

const PatientDash = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const { userInfo, userToken } = useSelector((state) => state.auth);
  const patientInfoRedux = useSelector((state) => state.patient.currentPatient);

  useEffect(() => {
    if (userToken && !userInfo) {
      dispatch(getUserInfo(userToken));
    }
  }, [dispatch, userToken, userInfo]);

  useEffect(() => {
    if (userToken && userInfo?.patientInfo) {
      dispatch(
        getPatientById({ token: userToken, userId: userInfo.patientInfo })
      );
    }
  }, [dispatch, userToken, userInfo?.patientInfo]);
  return (
    <View style={{ backgroundColor: theme.backgroundColor, paddingTop: 60 }}>
      <ScrollView style={{ width: "100%" }}>
        <CarePlanSummary />
        <PatientCard patientInfo={patientInfoRedux} />
        <CognitiveTests patientInfo={patientInfoRedux} />
        <TestScores />
        <StepsActivitiesTrend />
        <QuizesReadingTrends />
      </ScrollView>
    </View>
  );
};

export default PatientDash;

const styles = StyleSheet.create({});
