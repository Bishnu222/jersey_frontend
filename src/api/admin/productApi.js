import axios from "../api";

export const geAllProductApi = (params) => axios.get("/admin/product",{params})