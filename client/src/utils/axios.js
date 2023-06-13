import axios from "axios";
const Axios = axios.create({
  baseURL: "https://projecthostvercel.vercel.app/api",
});

export default Axios;
