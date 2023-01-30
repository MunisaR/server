import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { User } from "./models/User.js";
import moment from "moment";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

app.post("/create_user", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User(req.body);
    user.save((e) => console.log(e));
    res.json("user created");
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    let user = await User.find({
      email: req.body.email,
    });

    if (
      user[0].email === req.body.email &&
      user[0].password === req.body.password
    ) {
      if (user[0].status === true) {
        res.json(user[0]);
      } else if (user[0].status === false) {
        res.json(user[0]);
      }
    } else {
      res.json({ status: "login" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login_time", async function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return console.log(err);
    user.loginTime = moment().format("lll");
    user.save();
  });
});

app.post("/delete_all_users", async function (req, res) {
  res.json({ response: "user has been deleted successfully" });
  try {
    await User.deleteMany({});
  } catch (error) {
    console.log(error);
  }
});

app.post("/delete_user", async function (req, res) {
  res.json({ response: "user has been deleted successfully" });
  try {
    await User.remove({ _id: req.body.id });
  } catch (error) {
    console.log(error);
  }
});

app.post("/delete_selected_users", async function (req, res) {
  res.json({ response: "users have been deleted successfully" });
  try {
    await User.deleteMany({ _id: { $in: req.body.id } });
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", async function (req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

app.post("/block_user", async function (req, res) {
  try {
    const user = await User.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: { status: !req.body.status },
      }
    );
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

const port = 5000;

app.listen(port, () => {
  console.log("server is running on port " + port);
});
