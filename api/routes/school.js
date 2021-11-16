const router = require("express").Router();
const School = require("../models/School");
const Faculty = require("../models/Faculty");

// create School route:
router.post("/", async (req, res) => {
  try {
    // initialize new School
    //   get faculty by code sent
    const faculty = await Faculty.findOne({ faculty: req.params.code });

    const newSchool = new School({
      code: req.body.code,
      name: req.body.name,
      faculty: faculty._id,
    });

    //   save School:
    const savedSchool = await newSchool.save();

    //   success response:
    res.status(200).json(savedSchool);
  } catch (err) {
    // school create error response:
    res.status(500).send(err.message);
  }
});

// update School
router.put("/", async (req, res) => {
  try {
    //   find School and update
    const schoolToUpdate = await School.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );

    // update success response:
    res.status(200).json(schoolToUpdate);
  } catch (err) {
    // respond error
    res.status(500).json(err.message);
  }
});

// delete School
router.delete("/:id", async (req, res) => {
  try {
    //   get item by id and delete
    await School.findByIdAndDelete(req.params.id);

    // success response:
    res.status(200).json("School Deleted!");
  } catch (err) {
    // error response
    res.status(200).json(err.message);
  }
});

// get all schools
router.get("/all", async (req, res) => {
  try {
    const schools = await School.find();

    // send fetched schools
    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// getSingle School via code query
router.get("/", async (req, res) => {
  try {
    if (req.query) {
      const school = await School.findOne({ code: req.query.code });

      // success due to fetch
      res.status(200).json(school);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// getSingle Schoool via id parameter
router.get("/:id", async (req, res) => {
  try {
    const singleSchool = await School.findById(req.params.id);

    //   fetch success response
    res.status(200).json(singleSchool);
  } catch (err) {
    // error response
    res.status(500).json(err.message);
  }
});

module.exports = router;
