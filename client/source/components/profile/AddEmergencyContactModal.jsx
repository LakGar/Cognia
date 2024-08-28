import React, { useState } from "react";
import { Modal, View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeContext";

const AddEmergencyContactModal = ({ isVisible, onClose, onSave }) => {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState(""); // Relationship state
  const [phone, setPhone] = useState(""); // Phone state

  const handleSave = () => {
    if (!name || !phone || !relationship) {
      alert("Name, Phone, and Relationship are required.");
      return;
    }

    const newContact = { name, email, relationship, phone };
    onSave(newContact);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: theme.cardBG }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>
            Add Emergency Contact
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Name"
            placeholderTextColor="grey"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Phone"
            placeholderTextColor="grey"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Relationship"
            placeholderTextColor="grey"
            value={relationship}
            onChangeText={setRelationship}
          />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Email"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddEmergencyContactModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "grey",
    marginBottom: 15,
    padding: 5,
    width: "100%",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
