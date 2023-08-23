import React, { useState, useEffect } from "react";
import BasicModal from "../../common/BasicModal/BasicModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const defaultInputValues = {
  correoElectronico: "",
  contrasena: ""
};

const typesUsers = ["Administrador", "Vendedor", "Contabilidad"];

const LoginModal = ({ open, onClose, loginUser }) => {
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

  const validationSchema = Yup.object().shape({
    correoElectronico: Yup.string()
      .required("Correo usuario es requerido"),
    contrasena: Yup.string()
      .required("Contrasena es requerida")
      .min(6, "Contrasena tiene que contener mas de 6 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const login = (data) => {
    loginUser(data);
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
      <TextField
        placeholder="Contraseña"
        name="contrasena"
        label=" Contraseña"
        type="password"
        required
        {...register("contrasena")}
        error={errors.contrasena ? true : false}
        helperText={errors.contrasena?.message}
        value={values.contrasena}
        onChange={(event) =>
          handleChange({ ...values, contrasena: event.target.value })
        }
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Login"
      subTitle="Rellene el formulario"
      content={getContent()}
      onSubmit={handleSubmit(login)}
    />
  );
};

export default LoginModal;