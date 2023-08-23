import { createSlice } from '@reduxjs/toolkit';
import serviceProduct from "../services/apiProduct"

const initialState = []

export const sliceProduct = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      return action.payload.map(p => true ? {...p, id:p.idProducto} : p)
    },
    addProduct: (state, action) => {
      const newProduct = {...action.payload, id:action.payload.idProducto}
      state.push(newProduct)
    },
    updateProduct: (state, action) => {
      return state.map(p => p.id === action.payload.id ? action.payload : p)
      console.log(action.payload);
    },
    deleteProduct: (state, action) => {
        return state.filter(p=> p.id !== action.payload)
    }
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } = sliceProduct.actions;

export default sliceProduct.reducer;

export const initializeProduct = ()=> {
  return async dispatch => {
    const products = await serviceProduct.getAllProducts()
    console.log(products);
    dispatch(setProducts(products))
  } 
}

export const deleteOneProduct = (idProducto)=> {
  return async dispatch => {
    console.log("entra");
    const products = await serviceProduct.deleteProduct(idProducto)
    console.log(products);
    dispatch(deleteProduct(idProducto))
  } 
}

export const updateOneProduct = (product)=> {
  return async dispatch => {
    const products = await serviceProduct.updateProduct(product)
    console.log(products);
    dispatch(updateProduct(product))
  } 
}

export const addOneProduct = ({idProducto, descripcion, precio, stock, estadoProducto, tipoProducto})=> {
  return async dispatch => {
    const newProduct = {
      idProducto,
      descripcion,
      precio,
      stock,
      estadoProducto: estadoProducto || 'Existencia',
      tipoProducto
  }
    const products = await serviceProduct.addProduct(newProduct)
    dispatch(addProduct(newProduct))
  } 
}