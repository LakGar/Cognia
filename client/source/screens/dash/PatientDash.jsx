import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeContext";
import CarePlanSummary from "../../components/dash/CarePlanSummary";
import PatientCard from "../../components/cards/PatientCard";
import { ScrollView } from "react-native-gesture-handler";
import TestScores from "../../components/dash/TestScores";
import StepsActivitiesTrend from "../../components/dash/StepsActivitiesTrend";
import QuizesReadingTrends from "../../components/dash/QuizesReadingTrends";
import CognitiveTests from "../../components/dash/CognitiveTests";

const PatientDash = () => {
  const { theme } = useTheme();
  return (
    <View style={{ backgroundColor: theme.backgroundColor, paddingTop: 60 }}>
      <ScrollView style={{ width: "100%" }}>
        <CarePlanSummary />
        <PatientCard />
        <CognitiveTests />
        <TestScores />
        <StepsActivitiesTrend />
        <QuizesReadingTrends />
      </ScrollView>
    </View>
  );
};

export default PatientDash;

const styles = StyleSheet.create({});
