
import axios from "../api";

export const createUserApi = async (formData)=>{
    const res = await axios.post("/admin/users",formData);
    return res.data;
};
export const getAllUserApi = ()=>{
    const token =  localStorage.getItem("token");
    return axios.get("/admin/users",{
        headers:{
            Authorization : `Bearer ${token}`
        }
    });
}; export const getUserByIdApi = async (id) =>{
    const res = await axios.get(`/admin/users/${id}`);
    return res.data;
};
export const UpadateUserApi = async ({id, data})=>{
    const response = await axios.put(`/admin/users/${id}`,data);
    return response.data;
};

export const deleteUserApi = (id)=>{
    const token = localStorage.getItem("token");
    return axios.delete(`/admin/user/${id}`,{
        headers:{
            Authorization: `Bearer $@{token}`
        }
    });
};
