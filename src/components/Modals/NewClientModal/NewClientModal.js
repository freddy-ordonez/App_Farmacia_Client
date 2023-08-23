import React, { useState, useEffect } from "react";
import BasicModal from "../../common/BasicModal/BasicModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const defaultInputValues = {
  idCliente: "",
  nombre: "",
  correoElectronico: ""
};

const NewClientModal = ({ open, onClose, addNewClient }) => {
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


  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const usernameExp = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;

  const validationSchema = Yup.object().shape({
    idCliente: Yup.string().required("Identificacion del cliente requerido"),
    nombre: Yup.string()
      .required("Nombre es requerido")
      .min(10, "Digite su nombre completo")
      .matches(usernameExp, "Digite solo letras para su nombre"),
    correoElectronico: Yup.string()
      .required("Correo electronico es requerido")
      .matches(emailRegExp, "Correo electronico invalido.")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const addClient = (client) => {
    addNewClient(client);
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
        placeholder="Identificacion"
        name="idCliente"
        label="Identificacion"
        required
        {...register("idCliente")}
        error={errors.idCliente ? true : false}
        helperText={errors.idCliente?.message}
        value={values.idCliente}
        onChange={(event) =>
          handleChange({ ...values, idCliente: event.target.value })
        }
      />
      <TextField
        placeholder="Nombre Completo"
        name="nombre"
        label="Nombre Completo"
        required
        {...register("nombre")}
        error={errors.nombre ? true : false}
        helperText={errors.nombre?.message}
        value={values.nombre}
        onChange={(event) =>
          handleChange({ ...values, nombre: event.target.value })
        }
      />
      <TextField
        placeholder="Correo Electronico"
        name="correoElectronico"
        label="Correo Electronico"
        required
        {...register("correoElectronico")}
        error={errors.correoElectronico ? true : false}
        helperText={errors.correoElectronico?.message}
        value={values.correoElectronico}
        onChange={(event) =>
          handleChange({ ...values, correoElectronico: event.target.value })
        }
      />

    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Nuevo Cliente"
      subTitle="Rellene el formulario antes de registrar"
      content={getContent()}
      onSubmit={handleSubmit(addClient)}
    />
  );
};

export default NewClientModal;