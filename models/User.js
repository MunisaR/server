import { connect, model, mongoose } from "mongoose";

const { Schema } = mongoose;
import moment from "moment/moment.js";

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://armeum:armeum@armeumdev.owmsjm0.mongodb.net/?retryWrites=true&w=majority/userManagement"
);

export const Users = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
    default: true,
  },
  loginTime: {
    type: String,
    require: true,
    default: "*****",
  },
  registerTime: {
    type: String,
    require: true,
    default: moment().format("LLL"),
  },
});

export const User = mongoose.model("User", Users);
