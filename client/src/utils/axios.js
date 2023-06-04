import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost:3001/api",
  //baseURL: "https://gamersden.tech/api",
});

export default Axios;
