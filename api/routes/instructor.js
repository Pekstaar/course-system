const router = require("express").Router();
const Instructor = require("../models/Instructor");
const User = require("../models/User");

//get all instructors
router.get("/", async (req, res) => {
  // fetching instructors from database:
  try {
    const instructors = await Instructor.find()
      .populate("user")
      .populate("units");

    res.status(200).json(instructors);
  } catch (err) {
    res.status(500).send("Admin fetch Error: " + err.message);
  }
});

//get single instructors
router.get("/:id", async (req, res) => {
  // fetching instructors from database:
  try {
    const instructors = await Instructor.findById(req.params.id)
      .populate("units")
      .populate("user")
      .exec();

    res.status(200).json(instructors);
  } catch (err) {
    res.status(500).send("Admin fetch Error: " + err.message);
  }
});

// update instructor
router.put("/:id", async (req, res) => {
  if (req.params.id === req.body._id || req.body.sender === "admin") {
    try {
      const { user, ...others } = req.body;

      // fetch instructor to update
      const instructor = await Instructor.findById(req.params.id);
      // const user = await User.findById(student.user);
      // const user = await User.findById(
      // );

      try {
        //   update user model
        await User.findByIdAndUpdate(instructor.user._id, user, {
          new: true,
        });

        //   update instructor model
        await Instructor.findByIdAndUpdate(req.params.id, others, {
          new: true,
        });
      } catch (err) {
        res.status(500).json(err.message);
      }

      // await User.findByIdAndUpdate(instructor)

      const result = await Instructor.findById(req.params.id).populate("user");

      res.status(200).json(result);
    } catch (err) {
      res.status(500).send("Student update Error: " + err.message);
    }
  } else {
    res.status(401).send("You can only access your Account!");
  }
});

// delete instructor
router.delete("/", async (req, res) => {
  const deletedUser = await User.deleteOne({});
  const deletedStudent = await Instructor.deleteOne({});

  res.send({ deletedUser, deletedStudent });
});

module.exports = router;
