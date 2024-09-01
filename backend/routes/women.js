const router = require("express").Router();
let Woman = require("../models/woman.model");

// Get all women
router.route("/").get((req, res) => {
  Woman.find()
    .then((women) => res.json(women))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add a new woman
router.route("/add").post((req, res) => {
  const {
    name,
    subject,
    birthYear,
    deathYear,
    location,
    contribution,
    image,
    quotes,
    artifacts,
    impact,
    lat,
    lng,
    categories, // New field for categories
  } = req.body;

  const newWoman = new Woman({
    name,
    subject,
    birthYear,
    deathYear,
    location,
    contribution,
    image,
    quotes,
    artifacts,
    impact,
    lat,
    lng,
    categories, // New field for categories
  });

  newWoman
    .save()
    .then(() => res.json("Woman added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
