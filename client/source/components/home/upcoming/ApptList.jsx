import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import NoData from "./NoData";
import ApptCard from "../../cards/ApptCard";

const ApptList = () => {
  const count = 1;
  const appointments = [
    {
      id: 1,
      title: "Doctor's Appointment",
      description: "Annual physical check-up",
      date: "2024-12-05",
      time: "10:00 AM",
      duration: "1 hour",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Dentist Appointment",
      description: "Teeth cleaning and check-up",
      date: "2024-12-06",
      time: "02:00 PM",
      duration: "1 hour",
      status: "completed",
    },
    {
      id: 3,
      title: "Therapist Session",
      description: "Weekly therapy session",
      date: "2024-12-07",
      time: "09:00 AM",
      duration: "1 hour",
      status: "missed",
    },
    {
      id: 4,
      title: "Meeting with Specialist",
      description: "Consultation with the neurologist",
      date: "2024-12-08",
      time: "03:00 PM",
      duration: "1.5 hours",
      status: "upcoming",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      {count === 0 ? (
        <NoData field="Appointment" nav="CreateAppt" />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginVertical: 0,
          }}
        >
          <FlatList
            data={appointments}
            renderItem={({ item }) => <ApptCard appointment={item} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default ApptList;

const styles = StyleSheet.create({});
