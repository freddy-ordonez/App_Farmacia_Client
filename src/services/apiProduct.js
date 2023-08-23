import axios from "axios"

const URL_API = "https://localhost:7289/api/producto" 

const getAllProducts = async ()=> {
    try {
        const res = axios.get(`${URL_API}`)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const deleteProduct = async (id)=> {
    try {
        const res = axios.delete(`${URL_API}/${id}`)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const updateProduct = async ({idProducto, descripcion, precio, stock, estadoProducto, tipoProducto})=> {

    try {
        const updateProduct = {
            idProducto,
            descripcion,
            precio,
            stock,
            estadoProducto,
            tipoProducto
        } 
        console.log(updateProduct);
        const res = axios.put(`${URL_API}/${idProducto}`, updateProduct)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const addProduct = async ({idProducto, descripcion, precio, stock, estadoProducto, tipoProducto})=> {
    try {
        const newProduct = {
            idProducto,
            descripcion,
            precio,
            stock,
            estadoProducto,
            tipoProducto
        }
        console.log(newProduct);
        const res = axios.post(`${URL_API}`, newProduct)
        const data = (await res).data
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export default {
    getAllProducts,
    deleteProduct,
    updateProduct,
    addProduct
}

