import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../styles/globalStyles";
import RenderButtons from "../RenderButtons";
import All from "./upcoming/All";
import TaskList from "./upcoming/TaskList";
import ApptList from "./upcoming/ApptList";
import ScheduleList from "./upcoming/ScheduleList";
import SearchUpcoming from "./upcoming/SearchUpcoming";
import { useTheme } from "../../theme/ThemeContext";

const Upcoming = () => {
  const [activeList, setActiveList] = useState("All"); // Default active list
  const [search, setSearch] = useState(false); // Flag to show search input
  const { theme, isDarkMode } = useTheme();
  const buttons = ["All", "Tasks", "Appt", "Schedule"];

  return (
    <View>
      <View style={styles.header}>
        <Text style={[globalStyles.smallText, { color: theme.text }]}>
          Upcoming
        </Text>
        <TouchableOpacity>
          <Text style={[globalStyles.smallText, { color: theme.accent }]}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        {buttons.map((item) => (
          <RenderButtons
            key={item}
            item={item}
            selectedItem={activeList}
            setSelectedItem={setActiveList}
            styles={globalStyles}
          />
        ))}
      </View>
      <View
        style={[
          styles.contentBox,
          globalStyles.shadow,
          { backgroundColor: theme.cardBG },
        ]}
      >
        {activeList === "All" ? (
          <All />
        ) : activeList === "Tasks" ? (
          <TaskList />
        ) : activeList === "Appt" ? (
          <ApptList />
        ) : activeList == "Schedule" ? (
          <ScheduleList />
        ) : search === true ? (
          <SearchUpcoming />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  contentBox: {
    width: "100%",
    // height: 130,
    marginVertical: 10,
    borderRadius: 12,
  },
});

export default Upcoming;
