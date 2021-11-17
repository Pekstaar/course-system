const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// routes:
const authRoute = require("./routes/auth");
const studentRoute = require("./routes/student");
const adminRoute = require("./routes/admin");
const instructorRoute = require("./routes/instructor");
const facultyRoute = require("./routes/faculty");
const courseRoute = require("./routes/course");
const schoolRoute = require("./routes/school");
const unitRoute = require("./routes/unit");

// configure .env
dotenv.config();
app.use(express.json());

// mongoose database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch(function (err) {
    console.error("Mongo db connection error: ", err.message);
  });

//   routing:
// user-based routing
app.use("/api/auth", authRoute);
app.use("/api/students", studentRoute);
app.use("/api/admin", adminRoute);
app.use("/api/instructor", instructorRoute);

// apartments routing:
app.use("/api/faculty", facultyRoute);
app.use("/api/course", courseRoute);
app.use("/api/school", schoolRoute);
app.use("/api/unit", unitRoute);

app.listen(3001);
