import axios from "axios";
const Axios = axios.create({
  // baseURL: "https://projecthostvercel.vercel.app/api"
  baseURL: "http://localhost:3001/api",
});

export default Axios;
