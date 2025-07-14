import axios from "/src/api/api.js"; 

export const registerUserApi = (data) => axios.post("/auth/register", data); //  sends POST request to register
export const loginUserApi = (data) => axios.post("/auth/login", data);       //  sends POST request to login
