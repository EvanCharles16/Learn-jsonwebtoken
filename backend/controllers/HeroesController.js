const Heroes = require("../models/Heroes");

module.exports = {
  create: (req, res, next) => {
    Heroes.create(
      {
        images: req.body.images,
        name: req.body.name,
        born: req.body.born,
        dead: req.body.dead,
        description: req.body.description,
        establishment: req.body.establishment,
      },
      (err, result) => {
        if (err) next(err);
        else {
          res.json({ status: "success", data: result });
        }
      }
    );
  },

  getData: (req, res, next) => {
    Heroes.find({})
      .then((result) => res.json({ status: "success", data: result }))
      .catch((err) => err);
  },

  getDataById: (req, res) => {
    Heroes.findById({}, req.params.heroesId)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },

  deleteById: (req, res) => {
    Heroes.findByIdAndRemove(req.params.heroesId)
      .then((result) => res.json(result))
      .catch((err) => err);
  },

  editById: (req, res) => {
    Heroes.findByIdAndUpdate(req.params.heroesId, {
      images: req.body.images,
      name: req.body.name,
      born: req.body.born,
      dead: req.body.dead,
      description: req.body.description,
      establishment: req.body.establishment,
    })

      .then((result) => res.json(result))
      .catch((err) => err);
  },
};
