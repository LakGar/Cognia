import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../theme/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

const HealthButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();

  const toggleCard = () => {
    setIsExpanded(!isExpanded);
  };

  const renderStat = (label, value) => (
    <View style={styles.statRow}>
      <Text
        style={[styles.scoreText, { color: theme.text, fontWeight: "400" }]}
      >
        {label}
      </Text>
      <View style={[styles.score, { backgroundColor: "lightgrey" }]}>
        <Text style={[styles.scoreText, { color: "black" }]}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontWeight: "600",
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          Health Tests
        </Text>
        <TouchableOpacity onPress={toggleCard}>
          <Icon
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>
      {isExpanded && (
        <>
          <View
            style={[
              styles.card,
              globalStyles.shadow,
              { backgroundColor: theme.cardBG },
            ]}
          >
            <Text style={[globalStyles.username, { color: theme.text }]}>
              Cognitive Scores
            </Text>
            {renderStat("MMSE:", "24/30")}
            {renderStat("MoCA:", "22/30")}
          </View>

          <View
            style={[
              styles.card,
              globalStyles.shadow,
              { backgroundColor: theme.cardBG },
            ]}
          >
            <Text style={[globalStyles.username, { color: theme.text }]}>
              Physical & Mental Health
            </Text>
            {renderStat("Depression:", "Moderate")}
            {renderStat("ADLs:", "5/6")}
            {renderStat("IADLs:", "6/8")}
          </View>

          <View
            style={[
              styles.card,
              globalStyles.shadow,
              { backgroundColor: theme.cardBG },
            ]}
          >
            <Text style={[globalStyles.username, { color: theme.text }]}>
              Health Metrics
            </Text>
            {renderStat("Gait Speed:", "0.8 m/s")}
            {renderStat("Sleep Quality:", "4/5")}
            {renderStat("Physical Activity:", "Moderate")}
          </View>
        </>
      )}
    </View>
  );
};

export default HealthButtons;

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    padding: 15,
    borderRadius: 3,
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
  },
  score: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
  },
  scoreText: {
    fontWeight: "600",
    fontSize: 15,
  },
});
