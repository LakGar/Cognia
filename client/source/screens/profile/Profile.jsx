import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import CareTeam from "../../components/cards/CareTeam";
import { useTheme } from "../../theme/ThemeContext";
import EmergencyContact from "../../components/profile/EmergencyContact";
import SupplementaryButtons from "../../components/home/SupplementaryButtons";
import HealthButtons from "../../components/profile/HealthButtons";
import PatientCard from "../../components/cards/PatientCard";

const Profile = () => {
  const { theme } = useTheme();
  return (
    <View style={{ backgroundColor: theme.backgroundColor }}>
      <ScrollView style={{ width: "100%" }}>
        <ProfileHeader />
        <PatientCard />
        <HealthButtons />
        <CareTeam />
        <SupplementaryButtons />
        <EmergencyContact />
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
