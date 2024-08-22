const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, unique: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ["male", "female", "other"] },
  bio: String,
  occupation: String,
  userType: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Caregiver", "Doctor", "Family"],
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  privacySettings: {
    profileVisibility: {
      type: String,
      enum: ["public", "private", "custom"],
    },
    dataSharingPermissions: [{ type: String }],
  },
  loginStreak: {
    count: { type: Number, default: 0 },
    lastLogin: { type: Date, default: null },
  },
  profilePicture: {
    type: String,
    default:
      "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg",
  },
  activityLog: [
    {
      activityType: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  patientInfo: { type: Schema.Types.ObjectId, ref: "Patient" },
  caregiverInfo: { type: Schema.Types.ObjectId, ref: "Caregiver" },
  doctorInfo: { type: Schema.Types.ObjectId, ref: "Doctor" },
  familyInfo: { type: Schema.Types.ObjectId, ref: "Family" },
  careTeam: [{ type: Schema.Types.ObjectId, ref: "User", label: String }],
  task: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  appointment: [{ type: Schema.Types.ObjectId, ref: "Appointment" }], // Corrected field name
  carePlan: [{ type: Schema.Types.ObjectId, ref: "CarePlan" }],
  notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

// Pre-save middleware to update the updatedAt field
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
