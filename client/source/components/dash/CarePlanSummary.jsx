import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";
import { ProgressBar } from "react-native-paper";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";

const CarePlanSummary = ({}) => {
  const { theme } = useTheme();
  const patientName = "James Patt";
  const startDate = "2024-08-01";
  const duration = 100;
  const doctorName = "Dr. Sarah Lee";
  const caregiverName = "Anna Johnson";
  const latestNote = "Patient showing improvement in cognitive function.";
  const noteDate = "2024-08-15";

  // Calculate progress as a percentage
  const now = moment();
  const start = moment(startDate);
  const end = start.clone().add(duration, "days");
  const totalDuration = end.diff(start, "days");
  const daysPassed = now.diff(start, "days");
  const progress = Math.min(daysPassed / totalDuration, 1);

  return (
    <View>
      <View style={[styles.header, { paddingHorizontal: 20 }]}>
        <Text
          style={[
            globalStyles.name,
            { flex: 1, textAlign: "left", color: theme.text },
          ]}
        >
          Dashboard
        </Text>

        <Entypo name="dots-three-vertical" size={24} color="grey" />
      </View>
      <Text
        style={{
          color: theme.text,
          fontWeight: "600",
          fontSize: 16,
          paddingHorizontal: 20,
        }}
      >
        Careplan Summary
      </Text>
      <View
        style={[
          styles.cardContainer,
          globalStyles.shadow,
          { backgroundColor: theme.cardBG },
        ]}
      >
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHBvcnRyYWl0fGVufDB8fHx8MTY5MjUyNTMyNg&ixlib=rb-1.2.1&q=80&w=400",
            }}
            style={styles.profileImage}
          />
          <View style={styles.headerTextContainer}>
            <Text style={[styles.patientName, { color: theme.text }]}>
              {patientName}
            </Text>
            <View style={styles.infoContainer}>
              <View style={styles.buttonContainer}>
                <Text style={[styles.infoText, { color: theme.text }]}>
                  Start Date:
                </Text>
                <View
                  style={[
                    styles.buttonWrapper,
                    { backgroundColor: theme.accent },
                  ]}
                >
                  <Text style={[styles.button, { color: theme.text }]}>
                    {start.format("MMM DD, YYYY")}
                  </Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={[styles.infoText, { color: theme.text }]}>
                  Duration:
                </Text>
                <View
                  style={[
                    styles.buttonWrapper,
                    { backgroundColor: theme.accent },
                  ]}
                >
                  <Text style={[styles.button, { color: theme.text }]}>
                    {duration} days
                  </Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={[styles.infoText, { color: theme.text }]}>
                  Days Remaining:
                </Text>
                <View
                  style={[
                    styles.buttonWrapper,
                    { backgroundColor: theme.accent },
                  ]}
                >
                  <Text style={[styles.button, { color: theme.text }]}>
                    {Math.max(totalDuration - daysPassed, 0)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.smallImagesContainer}>
          <View style={styles.smallImageWrapper}>
            <Image
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9jdG9yfGVufDB8fDB8fHww",
              }}
              style={styles.smallImage}
            />
            <Text style={[styles.smallImageText, { color: theme.accent }]}>
              {doctorName}
            </Text>
          </View>
          <View style={styles.smallImageWrapper}>
            <Image
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyZWdpdmVyfGVufDB8fDB8fHww",
              }}
              style={styles.smallImage}
            />
            <Text style={[styles.smallImageText, { color: theme.text }]}>
              {caregiverName}
            </Text>
          </View>
        </View>

        <View style={styles.noteContainer}>
          <Text style={[styles.noteTitle, { color: theme.text }]}>
            Latest Note:
          </Text>
          <Text style={[styles.noteText, { color: theme.text }]}>
            {latestNote}
          </Text>
          <Text style={[styles.noteDate, { color: theme.text }]}>
            {moment(noteDate).format("MMM DD, YYYY")}
          </Text>
        </View>

        <ProgressBar
          progress={progress}
          color={theme.primary}
          style={styles.progressBar}
        />
      </View>
    </View>
  );
};

export default CarePlanSummary;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 3,
    marginRight: 15,
  },
  headerTextContainer: {
    justifyContent: "center",
    flex: 1,
  },
  patientName: {
    fontSize: 20,
    fontWeight: "600",
  },
  infoContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
  },
  buttonWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  button: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  smallImagesContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 15,
    gap: 10,
  },
  smallImageWrapper: {
    alignItems: "center",
  },
  smallImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  smallImageText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
  },
  noteContainer: {
    marginBottom: 15,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noteText: {
    fontSize: 15,
    marginBottom: 3,
  },
  noteDate: {
    fontSize: 12,
    color: "grey",
    width: "100%",
    textAlign: "right",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
});
