import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { globalStyles } from "../../../styles/globalStyles";
import { useTheme } from "../../../theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/authSlice";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { userInfo, userToken } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(userInfo.profilePicture);

  const [firstName, setFirstName] = useState(userInfo.firstName || "");
  const [lastName, setLastName] = useState(userInfo.lastName || "");
  const [username, setUsername] = useState(userInfo.username || "");
  const [bio, setBio] = useState(userInfo.bio || "");
  const [gender, setGender] = useState(userInfo.gender || "Male");
  const [occupation, setOccupation] = useState(userInfo.occupation || "");
  const [address, setAddress] = useState(userInfo.address || {});
  const [privacySettings, setPrivacySettings] = useState(
    userInfo.privacySettings || {}
  );

  useEffect(() => {
    getPermissionAsync();
  }, []);

  async function getPermissionAsync() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  const handleChoosePhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.cancelled) {
        console.log("User cancelled image picker");
      } else if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setProfileImage(uri);
        console.log("Selected Image URI:", uri);
      } else {
        console.log("No assets found or array is empty");
      }
    } catch (error) {
      console.error("ImagePicker Error: ", error);
    }
  };

  const handleUpdate = () => {
    dispatch(
      updateUser({
        token: userToken,
        username,
        firstName,
        lastName,
        bio,
        profilePicture: profileImage,
        occupation,
        address,
        privacySettings,
      })
    );
    navigation.navigate("Profile");
  };

  const handleAddressChange = (field, value) => {
    setAddress((prevAddress) => ({ ...prevAddress, [field]: value }));
  };

  const getImageSource = (picture) => {
    if (!picture) return null;
    return picture.startsWith("http") ? picture : { uri: picture };
  };

  return (
    <SafeAreaView
      style={
        ([globalStyles.screen],
        {
          width: "100%",
          height: "100%",
          backgroundColor: theme.backgroundColor,
        })
      }
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text
          style={[
            globalStyles.name,
            { flex: 1, textAlign: "left", color: theme.text },
          ]}
        >
          Edit profile
        </Text>
      </View>
      <ScrollView style={{ paddingVertical: 20 }}>
        <View style={styles.profileSection}>
          <Image
            source={getImageSource(profileImage)}
            style={styles.profileImage}
          />
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Text
              style={[
                styles.editPictureText,
                { color: theme.accent, marginTop: 5 },
              ]}
            >
              Edit picture
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View
            style={[
              styles.formRow,
              { borderBottomColor: isDarkMode ? "gray" : "lightgrey" },
            ]}
          >
            <Text style={[styles.label, { color: theme.text }]}>
              First name
            </Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First name"
              placeholderTextColor="grey"
            />
          </View>
          <View
            style={[
              styles.formRow,
              { borderBottomColor: isDarkMode ? "gray" : "lightgrey" },
            ]}
          >
            <Text style={[styles.label, { color: theme.text }]}>Last name</Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last name"
              placeholderTextColor="grey"
            />
          </View>

          <View
            style={[
              styles.formRow,
              { borderBottomColor: isDarkMode ? "gray" : "lightgrey" },
            ]}
          >
            <Text style={[styles.label, { color: theme.text }]}>Username</Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              placeholderTextColor="grey"
            />
          </View>

          <View
            style={[
              styles.formRow,
              { borderBottomColor: isDarkMode ? "gray" : "lightgrey" },
            ]}
          >
            <Text style={[styles.label, { color: theme.text }]}>Gender</Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={gender}
              onChangeText={setGender}
              placeholder="Pronouns"
              placeholderTextColor="grey"
            />
          </View>

          <View
            style={[
              styles.formRow,
              { borderBottomColor: isDarkMode ? "gray" : "lightgrey" },
            ]}
          >
            <Text style={[styles.label, { color: theme.text }]}>Bio</Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={bio}
              onChangeText={setBio}
              placeholder="Bio"
              placeholderTextColor="grey"
            />
          </View>

          <View
            style={[
              styles.formRow,
              { borderBottomColor: isDarkMode ? "gray" : "lightgrey" },
            ]}
          >
            <Text style={[styles.label, { color: theme.text }]}>
              Occupation
            </Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={occupation}
              onChangeText={setOccupation}
              placeholder="Occupation"
              placeholderTextColor="grey"
            />
          </View>

          <View
            style={[
              styles.formRow,
              { borderBottomColor: isDarkMode ? "gray" : "lightgrey" },
            ]}
          >
            <Text style={[styles.label, { color: theme.text }]}>Street</Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={address.street || ""}
              onChangeText={(text) => handleAddressChange("street", text)}
              placeholder="Street"
              placeholderTextColor="grey"
            />
          </View>

          <View
            style={[
              styles.formRow,
              { borderBottomColor: isDarkMode ? "gray" : "lightgrey" },
            ]}
          >
            <Text style={[styles.label, { color: theme.text }]}>City</Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={address.city || ""}
              onChangeText={(text) => handleAddressChange("city", text)}
              placeholder="City"
              placeholderTextColor="grey"
            />
          </View>
          <View
            style={[
              styles.formRow,
              { borderBottomColor: isDarkMode ? "gray" : "lightgrey" },
            ]}
          >
            <Text style={[styles.label, { color: theme.text }]}>State</Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={address.state || ""}
              onChangeText={(text) => handleAddressChange("state", text)}
              placeholder="State"
              placeholderTextColor="grey"
            />
          </View>
          <View
            style={[
              styles.formRow,
              { borderBottomColor: isDarkMode ? "gray" : "lightgrey" },
            ]}
          >
            <Text style={[styles.label, { color: theme.text }]}>Zip</Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={address.zip || ""}
              onChangeText={(text) => handleAddressChange("zip", text)}
              placeholder="Zip"
              placeholderTextColor="grey"
            />
          </View>
          <View
            style={[
              styles.formRow,
              { borderBottomColor: isDarkMode ? "gray" : "lightgrey" },
            ]}
          >
            <Text style={[styles.label, { color: theme.text }]}>Country</Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={address.country || ""}
              onChangeText={(text) => handleAddressChange("country", text)}
              placeholder="Country"
              placeholderTextColor="grey"
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: 40,
          paddingHorizontal: 15,
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={[
            globalStyles.button,
            {
              height: 100,
              backgroundColor: theme.primary,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
          onPress={handleUpdate}
        >
          <Text
            style={[styles.buttonText, { color: "white", fontWeight: 500 }]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editPictureText: {
    color: "#3499fd",
  },
  form: {
    paddingHorizontal: 16,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 16,
    color: "black",
  },
  input: {
    fontSize: 16,
    color: "black",
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  linkText: {
    color: "#3499fd",
    padding: 16,
  },
});

export default EditProfile;
