import axios from "axios";

const instance = axios.create({
  baseURL: "https://friends-media-backend.vercel.app/api/v1",
});

export default instance
