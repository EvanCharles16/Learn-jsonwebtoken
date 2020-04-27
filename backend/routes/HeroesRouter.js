const express = require("express");
const router = express.Router();
const HeroesController = require("../controllers/HeroesController");

router.post("/post", HeroesController.create);
router.get("/get", HeroesController.getData);
router.get("/get/:heroesId", HeroesController.getDataById);
router.delete("/delete/:heroesId", HeroesController.deleteById);
router.put("/edit/:heroesId", HeroesController.editById);

module.exports = router;
