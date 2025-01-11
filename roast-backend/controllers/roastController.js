const roastService = require("../services/roastService");

const createRoast = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: "URL is required." });
  }

  try {
    const result = await roastService.createRoast(url);

    if (result.success) {
      return res.status(201).json({
        success: true,
        message: result.message,
        roast: result.roast,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: result.message,
        roast: result.roast,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};


const getRoasts = async (req, res) => {
  const {sortByVotes} = req.query;
  const deviceId = req.headers["device-id"];

  try {
    const roasts = await roastService.getRoasts(sortByVotes, deviceId);
    res.status(200).json({ success: true, roasts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const upvoteRoast = async (req, res) => {
    const { id } = req.body;
    const { deviceId } = req.body;
  
    if (!id || !deviceId) {
      return res.status(400).json({ success: false, message: "Roast ID and Device ID are required." });
    }

  try {
    const roast = await roastService.upvoteRoast(id, deviceId);
    res.status(200).json({ success: true, roast });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRoast,
  getRoasts,
  upvoteRoast,
};
