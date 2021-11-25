router = require("express").Router();
const Unit = require("../models/Unit");
const Course = require("../models/Course");
const Student = require("../models/Student");

// create Unit
router.post("/", async (req, res) => {
  try {
    // fetch course selected
    const course = await Course.findById(req.body.course);

    const newUnit = new Unit({
      code: req.body.code,
      name: req.body.name,
      course: req.body.course,
      instructor: req.body.instructor,
    });

    //   save the created unit
    const unit = await newUnit.save();
    course.units.push(unit._id);
    course.save();

    res.status(200).json(unit);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// update unit
router.put("/", async (req, res) => {
  try {
    //   find School and update
    const unitToUpdate = await Unit.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });

    // update success response:
    res.status(200).json(unitToUpdate);
  } catch (err) {
    // respond error
    res.status(500).json(err.message);
  }
});

// delete unit
router.delete("/:id", async (req, res) => {
  try {
    //   get item by id and delete
    await Unit.findByIdAndDelete(req.params.id);

    // success response:
    res.status(200).json("Unit Deleted!");
  } catch (err) {
    // error response
    res.status(200).json(err.message);
  }
});

// get all units
router.get("/all", async (req, res) => {
  try {
    const units = await Unit.find()
      .populate("course")
      .populate("instructor")
      .exec();

    // send fetched units
    res.status(200).json(units);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get some units
router.get("/some", async (req, res) => {
  try {
    const students = await Student.find({
      unit: {
        $in: req.body.units,
      },
    })
      .populate("course")
      .populate("user");

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// getSingle unit via code query
router.get("/", async (req, res) => {
  try {
    if (req.query) {
      const unit = await Unit.findOne({ code: req.query.code });

      // success due to fetch
      res.status(200).json(unit);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// getSingle Unit via id parameter
router.get("/:id", async (req, res) => {
  try {
    const singleUnit = await Unit.findById(req.params.id);

    //   fetch success response
    res.status(200).json(singleUnit);
  } catch (err) {
    // error response
    res.status(500).json(err.message);
  }
});

router.get("/", async (req, res) => {
  if (req.query.units) {
    const units = await Unit.find({
      _id: {
        $in: req.query.units,
      },
    });

    console.log(units);
  }
});

module.exports = router;
