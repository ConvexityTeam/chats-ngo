import Axios from "axios";

const organization = JSON.parse(localStorage.getItem('organization'));

const token = organization.data.token

console.log(organization.data.token)
console.log("here")

export default Axios.create({
  baseURL: "https://chats-backend.herokuapp.com/api/v1/campaigns/",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`
  }
});