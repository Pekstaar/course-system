const router = require("express").Router();
const Course = require("../models/Course");
const School = require("../models/School");

// create course
router.post("/", async (req, res) => {
  try {
    const newCourse = new Course({
      code: req.body.code,
      name: req.body.name,
      school: req.body.school,
    });

    const s = await School.findById(req.body.school);

    //   save the created Course
    const course = await newCourse.save();
    s.courses.push(course._id);
    s.save();

    res.status(200).json(course);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// update course
router.put("/", async (req, res) => {
  try {
    //   find School and update
    const courseToUpdate = await Course.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );

    // update success response:
    res.status(200).json(courseToUpdate);
  } catch (err) {
    // respond error
    res.status(500).json(err.message);
  }
});

// delete course
router.delete("/:id", async (req, res) => {
  try {
    //   get item by id and delete
    await Course.findByIdAndDelete(req.params.id);

    // success response:
    res.status(200).json("Course Deleted!");
  } catch (err) {
    // error response
    res.status(200).json(err.message);
  }
});

// get all courses
router.get("/all", async (req, res) => {
  try {
    const courses = await Course.find().populate("school").populate("units");

    // send fetched schools
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// getSingle course via code query
router.get("/", async (req, res) => {
  try {
    if (req.query) {
      const course = await Course.findOne({ code: req.query.code })
        .populate("school")
        .populate("units");

      // success due to fetch
      res.status(200).json(course);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// getSingle Course via id parameter
router.get("/:id", async (req, res) => {
  try {
    const singleCourse = await Course.findById(req.params.id)
      .populate("units")
      .populate("school");

    //   fetch success response
    res.status(200).json(singleCourse);
  } catch (err) {
    // error response
    res.status(500).json(err.message);
  }
});

module.exports = router;
