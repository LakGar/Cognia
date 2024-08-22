import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Animated } from "react-native";
import PatientHome from "../screens/home/PatientHome";
import PatientDash from "../screens/dash/PatientDash";
import Profile from "../screens/profile/Profile";
import Calender from "../screens/calender/Calender";
import { useTheme } from "../theme/ThemeContext";

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ name, color, size, focused }) => {
  return (
    <View
      style={[
        styles.iconContainer,
        focused && styles.iconContainerActive,
        { marginTop: 10 },
      ]}
    >
      <Icon name={name} color={color} size={size} />
    </View>
  );
};

const MainNavigator = () => {
  const userType = "PATIENT";
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Task":
              iconName = focused
                ? "checkmark-circle"
                : "checkmark-circle-outline";
              break;
            case "Dashboard":
              iconName = focused ? "grid" : "grid-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              break;
          }

          return (
            <TabBarIcon
              name={iconName}
              color={focused ? theme.primary : "grey"}
              size={focused ? 30 : 24}
              focused={focused}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#97ab64",
        tabBarStyle: {
          ...styles.tabBar,
          backgroundColor: theme.backgroundColor,
        },
        headerShown: false,
      })}
    >
      {userType === "CAREGIVER" ? (
        // Caregiver-specific tabs here
        <></>
      ) : userType === "Family" ? (
        // Family-specific tabs here
        <></>
      ) : userType === "Doctor" ? (
        // Doctor-specific tabs here
        <></>
      ) : (
        <>
          <Tab.Screen name="Home" component={PatientHome} />
          <Tab.Screen name="Task" component={Calender} />
          <Tab.Screen name="Dashboard" component={PatientDash} />
          <Tab.Screen name="Profile" component={Profile} />
        </>
      )}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingTop: 20,
    paddingTop: 0,
    borderTopWidth: 0,
    elevation: 5,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  iconContainerActive: {
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#145658",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default MainNavigator;
