const router = require("express").Router();
const Student = require("../models/Student");
const User = require("../models/User");

//get all students
router.get("/", async (req, res) => {
  // fetching users from database:
  try {
    const students = await Student.find().populate("course").populate("user");

    res.status(200).send(students);
  } catch (err) {
    res.status(500).send("Students fetch Error: " + err.message);
  }
});

// update Student
router.put("/:id", async (req, res) => {
  if (req.params.id === req.body.id || req.body.sender === "admin") {
    try {
      const { user, ...others } = req.body;

      const student = await Student.findById(req.params.id);
      // const user = await User.findById(student.user);
      // const user = await User.findById(
      // );

      try {
        await User.findByIdAndUpdate(student.user, user, {
          new: true,
        });
        await Student.findByIdAndUpdate(req.params.id, others, { new: true });
      } catch (err) {
        res.status(500).json(err.message);
      }

      const result = await Student.findById(req.params.id).populate("user");

      res.status(200).json(result);
    } catch (err) {
      res.status(500).send("Student update Error: " + err.message);
    }
  } else {
    res.status(401).send("You can only access your Account!");
  }
});

// delete student
router.delete("/", async (req, res) => {
  const deletedUser = await User.deleteOne({});
  const deletedStudent = await Student.deleteOne({});

  res.send({ deletedUser, deletedStudent });
});

module.exports = router;
