import { data } from "react-router-dom";
import { getAllCategoryApi,createOneCategoryApi,getOneCategoryApi,updateOneCategoryApi,deleteOneCategoryApi } from "../../api/admin/categoryApi";
export const getAllCategoryService = async ()=>{
    try{
        const response = await getOneCategoryApi()
        return response.data
    }catch (err){
        throw err.response?.data || {"message":"Failed to fetch"}
    }
}
export const createOneCategoryService = async (data)=>{
    try{
        const response = await createOneCategoryApi(data)
        return response.data
    }catch(err){
        throw err.response?.data||{"message":"Failed to create"}
    }
}
export const getOneCategoryService = async(id)=>{
    try{
        const response = await getOneCategoryApi(id)
        return response.data

    }catch(err){
        throw err.response?.data || {"message":"Get Failed"}
    }
}
export const updateOneCategoryService = async (id,data)=>{
    try{
        const response = await updateOneCategoryApi(id,data)
        return response.data
    }catch(err){
        throw err.response?.data|| {"message":"update failed"}
    }
}
export  const deleteOneCategoryService = async(id)=>{
    try{
        const response = await deleteOneCategoryApi(id)
        return response.data
    }catch(err){
        throw err.response?.data||{"message":"Delete failed"}
    }
}
