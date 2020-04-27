const Country = require("../models/Country");

module.exports = {
  create: (req, res, next) => {
    Country.create({
      name: req.body.name,
      location: req.body.location,
    })
      .then((response) => res.json(response))
      .catch((err) => err);
  },

  getData: (req, res, next) => {
    Country.find({})
      .then((response) => res.json(response))
      .catch((err) => err);
  },

  getDataById: (req, res, next) => {
    Country.findById(req.params.countryId)
      .then((response) => res.json(response))
      .catch((err) => err);
  },

  deleteById: (req, res, next) => {
    Country.findByIdAndRemove(req.params.countryId)
      .then((response) => res.json(response))
      .catch((err) => err);
  },
};
