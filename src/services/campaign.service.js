import http from "./http";

const organization = JSON.parse(localStorage.getItem('organization'));

const id = organization.data.userId

const results = organization.data
console.log(organization.data.token)
console.log(results)
console.log("here")

const getAll = () => {
  return http.get("/");
};

const get = () => {
  
  return http.get(`/${id}`);
};

const create = data => {
  return http.post("/", data);
};

const update = (id, data) => {
  return http.put(`/${id}`, data);
};

const remove = id => {
  return http.delete(`/${id}`);
};

const removeAll = () => {
  return http.delete(`/`);
};

const findByTitle = title => {
  return http.get(`/?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};