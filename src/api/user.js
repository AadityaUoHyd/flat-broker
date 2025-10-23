import axios from "axios";
import { getConfig } from "./axiosConfig.js";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

//flats
//export const createFlat = (flatData)=>{
//    axios.post(`${API}/flat/createFlat`,flatData,getConfig())
//}

// Create a new flat with image uploads
export const createFlat = async (formData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${API}/flat/createFlat`, formData, {
            headers: {
                "auth-token": token,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating flat:", error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw new Error(error.response.data.message || "Failed to create flat");
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error("No response from server. Please check your connection.");
        } else {
            // Something happened in setting up the request
            throw new Error(error.message || "Error creating flat");
        }
    }
};

export const getMyFlats = ()=>
    axios.get(`${API}/flat/getFlats`,getConfig())

export const getApprovedFlats = ()=>
    axios.get(`${API}/flat/getApprove`,getConfig())

export const createEnquiry = (flatId,message)=>
    axios.post(`${API}/enquiry/sendEnquiry`,{flat_id : flatId, message},getConfig())

export const getMyEnquiries = ()=>
    axios.get(`${API}/enquiry/getEnquiry`,getConfig())

export const getSellerSoldEnquiries = ()=>
    axios.get(`${API}/enquiry/flats/received`,getConfig())

export const markFlatSold = (flatId,buyerUserId)=>
    axios.put(`${API}/flat/${flatId}/sold`,{sold_to_user_id : Number(buyerUserId)},getConfig())

