import axios from "axios"

const URL_API = "https://localhost:7289/api/cliente" 

const getAllClients = async ()=> {
    try {
        const res = axios.get(`${URL_API}`)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const deleteClient = async (id)=> {
    try {
        console.log(typeof(id));
        const res = axios.delete(`${URL_API}/${id}`)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const updateClient = async ({idCliente, nombre, correoElectronico})=> {

    try {
        const updateClient = {
            idCliente,
            nombre,
            correoElectronico
        } 
        const res = axios.put(`${URL_API}/${idCliente}`, updateClient)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const addClient = async (client)=> {
    try {
        const res = axios.post(`${URL_API}`, client)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export default {
    getAllClients,
    deleteClient,
    addClient,
    updateClient
}