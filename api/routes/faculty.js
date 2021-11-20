const router = require("express").Router();
const Faculty = require("../models/Faculty");

// create faculty route:
router.post("/", async (req, res) => {
  try {
    // initialize new Faculty
    const newFaculty = new Faculty({
      code: req.body.code,
      name: req.body.name,
    });

    //   save faculty:
    const savedFaculty = await newFaculty.save();

    //   success response:
    res.status(200).json(savedFaculty);
  } catch (err) {
    // faculty create error response:
    res.status(500).send(err.message);
  }
});

// update faculty
router.put("/", async (req, res) => {
  try {
    //   find faculty and update
    const facultyToUpdate = await Faculty.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );

    // update success response:
    res.status(200).json(facultyToUpdate);
  } catch (err) {
    // respond error
    res.status(500).json(err.message);
  }
});

// delete Faculty
router.delete("/:id", async (req, res) => {
  try {
    //   get item by id and delete
    await Faculty.findByIdAndDelete(req.params.id);

    // success response:
    res.status(200).json("faculty Deleted!");
  } catch (err) {
    // error response
    res.status(200).json(err.message);
  }
});

// get all faculties
router.get("/all", async (req, res) => {
  const faculties = await Faculty.find().populate("schools");

  // send fetched faculties
  res.status(200).json(faculties);
});

// getSingle Faculty via code query
router.get("/", async (req, res) => {
  if (req.query) {
    const faculty = await Faculty.findOne({ code: req.query.code });

    res.status(200).json(faculty);
  }
});

// getSingle Faculty via id parameter
router.get("/:id", async (req, res) => {
  try {
    const singleFaculty = await Faculty.findById(req.params.id);

    //   fetch success response
    res.status(200).json(singleFaculty);
  } catch (err) {
    // error response
    res.status(500).json(err.message);
  }
});

module.exports = router;
