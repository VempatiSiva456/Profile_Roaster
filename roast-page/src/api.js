import { v4 as uuidv4 } from "uuid";
const API_URL = "https://linkedin-roaster.onrender.com/api";

const getDeviceId = () => {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem("deviceId", deviceId);
    }
    return deviceId;
  };

export const createRoast = async (url) => {
  const response = await fetch(`${API_URL}/createRoast`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  return response.json();
};

export const getRoasts = async (sortByVotes = false) => {
  const response = await fetch(`${API_URL}/getRoasts?sortByVotes=${sortByVotes}`);
  return response.json();
};

export const toggleVote = async (id) => {
    const deviceId = getDeviceId();
    const response = await fetch(`${API_URL}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, deviceId }),
    });
    return response.json();
  };
  
