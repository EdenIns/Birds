const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  argon2
    .hash(req.body.password)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Utilisateur introuvable" });
      }
      argon2
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Utilisateur introuvable" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id, pseudo: user.pseudo }, process.env.JWT_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
