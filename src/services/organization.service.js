import axios from "axios";
import authHeader from "./auth-header";
const organization = JSON.parse(localStorage.getItem('organization'));

const id = organization.data

console.log(id)


const GET_ALL_NGO_URL = "https://chats-backend.herokuapp.com/api/v1/ngos/";
const GET_ONE_NGO_URL = "https://chats-backend.herokuapp.com/api/v1/ngos/";

const getAllNGO = () => {
  return axios.get(GET_ALL_NGO_URL);
};

const getOneNGO = () => {
  return axios.get(`${GET_ONE_NGO_URL}${id}`, { headers: authHeader() });
};

export default {
  getAllNGO,
  getOneNGO,
};