const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const womanSchema = new Schema(
  {
    name: { type: String, required: true },
    categories: { type: [String], required: true }, // Replaced subject with categories
    birthYear: { type: Number, required: false },
    deathYear: { type: Number, required: false },
    location: { type: String, required: true },
    contribution: { type: String, required: true },
    image: { type: String, required: false },
    quotes: { type: [String], required: false },
    artifacts: { type: [String], required: false },
    impact: { type: String, required: false },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Woman = mongoose.model("Woman", womanSchema);

module.exports = Woman;
