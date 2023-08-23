import React, { useState, useEffect } from "react";
import BasicModal from "../../common/BasicModal/BasicModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const defaultInputValues = {
  idProducto: "",
  descripcion: "",
  precio: 0,
  stock: 0,
  stadoProducto: "",
  tipoProducto: "",
};

const typesStates = ["Agotado", "Existencia"];
const typesProducts = ["Recomendado", "Promocion", "Mas Vendido"];

const NewProductModal = ({ open, onClose, addNewProduct }) => {
  const [values, setValues] = useState(defaultInputValues);

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

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const usernameExp = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
  const number = /^([0-9])*$/

  const validationSchema = Yup.object().shape({
    idProducto: Yup.string().required("Codigo del producto requerido"),
    descripcion: Yup.string()
      .required("Descripcion es requerido")
      .min(10, "Descripcion tiene que contener mas de 10 caracteres"),
    precio: Yup.number().required("Precio es requerido"),
    stock: Yup.number().required("Precio es requerido"),
    stadoProducto: Yup.string().required("Estado del producto requerido"),
    tipoProducto: Yup.string().required("Tipo de producto requerido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const addProduct = (product) => {
    addNewProduct(product);
  };

  const handleChange = (value) => {
    setValues(value);
  };

  useEffect(() => {
    if (open) setValues(defaultInputValues);
  }, [open]);

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <TextField
        placeholder="Codigo Producto"
        name="idProducto"
        label="Codigo Producto"
        required
        {...register("idProducto")}
        error={errors.idProducto ? true : false}
        helperText={errors.idProducto?.message}
        value={values.idProducto}
        onChange={(event) =>
          handleChange({ ...values, idProducto: event.target.value })
        }
      />
      <TextField
        placeholder="Descripcion"
        name="descripcion"
        label="Descripcion"
        required
        {...register("descripcion")}
        error={errors.descripcion ? true : false}
        helperText={errors.descripcion?.message}
        value={values.descripcion}
        onChange={(event) =>
          handleChange({ ...values, descripcion: event.target.value })
        }
      />
      <TextField
        placeholder="Precio"
        type="number"
        name="precio"
        label="Precio"
        required
        {...register("precio")}
        error={errors.precio ? true : false}
        helperText={errors.precio?.message}
        value={values.precio}
        onChange={(event) =>
          handleChange({ ...values, precio: event.target.value })
        }
      />
      <TextField
        placeholder="Stock"
        name="stock"
        label="Stock"
        type="number"
        required
        {...register("stock")}
        error={errors.stock ? true : false}
        helperText={errors.stock?.message}
        value={values.stock}
        onChange={(event) =>
          handleChange({ ...values, stock: event.target.value })
        }
      />
      <TextField
        id="outlined-select-currency"
        select
        label="Estado Producto"
        required
        {...register("stadoProducto")}
        defaultValue="Existencia"
        error={errors.stadoProducto ? true : false}
        helperText={errors.stadoProducto?.message}
        onChange={(event) =>
          handleChange({ ...values, stadoProducto: event.target.value })
        }
      >
        {typesStates.map((option, i) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-select-type-products"
        select
        label="Tipo Producto"
        required
        {...register("tipoProducto")}
        defaultValue="Recomendado"
        error={errors.tipoProducto ? true : false}
        helperText={errors.tipoProducto?.message}
        onChange={(event) =>
          handleChange({ ...values, tipoProducto: event.target.value })
        }
      >
        {typesProducts.map((option, i) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Nuevo Producto"
      subTitle="Rellene el formulario antes de registrar"
      content={getContent()}
      onSubmit={handleSubmit(addProduct)}
    />
  );
};

export default NewProductModal;
