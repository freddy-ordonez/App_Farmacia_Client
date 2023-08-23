import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import BasicModal from "../../common/BasicModal/BasicModal";
import BasicCardCart from "../../common/BasicCard/BasicCardCart";
import { useDispatch, useSelector } from "react-redux";
import { subtractProduct, sumProduct } from "../../../redux/sliceShoopingCart";

const modalStyles = {
  inputFields: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    marginBottom: "15px",
    ".MuiFormControl-root": {
      marginBottom: "20px",
    },
  },
};

const clients = ["Freddy", "Jose", "Antonio"];

function ShoppingCartModal({ open, onClose, addNewBilling }) {

  const cartProducts = useSelector(state => state.cartShooping)
  const clients = useSelector(state => state.client)
  const dispatch = useDispatch()

  console.log(cartProducts);
  
  const [client, setClient] = useState("");

  const handleChange = (e) => {
    setClient(e.target.value)
    console.log(e.target.value);
  };

  const handleClickAdd = (id) => {
    dispatch(sumProduct(id))
  };

  const handleClickSubtract = (id) => {
    dispatch(subtractProduct(id))
  };

  const addBilling = ()=> {
    addNewBilling(client)
  }


  const getContent = () => {
    let subTotal = 0
    
    if(cartProducts !== []) cartProducts.map(c => subTotal+= (c.precio * c.cantidad))

    return (
      <Box sx={modalStyles.inputFields}>
        {cartProducts === [] ? null : cartProducts.map((c) => (
          <BasicCardCart
            productCode={c.idProducto}
            description={c.descripcion}
            price={c.precio}
            amount={c.cantidad}
            handleClickAdd={handleClickAdd}
            handleClickSubtract={handleClickSubtract}
          />
        ))}

        <hr />
        <TextField
          id="outlined-select-currency"
          select
          label="Seccionar Cliente"
          required
          defaultValue={clients[0]}
          // value={values.typesUser}
          onChange={(event) => handleChange(event)}
        >
          {clients === [] ? null : clients.map((c, i) => (
            <MenuItem key={i} value={c.idCliente}>
              {c.nombre}
            </MenuItem>
          ))}
        </TextField>
        <Card sx={{ minWidth: 275, display: "flex", padding: 1 }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Sub total = C {subTotal || 0}
            </Typography>
        </Card>
      </Box>
    );
  };

  return (
    <BasicModal
      open={open}
      scroll={true}
      onClose={onClose}
      title="Carrito"
      subTitle="Rellene el formulario antes de facturar"
      content={getContent()}
      onSubmit={addBilling}
    />
  );
}

export default ShoppingCartModal;
