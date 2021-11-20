const router = require("express").Router();
const Student = require("../models/Student");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const Instructor = require("../models/Instructor");

// register User:student
router.post("/register/student", async (req, res) => {
  //   const { uid, name, email, password, role, status } = req.body;
  // encrypt password

  try {
    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      password: encPassword,
      role: req.body.role,
    });

    const user = await newUser.save();
    const newStudent = new Student({
      code: req.body.code,
      user,
      status: req.body.status,
      dob: req.body.dob,
      course: req.body.course,
    });

    // save new user:
    const student = await newStudent.save();

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
});

// login User
router.post("/login/student", async (req, res) => {
  try {
    const student = await Student.findOne({ ucode: req.body.ucode }).populate(
      "user"
    );

    !student && res.status(401).json("Wrong Credentials!");

    const valid = await bcrypt.compare(
      req.body.password,
      student.user.password
    );
    !valid && res.status(401).json("Wrong Credentials!");

    valid && res.status(200).json(student);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Admin:
// register Admin
router.post("/register/admin", async (req, res) => {
  //   const { uid, name, email, password, role, status } = req.body;
  // encrypt password

  try {
    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(req.body.password, salt);

    // load User model fields
    const newUser = new User({
      username: req.body.name,
      email: req.body.email,
      password: encPassword,
      role: req.body.role,
    });

    // save user to user model
    const user = await newUser.save();

    // load Admin fields
    const newAdmin = new Admin({
      code: req.body.code,
      user,
      status: req.body.status,
    });

    // save new Admin:
    const admin = await newAdmin.save();

    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
});

// login Admin:
router.post("/login/admin", async (req, res) => {
  try {
    // get current admin from database
    const admin = await Admin.findOne({ code: req.body.code }).populate("user");

    !admin && res.status(401).send("Wrong Credentials!");

    const valid = await bcrypt.compare(req.body.password, admin.user.password);
    !valid && res.status(401).send("Wrong Credentials!");

    valid && res.status(200).json(admin);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Instructor:
// register Instructor
router.post("/register/instructor", async (req, res) => {
  //   const { uid, name, email, password, role, status } = req.body;
  // encrypt password

  try {
    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(req.body.password, salt);

    // load User model fields
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      password: encPassword,
      role: req.body.role,
    });

    // save user to user model
    const user = await newUser.save();

    // load Instructor fields
    const newInstructor = new Instructor({
      code: req.body.code,
      user,
      status: req.body.status,
      units: req.body.units,
    });

    // save new instructor:
    const instructor = await newInstructor.save();

    res.status(200).json(instructor);
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
});

// login Admin:
router.post("/login/instructor", async (req, res) => {
  try {
    // get current admin from database
    const instructor = await Instructor.findOne({
      code: req.body.code,
    }).populate("user");

    !instructor && res.status(401).json("Wrong Credentials!");

    const valid = await bcrypt.compare(
      req.body.password,
      instructor.user.password
    );
    !valid && res.status(401).json("Wrong Credentials!");

    valid && res.status(200).json(instructor);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;
