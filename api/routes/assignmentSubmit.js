const router = require("express").Router();
const AssignmentSubmit = require("../models/AssignmentSubmits");
const Instructor = require("../models/Instructor");
const Course = require("../models/Course");

// create Assignmentsubmit
router.post("/", async (req, res) => {
  try {
    const newSubmit = new AssignmentSubmit({
      sender: req.body.sender,
      grade: req.body.grade,
      assignment: req.body.assignment,
      attachment: req.body.attachment,
    });
    //   save the created unit
    const submit = await newSubmit.save();

    res.status(200).json(submit);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// update unit
router.put("/", async (req, res) => {
  try {
    //   find assignment and update
    const assignmentToUpdate = await AssignmentSubmit.findByIdAndUpdate(
      req.body.id,
      req.body,
      {
        new: true,
      }
    )
      .populate("assignment")
      .populate("sender")
      .exec();

    // update success response:
    res.status(200).json(assignmentToUpdate);
  } catch (err) {
    // respond error
    res.status(500).json(err.message);
  }
});

// delete assignment
router.delete("/:id", async (req, res) => {
  try {
    //   get item by id and delete
    await Assignment.findByIdAndDelete(req.params.id);

    // success response:
    res.status(200).json("Assignment Deleted!");
  } catch (err) {
    // error response
    res.status(200).json(err.message);
  }
});

// get all assignments
router.get("/all", async (req, res) => {
  try {
    const assignments = await AssignmentSubmit.find()
      .populate("assignment")
      .populate("sender")
      .exec();

    // send fetched units
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const assignments = await AssignmentSubmit.find({
      sender: req.params.id,
    })
      .populate("assignment")
      .populate("sender")
      .exec();

    // send fetched units
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get assignment based on course query
router.get("/", async (req, res) => {
  try {
    if (req.query.course) {
      const course = await Course.findById(req.query.course);

      const assignments = await Assignment.find({
        unit: {
          $in: course.units,
        },
      })
        .populate("unit")
        .populate("instructor")
        .exec();

      // const assignments = await Assignment.find({ course: req.query.course })
      //   .populate("unit")
      //   .populate("instructor")
      //   .exec();
      res.status(200).json(assignments);
    }

    // // send fetched units
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// getSingle assignment via code query
router.get("/", async (req, res) => {
  try {
    if (req.query) {
      const assignment = await AssignmentSubmit.findOne({
        code: req.query.code,
      });

      // success due to fetch
      res.status(200).json(assignment);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// getSingle Assignment via id parameter
router.get("/:id", async (req, res) => {
  try {
    const singleAssignment = await AssignmentSubmit.findById(req.params.id)
      .populate("assignment")
      .populate("sender")
      .exec();

    //   fetch success response
    res.status(200).json(singleAssignment);
  } catch (err) {
    // error response
    res.status(500).json(err.message);
  }
});

module.exports = router;
