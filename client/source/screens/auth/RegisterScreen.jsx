import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { globalStyles } from "../../styles/globalStyles";
import { useTheme } from "../../theme/ThemeContext";
import RenderButtons from "../../components/RenderButtons";
import { userService } from "../../services/userServices"; // Adjust the import path as needed
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Doctor");
  const [isPaswordVissible, setIsPaswordVisible] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters long and include at least one number"
      );
      return;
    }

    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        userType: role,
      };
      const response = await userService.register(userData);
      console.log("User registered successfully:", response);
      navigation.navigate("Login"); // Navigate to the login screen after successful registration

      // Clear form and errors after successful registration
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setRole("Doctor");
      setError("");

      Alert.alert("Success", "User registered successfully");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Email is already taken");
      } else {
        setError("An error occurred. Please try again later.");
      }
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
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
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
        Let's get started
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
        <View style={{ flexDirection: "row", gap: 15 }}>
          <View
            style={[
              styles.inputContainer,
              { marginVertical: 5, backgroundColor: theme.cardBG },
            ]}
          >
            <Ionicons name="person-circle" size={24} color="grey" />
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="First Name"
              autoCapitalize="words"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor={theme.subText}
            />
          </View>
          <View
            style={[
              styles.inputContainer,
              { marginVertical: 5, backgroundColor: theme.cardBG },
            ]}
          >
            <Ionicons name="person-circle" size={24} color="grey" />
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Last Name"
              autoCapitalize="words"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor={theme.subText}
            />
          </View>
        </View>
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
            placeholderTextColor={theme.subText}
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
            placeholderTextColor={theme.subText}
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 20,
            gap: 10,
          }}
        >
          <RenderButtons
            item="Doctor"
            selectedItem={role}
            setSelectedItem={setRole}
            styles={globalStyles}
          />
          <RenderButtons
            item="Patient"
            selectedItem={role}
            setSelectedItem={setRole}
            styles={globalStyles}
          />
          <RenderButtons
            item="Caregiver"
            selectedItem={role}
            setSelectedItem={setRole}
            styles={globalStyles}
          />
          <RenderButtons
            item="Family"
            selectedItem={role}
            setSelectedItem={setRole}
            styles={globalStyles}
          />
        </View>
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
          <Text style={[{}, styles.buttonText]}>Register</Text>
        </TouchableOpacity>
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
            Already have an account?{" "}
          </Text>
          <TouchableOpacity>
            <Text
              style={[
                globalStyles.smallText,
                {
                  color: theme.accent,
                },
              ]}
            >
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  smallLogoText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    fontWeight: "800",
    width: "100%",
    textAlign: "left",
  },
  inputContainer: {
    flex: 1,
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
    maxHeight: 50,
    height: 50,
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
