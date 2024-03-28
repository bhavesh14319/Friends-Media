import axios from "axios";

const instance = axios.create({
  baseURL: "https://blue-enthusiastic-cobra.cyclic.app/api/v1",
});

export default instance
