const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  argon2
    .hash(req.body.password)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        pseudo: req.body.pseudo,
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
        .verify(user.password, req.body.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Utilisateur introuvable" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id, pseudo: user.pseudo },
              process.env.JWT_SECRET,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.getUserConnected = (req, res) => {
  User.findOne({ _id: req.auth.userId })
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.status(200).json(userObject);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.updateUserProfil = (req, res) => {
  const userId = req.auth.userId;

  if (req.params.id !== userId) {
    return res.status(403).json({ message: "Non autorisé" });
  }

  const updatedFields = {
    email: req.body.email,
    pseudo: req.body.pseudo,
  };

  User.updateOne({ _id: req.params.id }, { $set: updatedFields })
    .then(() =>
      res
        .status(200)
        .json({ message: "Profil utilisateur mis à jour avec succès." })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ error: "Erreur lors de la mise à jour du profil." })
    );
};
