const User = require("../models/User");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "privasi";

module.exports = {
  create: (req, res, next) => {
    User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then((response) => res.json(response))
      .catch((err) => {
        throw err;
      });
  },

  authenticated: function (req, res, next) {
    User.findOne({ email: req.body.email })
      .then((response, err) => {
        if (err) next(err);
        else {
          if (
            response != null &&
            Bcrypt.compareSync(req.body.password, response.password)
          ) {
            jwt.sign(
              {
                id: response._id,
              },
              privateKey,
              { expiresIn: "2 Days" },
              (err, token) => {
                res.json(token);
              }
            );
          } else {
            res.json({ status: err });
          }
        }
      })
      .catch((err) => {
        throw err;
      });
  },

  getData: (req, res, next) => {
    User.find({})
      .then((response) => res.json({ status: "success", data: response }))
      .catch((err) => err);
  },

  getDataById: (req, res, next) => {
    User.findById(req.params.userId)
      .then((response) => res.json(response))
      .catch((err) => err);
  },

  deleteById: (req, res, next) => {
    User.findByIdAndRemove(req.params.userId)
      .then((response) => res.json(response))
      .catch((err) => err);
  },

  editById: (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, {
      email: req.body.email,
      password: req.body.password,
    })
      .then((response) => res.json(response))
      .catch((err) => err);
  },
};
