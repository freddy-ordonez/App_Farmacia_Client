import React, { useState, useEffect } from "react";
import BasicModal from "../../common/BasicModal/BasicModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const defaultInputValues = {
  nombre: "",
  correoElectronico: "",
  tipoUsuario: "",
  contrasena: ""
};

const typesUsers = ["Administrador", "Vendedor", "Contabilidad"];

const NewUserModal = ({ open, onClose, addNewUser }) => {
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
  const usernameExp = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("Nombre de usuario es requerido")
      .min(6, "Nombre de usuario tiene que contener mas de 6 caracteres")
      .matches(usernameExp, "Username only letter"),
    correoElectronico: Yup.string()
      .required("Correo electronico es requerido")
      .matches(emailRegExp, "Correo electronico es invalido."),
    tipoUsuario: Yup.string().required("Tipo de usuario es requerido"),
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

  const addUser = (user) => {
    console.log(values);
    addNewUser(values);
  };

  const handleChange = (value) => {
    setValues(value);
    console.log(value);
  };

  useEffect(() => {
    if (open) setValues(defaultInputValues);
  }, [open]);

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <TextField
        placeholder="Nombre de Usuario"
        name="nombre"
        label="Nombre de Usuario"
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
      <TextField
        id="outlined-select-currency"
        select
        label="Tipo Usuario"
        required
        {...register("tipoUsuario")}
        defaultValue="Vendedor"
        error={errors.tipoUsuario ? true : false}
        helperText={errors.tipoUsuario?.message}
        // value={values.typesUser}
        onChange={(event) =>
          handleChange({ ...values, tipoUsuario: event.target.value })
        }
      >
        {typesUsers.map((option, i) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        placeholder="Contraseña"
        name="contrasena"
        label=" Contraseña"
        required
        type="password"
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
      title="Nuevo Usuario"
      subTitle="Rellene el formulario antes de registrar"
      content={getContent()}
      onSubmit={handleSubmit(addUser)}
    />
  );
};

export default NewUserModal;
