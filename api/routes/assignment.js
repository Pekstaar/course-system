const router = require("express").Router();
const Assignment = require("../models/Assignment");
const Instructor = require("../models/Instructor");

// create Assignment
router.post("/", async (req, res) => {
  try {
    const newAssignment = new Assignment({
      topic: req.body.topic,
      description: req.body.description,
      unit: req.body.unit,
      instructor: req.body.instructor,
      deadline: req.body.deadline,
      attachments: req.body.attachments,
    });

    //   save the created unit
    const assignment = await newUnit.save();

    res.status(200).json(assignment);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// update unit
router.put("/", async (req, res) => {
  try {
    //   find assignment and update
    const assignmentToUpdate = await Assignment.findByIdAndUpdate(
      req.body.id,
      req.body,
      {
        new: true,
      }
    );

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
    const assignmetns = await Assignment.find()
      .populate("course")
      .populate("instructor")
      .exec();

    // send fetched units
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// getSingle assignment via code query
router.get("/", async (req, res) => {
  try {
    if (req.query) {
      const assignment = await Assignment.findOne({ code: req.query.code });

      // success due to fetch
      res.status(200).json(assignment);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// getSingle Unit via id parameter
router.get("/:id", async (req, res) => {
  try {
    const singleAssignment = await Unit.findById(req.params.id);

    //   fetch success response
    res.status(200).json(singleAssignment);
  } catch (err) {
    // error response
    res.status(500).json(err.message);
  }
});

module.exports = router;
