import axios from "axios";

async function getUserFromJwt(accessToken) {
  try {
    const response = await axios.post(
      "https://quill-quest-server.onrender.com/getUser",
      {
        accessToken,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export default getUserFromJwt;
