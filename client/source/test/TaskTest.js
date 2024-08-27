// import React, { useEffect, useState } from "react";
// import { View, Text, Button, FlatList, Modal, TextInput } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchTasks,
//   createTask,
//   updateTask,
//   deleteTask,
// } from "../redux/taskSlice";

// const TaskTest = () => {
//   const dispatch = useDispatch();
//   const tasks = useSelector((state) => state.task.tasks);
//   const loading = useSelector((state) => state.task?.loading);
//   const { userToken } = useSelector((state) => state.auth);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);
//   const [taskName, setTaskName] = useState("");
//   const [description, setDescription] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [dueTime, setDueTime] = useState("");
//   const [priority, setPriority] = useState("medium");

//   const assignedId = "66c8baeb638b783bfa462f17"; // Hardcoded ID for assignedTo and assignedBy

//   useEffect(() => {
//     if (userToken) {
//       dispatch(fetchTasks(userToken));
//       console.log("Tasks: " + tasks);
//     }
//   }, [dispatch, userToken]);

//   const handleCreateOrUpdateTask = () => {
//     const taskData = {
//       taskName,
//       description,
//       dueDate: "2024-08-01",
//       dueTime: "12:34",
//       priority,
//       assignedTo: assignedId,
//       assignedBy: assignedId,
//       status: "due",
//       type: "personal",
//       durations: 60,
//     };

//     if (currentTask) {
//       dispatch(
//         updateTask({
//           token: userToken,
//           taskId: currentTask._id,
//           taskData,
//         })
//       );
//     } else {
//       dispatch(
//         createTask({
//           token: userToken,
//           taskData,
//         })
//       );
//     }
//     setModalVisible(false);
//   };

//   const handleDeleteTask = (taskId) => {
//     dispatch(deleteTask({ token: userToken, taskId }));
//   };

//   const openModal = (task) => {
//     if (task) {
//       setCurrentTask(task);
//       setTaskName(task.taskName);
//       setDescription(task.description);
//       setDueDate(task.dueDate);
//       setDueTime(task.dueTime);
//       setPriority(task.priority);
//     } else {
//       setCurrentTask(null);
//       setTaskName("");
//       setDescription("");
//       setDueDate("");
//       setDueTime("");
//       setPriority("medium");
//     }
//     setModalVisible(true);
//   };

//   return (
//     <View style={{ padding: 20, paddingTop: 60 }}>
//       <Button title="Create New Task" onPress={() => openModal(null)} />
//       {loading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <FlatList
//           data={tasks}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <View
//               style={{
//                 padding: 10,
//                 borderBottomWidth: 1,
//                 borderBottomColor: "#ccc",
//               }}
//             >
//               <Text>{item.taskName}</Text>
//               <Text>{item.description}</Text>
//               <View style={{ flexDirection: "row", marginTop: 10 }}>
//                 <Button title="Edit" onPress={() => openModal(item)} />
//                 <Button
//                   title="Delete"
//                   onPress={() => handleDeleteTask(item._id)}
//                   color="red"
//                 />
//               </View>
//             </View>
//           )}
//         />
//       )}

//       <Modal visible={modalVisible} animationType="slide">
//         <View style={{ padding: 20, paddingTop: 60 }}>
//           <TextInput
//             placeholder="Task Name"
//             value={taskName}
//             onChangeText={setTaskName}
//             style={{ borderBottomWidth: 1, marginBottom: 10 }}
//           />
//           <TextInput
//             placeholder="Description"
//             value={description}
//             onChangeText={setDescription}
//             style={{ borderBottomWidth: 1, marginBottom: 10 }}
//           />
//           <TextInput
//             placeholder="Due Date (YYYY-MM-DD)"
//             value={dueDate}
//             onChangeText={setDueDate}
//             style={{ borderBottomWidth: 1, marginBottom: 10 }}
//           />
//           <TextInput
//             placeholder="Due Time (HH:MM)"
//             value={dueTime}
//             onChangeText={setDueTime}
//             style={{ borderBottomWidth: 1, marginBottom: 10 }}
//           />
//           <TextInput
//             placeholder="Priority (low, medium, high)"
//             value={priority}
//             onChangeText={setPriority}
//             style={{ borderBottomWidth: 1, marginBottom: 10 }}
//           />
//           <Button
//             title={currentTask ? "Update Task" : "Create Task"}
//             onPress={handleCreateOrUpdateTask}
//           />
//           <Button title="Cancel" onPress={() => setModalVisible(false)} />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default TaskTest;
