import { StyleSheet, Text, View } from "react-native";
import store from "./source/redux/store";
import RootNavigator from "./source/navigation/RootNavigator";
import { Provider } from "react-redux";
import { ThemeProvider } from "./source/theme/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Here’s a detailed breakdown of what each of those pages should have in the Cognia app’s patient UI:

// 1. Home
// The Home page is the central hub where patients can see the most important and immediate information.

// Key Elements:

// Welcome Message: A friendly, personalized message like "Welcome back, [Patient Name]!" in large, easy-to-read text.
// Daily Schedule:
// Today’s Tasks: A list of tasks for the day, with visual indicators for completion (e.g., checkboxes, time slots).
// Upcoming Appointments: A concise list of any appointments or important events happening that day.
// Health Overview:
// Vital Signs Summary: A simplified view of their most recent vital signs, like heart rate, blood pressure, etc.
// Mood and Sleep Summary: A brief overview of mood and sleep data, possibly using icons (like smiley faces for mood and stars for sleep quality).
// Quick Access Buttons:
// Emergency Contact: A prominent button for quickly contacting a caregiver or emergency services.
// Request Help: A button that allows patients to notify their caregiver if they need assistance.
// Notifications: Alerts or messages from caregivers, doctors, or the app itself.
// Engagement Tools: Quick links to brain games, quizzes, or articles to keep patients engaged.

// 2. Explore
// The Explore page is designed for patients to discover new content and resources that could benefit them.

// Key Elements:

// Curated Articles and Videos:
// Display a selection of articles, videos, or other resources tailored to the patient’s interests and health conditions. These could include tips on managing dementia, general health advice, or stories from other patients.
// Brain Games and Quizzes:
// Offer a variety of cognitive games and quizzes to help keep the patient’s mind active.
// Track progress and encourage regular participation through simple rewards or badges.
// Search Functionality:
// A simple, intuitive search bar that allows patients to find specific content, whether it’s health-related articles, exercises, or entertainment.
// Categories:
// Organize content into easy-to-navigate categories (e.g., "Health Tips," "Memory Games," "Exercise Videos") so that patients can explore based on their current needs or interests.

// 3. Calendar
// The Calendar page provides a visual representation of the patient’s upcoming tasks, appointments, and important dates.

// Key Elements:

// Monthly View:
// A simple, high-contrast calendar view showing the current month with days marked for tasks and appointments.
// Tapping on a day should bring up a detailed view of what’s scheduled for that day.
// Daily and Weekly Views:
// Allow patients to toggle between day, week, and month views for more detailed scheduling.
// Include clear indicators of task completion status and upcoming events.
// Reminders:
// Notifications for upcoming appointments or tasks, with options for customizing reminder times.
// Add/Edit Appointments:
// Simple interface for adding or modifying tasks and appointments, possibly with the assistance of a caregiver if needed.
// Sync with Caregiver:
// If the patient has a caregiver, ensure the calendar can sync with the caregiver’s schedule for seamless coordination.

// 4. Dashboard
// The Dashboard provides an overview of the patient’s health and progress over time.

// Key Elements:

// Health Metrics:
// Display key health metrics like MMSE score, MoCA score, blood pressure, heart rate, and other vitals, presented in easy-to-understand charts or graphs.
// Show trends over time to help patients and caregivers track progress or identify concerns.
// Mood and Sleep Tracking:
// More detailed graphs or charts showing the patient’s mood and sleep patterns over weeks or months.
// Medication Adherence:
// A section tracking whether the patient is taking their prescribed medications on time.
// Activity Levels:
// If the patient’s physical activity is being monitored (e.g., steps, exercise), show trends and highlight days with higher or lower activity.
// Cognitive Function:
// If the patient engages with cognitive games or quizzes, provide feedback on their performance and progress.
// Reports:
// Allow patients (and their caregivers, if applicable) to generate simple reports of their health data, which can be shared with doctors.
// 5. Profile
// The Profile page allows patients to manage their personal information and app settings.

// Key Elements:

// Personal Information:
// Display basic information like name, age, gender, and contact details. Allow for easy updates to this information.
// Health Information:
// Overview of key health details like medical history, current medications, and allergies.
// Privacy and Security Settings:
// Options to manage who can access their data, including caregivers, family members, and doctors.
// Security settings for managing login credentials, password changes, and two-factor authentication if necessary.
// Notification Settings:
// Allow patients to customize how and when they receive notifications (e.g., reminders, alerts).
// Accessibility Options:
// Settings to adjust text size, color contrast, enable voice commands, or use screen readers.
// Connected Devices:
// Display and manage any devices connected to the app (e.g., fitness trackers, blood pressure monitors).
// Help and Support:
// Links to support resources, including a FAQ section, contact information for customer service, and troubleshooting guides.
