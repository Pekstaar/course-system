const router = require("express").Router();
const Admin = require("../models/Admin");
const User = require("../models/User");

//get all admins
router.get("/", async (req, res) => {
  // fetching admins from database:
  try {
    const { password, ...others } = await Admin.find().populate("user");

    res.status(200).json(others);
  } catch (err) {
    res.status(500).send("Admin fetch Error: " + err.message);
  }
});

// update admin
router.put("/:id", async (req, res) => {
  if (req.params.id === req.body.id) {
    try {
      const { user, ...others } = req.body;

      const admin = await Admin.findById(req.params.id);
      // const user = await User.findById(student.user);
      // const user = await User.findById(
      // );

      try {
        //   update user model
        await User.findByIdAndUpdate(admin.user, user, {
          new: true,
        });

        //   update admin model
        await Admin.findByIdAndUpdate(req.params.id, others, { new: true });
      } catch (err) {
        res.status(500).json(err.message);
      }

      const result = await Admin.findById(req.params.id).populate("user");

      res.status(200).json(result);
    } catch (err) {
      res.status(500).send("Student update Error: " + err.message);
    }
  } else {
    res.status(401).send("You can only access your Account!");
  }
});

// delete admin
router.delete("/", async (req, res) => {
  const deletedUser = await User.deleteOne({});
  const deletedStudent = await Admin.deleteOne({});

  res.send({ deletedUser, deletedStudent });
});

module.exports = router;
