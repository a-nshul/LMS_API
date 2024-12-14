const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,UserbyId
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get( allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/:id", UserbyId)
module.exports = router;