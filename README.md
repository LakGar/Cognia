# Cognia

Cognia is a comprehensive senior care application designed to assist caregivers, family members, and healthcare professionals in managing the health and well-being of elderly patients. The app provides a range of features, including health monitoring, emergency contact management, cognitive assessments, task management, and secure communication—all within a user-friendly interface.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Task Management System](#task-management-system)
- [Emergency Contacts](#emergency-contacts)
- [Health Monitoring](#health-monitoring)
- [Cognitive Assessments](#cognitive-assessments)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Patient Management**: Track and manage patient information, including medical history, medications, surgeries, and chronic conditions.
- **Health Monitoring**: Record and review cognitive scores, physical and mental health metrics, sleep quality, and more.
- **Emergency Contacts**: Easily manage and access emergency contact information for patients.
- **Task Management**: Create, assign, and update tasks for patients, caregivers, and doctors.
- **Care Team Collaboration**: Coordinate care between doctors, caregivers, and family members with role-based access to patient data.
- **Customizable Alerts**: Set up notifications for important health metrics and reminders for caregivers.
- **Secure Communication**: In-app messaging and notifications to keep all parties informed and connected.
- **Integration with Health APIs**: Sync health data with Apple HealthKit and Android Health.
- **Secure Authentication**: JWT-based authentication for secure access to the app's features.
- **User-friendly Interface**: Designed with simplicity and accessibility in mind, especially for older adults and those with memory challenges.

## Technologies Used

- **Frontend**: React Native, Expo, Redux
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **APIs**: Integration with Apple HealthKit and Android Health for health data tracking
- **Task Management**: Custom-built system for creating, assigning, and tracking tasks

## Usage

1. **Sign Up / Login**: Create an account or log in using your credentials.
2. **Add a Patient**: Input patient details including medical history, medications, and emergency contacts.
3. **Monitor Health**: Track cognitive and physical health metrics.
4. **Manage Tasks**: Create and assign tasks to the care team, monitor task progress, and update task statuses.
5. **Emergency Contacts**: Manage and call emergency contacts directly from the app.
6. **Care Team**: Collaborate with doctors and caregivers by sharing patient information.

## Task Management System

Cognia's task management system allows users to create, assign, and track tasks related to patient care. This feature includes:

- **Task Creation**: Users can create tasks with details such as description, due date, and priority.
- **Task Assignment**: Assign tasks to specific members of the care team (caregivers, doctors, or family members).
- **Task Updates**: Update task status, edit task details, or delete tasks as needed.
- **Task Notifications**: Receive notifications for new tasks, task updates, and task deadlines.

## Emergency Contacts

Cognia provides a seamless way to manage emergency contacts:

- **Add Emergency Contacts**: Easily add emergency contact details, including name, phone number, relationship, and profile picture.
- **Update Emergency Contacts**: Modify existing emergency contact information as needed.
- **Quick Access**: Directly call or message emergency contacts from within the app.

## Health Monitoring

Health monitoring features include:

- **Cognitive Scores**: Track scores for cognitive assessments such as MMSE and MoCA.
- **Physical & Mental Health**: Monitor depression levels, activities of daily living (ADL), and instrumental activities of daily living (IADL).
- **Health Metrics**: Track gait speed, sleep quality, and physical activity levels.

## Cognitive Assessments

Cognia supports multiple cognitive assessments:

- **MMSE**: Mini-Mental State Examination to assess cognitive function.
- **MoCA**: Montreal Cognitive Assessment for detecting mild cognitive impairment.
- **Depression**: Track depression levels using standardized metrics.
- **ADLs and IADLs**: Monitor the patient's ability to perform activities of daily living.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user and return a JWT

### Patients

- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create a new patient
- `GET /api/patients/:id` - Get patient details by ID
- `PUT /api/patients/:id` - Update patient details
- `DELETE /api/patients/:id` - Delete a patient

### Tasks

- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task details by ID
- `PUT /api/tasks/:id` - Update task details
- `DELETE /api/tasks/:id` - Delete a task

### Emergency Contacts

- `POST /api/patients/:id/emergency-contacts` - Add an emergency contact for a patient
- `PUT /api/patients/:id/emergency-contacts/:contactId` - Update an emergency contact
- `DELETE /api/patients/:id/emergency-contacts/:contactId` - Delete an emergency contact

### Health Metrics

- `POST /api/patients/:id/tests` - Add a health test score
- `GET /api/patients/:id/tests` - Get all health tests for a patient

## Contributing

We welcome contributions to Cognia! Please fork the repository and submit a pull request with your changes. Ensure your code follows the project's style guidelines and is well-documented.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
