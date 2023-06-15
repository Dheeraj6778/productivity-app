require("dotenv").config();
let db = require("./config/database");
let express = require("express");
let cors = require("cors");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let app = express();

//setup middleware
app.use(express.json());
app.use(cors());
const auth = require("./middleware/auth");
//connect to the database
db.connect();
//get the user schema and task schema
const { user } = require("./model/user");
const { Task } = require("./model/task");

//schedule a cron job to send email notifications

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});



cron.schedule("0 0 9 * * *", async () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  //now retrieve all the tasks that have deadline tomorrow
  const tasks = await Task.find({ deadline: tomorrow });
  let getEmail = async (username) => {
    let data = await user.findOne({ username });
    return data.email;
  };

  tasks.forEach(async (task) => {
    let email = await getEmail(task.username);
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Task Reminder",
      text: `You have a task with the title "${task.task}" due tomorrow.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error in sending the mail ,error");
      } else {
        console.log("email sent: ", info.response);
      }
    });
  });
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  //now writing the registration logic
  try {
    const { username, firstName, email, password } = req.body;
    if (!(email && password && firstName && username)) {
      //status 400 indicates bad request
      return res.status(400).send("All inputs are required");
    }
    //we are checking if already any user with the email provided exists or not
    const old = await user.findOne({ email });
    if (old) {
      //status 409 indicates conflict as already the email exists in the db
      console.log("user already exists");
      return res.status(409).send("User already exists");
    }
    //now encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);
    let userObj = await user.create({
      username,
      firstName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    //now generate the jwt token
    const token = jwt.sign(
      { user_id: userObj._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    //userObj.token = token;
    userObj = { ...userObj, token };
    //status 201 indicates creation of a resource
    res.status(201).json(userObj);
  } catch (err) {
    console.log("some error in sign up");
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  console.log("hit the login endpoint");
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("all inputs are required");
    }
    let userObj = await user.findOne({ email });
    const flag = await bcrypt.compare(password, userObj.password);
    if (userObj && flag === true) {
      //create the token
      console.log("inside the if");
      const token = jwt.sign(
        { user_id: userObj._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      //userObj.token = token;
      userObj = { ...userObj, token };
      return res.status(200).json(userObj);
    } else return res.status(400).send("invalid credentials");
  } catch (err) {
    console.log("error in sign in");
    console.log(err);
  }
});

//now we have to perform database operations
app.post("/addTask", async (req, res) => {
  //create a new entry and push it to the database
  console.log("inside the add task endpoint");
  console.log(req.body);
  const { username, type, deadline, task } = req.body;
  try {
    //check if the task already exists
    const old = await Task.findOne({ task });
    if (old) {
      return res
        .status(409)
        .send("task already exists...update it if you want");
    }
    //now create the task
    const taskObj = await Task.create({
      username,
      type,
      deadline,
      task,
    });
    res.status(201).json(taskObj);
  } catch (err) {
    console.log("error in pushing to the database");
  }
});

app.post("/getTasks", async (req, res) => {
  console.log("inside the get tasks endpoint");
  console.log(req.body);
  const { username } = req.body;
  try {
    const data = await Task.find({ username });
    return res.json(data);
  } catch (err) {
    console.log("error in fetching data from database");
  }
});

app.post("/deleteTask", async (req, res) => {
  const { task } = req.body;
  try {
    let resp = await Task.deleteOne({ task });
    if (resp.deletedCount === 1) {
      console.log("deleted successfully");
      return res.send("deleted the task");
    } else {
      console.log("task not found");
      return res.send("task not found");
    }
  } catch (err) {
    console.log("error in deleting the task ", err);
    return res.send("error in deleting the task");
  }
});

let port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
