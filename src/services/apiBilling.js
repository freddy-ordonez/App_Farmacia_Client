import axios from "axios"

const URL_API = "https://localhost:7289/api/facturacion" 

const getAllBilling = async ()=> {
    try {
        const res = axios.get(`${URL_API}`)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const addBilling = async (billing)=> {
    try {
        const res = axios.post(`${URL_API}`, billing)
        const data = (await res).data
        console.log(data);
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export default {
    getAllBilling,
    addBilling
}