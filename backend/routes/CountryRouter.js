const express = require("express");
const router = express.Router();
const countryController = require("../controllers/CountryController");

router.post("/post", countryController.create);
router.get("/get", countryController.getData);
router.get("/:userId", countryController.getDataById);
router.delete("/:userId", countryController.deleteById);

module.exports = router;
