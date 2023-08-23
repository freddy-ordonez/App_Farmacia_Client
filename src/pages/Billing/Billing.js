import React, { useState } from "react";
import DataGrid from "../../components/common/DataTable/Billing/DataGridBilling";
import GridWrapper from "../../components/common/GridWrapper/GridWrapper";
import BasicCard from "../../components/common/BasicCard/BasicCard";
import Box from "@mui/material/Box";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import NewUserModal from "../../components/Modals/NewUserModal/NewUserModal";
import { cardHeaderStyles } from "../styles";
import { useSelector } from "react-redux";

const Billing = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const login = useSelector((state) => state.login);

  const addNewUser = (data) => {
    users.push({ ...data });
    setOpen(false);
  };

  const addUser = () => {
    setOpen(true);
  };

  const getHeader = () => {
    return (
      <Box sx={cardHeaderStyles.wrapper}>
        <Box>
          <CommonButton
            variant="contained"
            onClick={addUser}
            size="large"
            sx={cardHeaderStyles.addUserButton}
          >
            Agregar Productos
          </CommonButton>
        </Box>
      </Box>
    );
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
          <BasicCard content={getContent()} />
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

export default Billing;
