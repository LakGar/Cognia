import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import CareTeam from "../../components/cards/CareTeam";
import { useTheme } from "../../theme/ThemeContext";
import EmergencyContact from "../../components/profile/EmergencyContact";
import SupplementaryButtons from "../../components/home/SupplementaryButtons";
import HealthButtons from "../../components/profile/HealthButtons";
import PatientCard from "../../components/cards/PatientCard";
import { useDispatch, useSelector } from "react-redux";
import { getPatientById } from "../../redux/patientSlice";
import { getUserInfo } from "../../redux/authSlice";

const Profile = () => {
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
    <View style={{ backgroundColor: theme.backgroundColor }}>
      <ScrollView style={{ width: "100%" }}>
        <ProfileHeader />
        <PatientCard patientInfo={patientInfoRedux} />
        <HealthButtons patientInfo={patientInfoRedux} />
        <CareTeam patientInfo={patientInfoRedux} />
        <SupplementaryButtons />
        <EmergencyContact patientInfo={patientInfoRedux} />
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
