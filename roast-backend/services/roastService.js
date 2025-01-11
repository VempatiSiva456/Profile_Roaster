const Roast = require("../models/Roast");
const axios = require("axios");

const createRoast = async (url) => {
  try {
    const existingRoast = await Roast.findOne({ url });
    if (existingRoast) {
      existingRoast.recent_time = new Date();
      await existingRoast.save();
      return {
        success: false,
        message: "A roast with this URL already exists.",
        roast: existingRoast, 
      };
    }

    const encodedUrl = encodeURIComponent(url);
    const roastApiUrl = `https://roast-li.fly.dev/roast?linkedin_profile_url=${encodedUrl}&publish=true&language=English&version=2`;

    const response = await axios.get(roastApiUrl);
    const roastData = response.data;

    const newRoast = new Roast({
      url,
      name: roastData.name || "Unknown",
      picture: roastData.picture || null,
      roast: roastData.roast || "No roast available.",
      shortRoast: roastData.short_roast || "No short roast available.",
      recent_time: new Date(),
    });

    const savedRoast = await newRoast.save();

    return {
      success: true,
      message: "Roast created successfully.",
      roast: savedRoast,
    };

  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to fetch roast. Try again later.",
    };
  }
};


const getRoasts = async (sortByVotes, deviceId) => {
  const sortCriteria = sortByVotes ? { voteCount: -1 } : { recent_time: -1 };

  const roasts = await Roast.find().sort(sortCriteria);

  const enrichedRoasts = roasts.map((roast) => ({
    ...roast.toObject(),
    hasVoted: roast.votes.some((vote) => vote.deviceId === deviceId),
  }));

  return enrichedRoasts;
};


const upvoteRoast = async (id, deviceId) => {
  const roast = await Roast.findById(id);
  if (!roast) {
    throw new Error("Roast Not Found");
  }

  const voteIndex = roast.votes.findIndex((vote) => vote.deviceId === deviceId);

  if (voteIndex !== -1) {
    roast.votes.splice(voteIndex, 1);
    roast.voteCount = roast.votes.length;
  } else {
    roast.votes.push({ deviceId });
    roast.voteCount = roast.votes.length;
  }

  await roast.save();
};

module.exports = {
  createRoast,
  getRoasts,
  upvoteRoast,
};
