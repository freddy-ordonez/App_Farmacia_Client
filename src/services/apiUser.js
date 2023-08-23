import axios from "axios"

const URL_API = "https://localhost:7289/api/usuario" 

const getAllUsers = async ()=> {
    try {
        const res = axios.get(`${URL_API}`)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async (id)=> {
    try {
        console.log(typeof(id));
        const res = axios.delete(`${URL_API}/${id}`)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const updateUser = async ({idUsuario, nombre, correoElectronico, tipoUsuario, contrasena})=> {

    try {
        const updateUser = {
            idUsuario,
            nombre,
            correoElectronico,
            tipoUsuario,
            contrasena
        } 
        const res = axios.put(`${URL_API}/${idUsuario}`, updateUser)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const addUser = async (user)=> {
    try {
        const res = axios.post(`${URL_API}`, user)
        const data = (await res).data
        console.log(data);
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export default {
    getAllUsers,
    deleteUser,
    updateUser,
    addUser
}