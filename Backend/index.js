const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to db"))
  .catch(() => console.log("unsuccessful connection"));

app.use(express.json());
app.use(cors());


const AuthRoutes = require('./Routes/Auth');
app.use('/api/auth' , AuthRoutes);

const TaskRoutes = require('./Routes/To-dos');
app.use('/api/tasks' , TaskRoutes);

const User = require('./Routes/User');
app.use('/api/user' , User);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`systum is working on ${PORT}`);
});
