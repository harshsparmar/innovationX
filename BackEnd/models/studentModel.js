const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    max: 10,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    default: "",
    max: 10,
    min: 10,
  },
  password: {
    type: String,
    required: true,
    max: 10,
  },
  image: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  college: {
    type: String,
    default: "",
  },
  course: {
    type: String,
    default: "",
  },
  passYear: {
    type: String,
    default: "",
  },
  sem_year: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  connection: {
    type: Number,
    default: 0,
  },
  ratting: {
    type: Number,
    default: 0,
  },
  link: {
    website: {
      type: String,
      default: "",
    },
    linkdin: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
  },
  technology: {
    type: [String],
  },
  programming: {
    type: [String],
  },
  // Fields for password reset
  resetPasswordToken: {
    type: String,
    default: "",
  },
  resetPasswordExpires: {
    type: Date,
  },
});

module.exports = mongoose.model("Students", studentSchema);
