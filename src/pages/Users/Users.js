import React, { useState } from "react";
import BasicCard from "../../components/common/BasicCard/BasicCard";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import Box from "@mui/material/Box";
import GridWrapper from "../../components/common/GridWrapper/GridWrapper";
import { cardHeaderStyles } from "../styles";
import NewUserModal from "../../components/Modals/NewUserModal/NewUserModal";
import DataGrid from "../../components/common/DataTable/Users/DataGridUsers";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useDispatch, useSelector } from "react-redux";
import { addOneUser } from "../../redux/sliceUser";

const Login = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const login = useSelector((state) => state.login);

  const getHeader = () => {
    const addUser = () => {
      setOpen(true);
    };

    return (
      <Box sx={cardHeaderStyles.wrapper}>
        <Box>
          <CommonButton
            variant="contained"
            onClick={addUser}
            size="large"
            sx={cardHeaderStyles.addUserButton}
          >
            <PersonAddIcon sx={{ marginRight: "3px" }} />
            Agregar Usuario
          </CommonButton>
        </Box>
      </Box>
    );
  };

  const addNewUser = (user) => {
    dispatch(addOneUser(user));
    setOpen(false);
  };

  const getContent = () => (
    <>
      <DataGrid />
    </>
  );

  return (
    <>
      {!login.length ? (
        null
      ) : (
        <GridWrapper>
          <BasicCard header={getHeader()} content={getContent()} />
          <NewUserModal
            open={open}
            onClose={() => setOpen(false)}
            addNewUser={addNewUser}
          />
        </GridWrapper>
      )}
    </>
  );
};

export default Login;
