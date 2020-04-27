const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/register", userController.create);
router.post("/login", userController.authenticated);
router.get("/get", userController.getData);
router.get("/:userId", userController.getDataById);
router.delete("/:userId", userController.deleteById);
router.put("/edit/:userId", userController.editById);

module.exports = router;
