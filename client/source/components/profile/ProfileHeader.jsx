import {
  Image,
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "../../theme/ThemeContext";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/authSlice"; // Import your action

const ProfileHeader = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userToken && !userInfo) {
      dispatch(getUserInfo(userToken));
    }
  }, [dispatch, userToken, userInfo]);

  useEffect(() => {
    if (userInfo) {
      const { firstName, lastName, Gender, Occupation, address } = userInfo;

      const hasMinimalInfo =
        address?.street === "" &&
        address.city === "" &&
        address.state === "" &&
        address.zip === "" &&
        address.country === "" &&
        phoneNumber === "" &&
        occupation === "";

      if (hasMinimalInfo) {
        navigation.navigate("EditProfile");
      }
    }
  }, [userInfo, navigation]);

  const toggleSwitch = () => {
    toggleTheme();
  };

  const profilePicture = userInfo?.profilePicture;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.cardAccent,
          paddingBottom: 20,
          borderRadius: 23,
          marginBottom: 10,
        },
        globalStyles.shadow,
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            globalStyles.name,
            { flex: 1, textAlign: "left", color: theme.text },
          ]}
        >
          Profile
        </Text>
        <View style={styles.toggleTheme}>
          <Switch
            trackColor={{ false: "grey", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="grey"
            onValueChange={toggleSwitch}
            value={isDarkMode}
          />
          {isDarkMode && (
            <FontAwesome5
              name={"moon"}
              size={13}
              color={"white"}
              style={{ position: "absolute", left: 7 }}
            />
          )}
          {!isDarkMode && (
            <FontAwesome5
              name={"sun"}
              size={13}
              color={"yellow"}
              style={{ position: "absolute", right: 7 }}
            />
          )}
        </View>
        <Entypo name="dots-three-vertical" size={24} color="grey" />
      </View>
      <View style={styles.body}>
        <View style={styles.left}>
          <Image
            source={{
              uri: profilePicture,
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.right}>
          <View>
            <Text style={[globalStyles.name, { color: theme.text }]}>
              {userInfo.firstName} {userInfo.lastName}
            </Text>
            <Text style={[globalStyles.username, { color: theme.accent }]}>
              {userInfo.email}
            </Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={[globalStyles.subTitle, { color: theme.text }]}>
                {userInfo.task.length}
              </Text>
              <Text style={[globalStyles.username]}>Tasks</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[globalStyles.subTitle, { color: theme.text }]}>
                {userInfo.task.length}
              </Text>
              <Text style={[globalStyles.username]}>Prescriptions</Text>
            </View>
          </View>
          <View style={styles.phonNumber}>
            <Text
              style={[styles.subTitle, { color: theme.text, fontSize: 16 }]}
            >
              +1(123) 456-7890
            </Text>
            <Text style={[globalStyles.username]}>Phone Number</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: theme.accent }]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>
            Share Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 10,
  },
  toggleTheme: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 70,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "grey",
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  left: {
    flex: 0.6,
  },
  right: {
    flex: 1,
    justifyContent: "space-between",
    gap: 4,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    gap: 20,
  },
  stat: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    gap: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 10,
    textAlign: "center",
  },
});
