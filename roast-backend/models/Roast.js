const mongoose = require("mongoose");

const RoastSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "Unknown",
    },
    picture: {
      type: String,
      default: null,
    },
    roast: {
      type: String,
      required: true,
    },
    shortRoast: {
      type: String,
      default: "No short roast available.",
    },
    votes: [
        {
          deviceId: { type: String, required: true },
        },
      ],
    voteCount: { type: Number, default: 0 },
    recent_time: {type: Date, default: Date.now}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Roast", RoastSchema);
