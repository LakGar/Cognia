import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../styles/globalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, setAuthState } from "../../redux/authSlice";
import userServices from "../../services/userServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPaswordVissible, setIsPaswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    setLoading(true);
    try {
      // Call the login function
      const response = await userServices.login({ auth: email, password });
      const { token } = response;

      // Store token and update auth state
      await AsyncStorage.setItem("token", token);
      dispatch(setAuthState({ isAuthenticated: true, userToken: token }));

      // Fetch and set user info
      const result = await dispatch(getUserInfo(token)).unwrap();
      if (result) {
        navigation.navigate("Main", { screen: "Profile" }); // Navigate to the main screen
      } else {
        setError("Failed to fetch user info");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Invalid credentials");
      } else if (error.request) {
        setError("No response from server");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        globalStyles.screenContainer,
        {
          justifyContent: "space-between",
          gap: 35,
          paddingHorizontal: 20,
          backgroundColor: theme.backgroundColor,
        },
      ]}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-sharp" size={24} color={theme.accent} />
        <Text style={[styles.smallLogoText, { color: theme.accent }]}>
          COGNIA
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          width: "80%",
          fontWeight: "700",
          fontSize: 55,
          alignSelf: "left",
          color: theme.text,
        }}
      >
        Hey, Welcome Back
      </Text>
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <View
          style={[
            styles.inputContainer,
            { marginVertical: 5, backgroundColor: theme.cardBG },
          ]}
        >
          <Ionicons name="mail" size={24} color="grey" />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={"grey"}
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            { marginVertical: 5, backgroundColor: theme.cardBG },
          ]}
        >
          <Ionicons name="lock-closed-sharp" size={24} color="grey" />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Password"
            secureTextEntry={isPaswordVissible ? false : true}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={"grey"}
          />
          <TouchableOpacity
            onPress={() => setIsPaswordVisible(!isPaswordVissible)}
          >
            <Ionicons
              name={isPaswordVissible ? "eye-off-sharp" : "eye-sharp"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ width: "100%" }}>
          <Text
            style={[
              globalStyles.smallText,
              {
                color: theme.accent,
                width: "100%",
                textAlign: "right",
                marginTop: 10,
                marginBottom: 30,
                fontWeight: "500",
              },
            ]}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            globalStyles.button,
            {
              backgroundColor: theme.primary,
              flexDirection: "row",
              width: "100%",
              maxHeight: 40,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
          onPress={handleSubmit}
        >
          <Text style={[{}, styles.buttonText]}>Login</Text>
        </TouchableOpacity>
        {error ? (
          <Text
            style={[
              globalStyles.smallText,
              {
                color: "red",
                textAlign: "left",
                width: "100%",
                fontWeight: "500",
              },
            ]}
          >
            {error}
          </Text>
        ) : null}
        <Text
          style={[
            globalStyles.smallText,
            {
              color: "grey",
              marginVertical: 10,
            },
          ]}
        >
          or continue with
        </Text>
        <TouchableOpacity
          style={[
            globalStyles.button,
            {
              backgroundColor: theme.secondary,
              flexDirection: "row",
              width: "100%",
              maxHeight: 40,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            },
          ]}
        >
          <Ionicons name="logo-google" size={24} color="#fff" />
          <Text style={[globalStyles.buttonTextSecondary, styles.buttonText]}>
            Google
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            gap: 3,
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <Text
            style={[
              {
                color: "grey",
              },
            ]}
          >
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={[
                globalStyles.smallText,
                {
                  color: theme.accent,
                },
              ]}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  smallLogoText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    fontWeight: "800",
    width: "100%",
    textAlign: "left",
  },
  inputContainer: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 1,
    flexDirection: "row",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
