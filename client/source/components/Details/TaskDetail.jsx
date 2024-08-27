import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, deleteTask } from "../../redux/taskSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { globalStyles } from "../../styles/globalStyles";

const TaskDetail = ({ task }) => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);

  const [taskName, setTaskName] = useState(task.taskName);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(new Date(task.dueDate));
  const [dueTime, setDueTime] = useState(new Date(task.dueTime));
  const [duration, setDuration] = useState(task.durations);
  const [priority, setPriority] = useState(task.priority);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const status = task.status;

  const type = task.type;
  const backgroundColor =
    type === "appointment"
      ? "#D3E3FC"
      : type === "schedule"
      ? "#FDE2E4"
      : type === "personal"
      ? "#FFE5B4"
      : type === "medication"
      ? "#F7C6E0"
      : null;

  const titleColor =
    type === "appointment"
      ? "#1B4F72"
      : type === "schedule"
      ? "#C0392B"
      : type === "personal"
      ? "#E67E22"
      : type == "medication"
      ? "#A569BD"
      : null;

  const handleUpdateTask = () => {
    const updatedTaskData = {
      taskName,
      description,
      dueDate,
      dueTime,
      durations: duration,
      priority,
    };

    dispatch(
      updateTask({
        token: userToken,
        taskId: task._id,
        taskData: updatedTaskData,
      })
    ).then(() => {
      navigation.goBack();
    });
  };
  const handleChangeStatus = () => {
    const updatedTaskData = {
      taskName,
      description,
      dueDate,
      dueTime,
      durations: duration,
      priority,
      status: "completed",
    };

    dispatch(
      updateTask({
        token: userToken,
        taskId: task._id,
        taskData: updatedTaskData,
      })
    ).then(() => {
      navigation.goBack();
    });
  };

  const handleDeleteTask = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteTask({ token: userToken, taskId: task._id })).then(
              () => {
                navigation.goBack();
              }
            );
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const formatDate = (date) => {
    const options = {
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        paddingTop: 60,
        paddingHorizontal: 20,
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-down" size={26} color={titleColor} />
        </TouchableOpacity>
        <Text
          style={[
            globalStyles.name,
            { flex: 1, textAlign: "left", color: titleColor },
          ]}
        >
          Edit Task
        </Text>
        <TouchableOpacity onPress={handleChangeStatus}>
          <Text style={[globalStyles.detailsText, { fontSize: 19 }]}>
            COMPLETE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{ paddingLeft: 20 }]}
          onPress={handleDeleteTask}
        >
          <Icon name={"trash"} color={titleColor} size={24} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.4)",
          width: 120,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 23,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: titleColor,
            fontWeight: "600",
            textTransform: "uppercase",
            padding: 5,
            fontSize: 18,
          }}
        >
          {task.status}
        </Text>
      </View>
      <Text
        style={{
          color: titleColor,
          opacity: 0.6,
          fontWeight: "600",
          marginBottom: 20,
        }}
      >
        **Just tap any value to edit**
      </Text>

      <Text style={styles.label}>Due date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={[globalStyles.dateText, { fontSize: 20 }]}>
          {formatDate(dueDate)}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        date={dueDate}
        onConfirm={(date) => {
          setShowDatePicker(false);
          setDueDate(date);
        }}
        onCancel={() => setShowDatePicker(false)}
        textColor="black" // Explicitly set the text color
      />
      <Text style={styles.label}>Task name</Text>

      <TextInput
        style={[globalStyles.titleText, { color: titleColor, fontSize: 40 }]}
        placeholder="Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />
      <Text style={styles.label}>Task description</Text>

      <TextInput
        style={[
          globalStyles.subTitleText,
          { color: titleColor, opacity: 0.7, fontSize: 20 },
        ]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Due time and Duration</Text>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Icon name="time-outline" size={30} color="#888" />
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text style={[globalStyles.details, { color: "grey", fontSize: 20 }]}>
            {dueTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {"      "}| {"   "}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showTimePicker}
          mode="time"
          date={dueTime}
          onConfirm={(time) => {
            setShowTimePicker(false);
            setDueTime(time);
          }}
          onCancel={() => setShowTimePicker(false)}
          textColor="black" // Explicitly set the text color
        />

        <TextInput
          style={[globalStyles.details, { color: "grey", fontSize: 20 }]}
          placeholder="Duration (minutes)"
          keyboardType="numeric"
          value={duration.toString()}
          onChangeText={setDuration}
        />
        <Text style={[globalStyles.details, { color: "grey", fontSize: 20 }]}>
          Mins
        </Text>
      </View>
      <Text style={styles.label}>Priority</Text>

      <TextInput
        style={[
          globalStyles.subTitleText,
          { color: titleColor, opacity: 0.7, fontSize: 20 },
        ]}
        placeholder="low, medium, high"
        value={priority}
        onChangeText={setPriority}
      />
      <Text style={styles.label}>Team members</Text>

      <View style={[globalStyles.avatarContainer, { marginVertical: 20 }]}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/1.jpg",
          }}
          style={[
            globalStyles.personImage,
            { width: 80, height: 80, borderRadius: "50%" },
          ]}
        />
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/women/2.jpg",
          }}
          style={[
            globalStyles.personImage,
            { width: 80, height: 80, borderRadius: "50%" },
          ]}
        />
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/3.jpg",
          }}
          style={[
            globalStyles.personImage,
            { width: 80, height: 80, borderRadius: "50%" },
          ]}
        />
      </View>
      <TouchableOpacity
        style={[
          globalStyles.button,
          {
            backgroundColor: titleColor,
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
          },
        ]}
        onPress={handleUpdateTask}
      >
        <Text style={[globalStyles.titleText, { color: "white" }]}>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 40,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.6,
    marginTop: 20,
    marginBottom: 5,
  },
});
