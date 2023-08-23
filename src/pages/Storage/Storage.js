import React, { useState, useEffect } from 'react'
import GridWrapper from '../../components/common/GridWrapper/GridWrapper'
import BasicSnackbar from '../../components/common/BasicSnackbar/BasicSnackbar';
import UserTable from '../../components/UserTable/UserTable';
import BasicCard from '../../components/common/BasicCard/BasicCard';
import { Button } from '@mui/material';
import Box from "@mui/material/Box";
import { cardHeaderStyles } from "../styles";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import NewUserModal from "../../components/Modals/NewUserModal/NewUserModal";
import DataGrid from "../../components/common/DataTable/Billing/DataGridBilling";

const Storage = () => {

  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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
            Login
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
      <GridWrapper>
        <BasicCard header={getHeader()} content={getContent()} />
        <NewUserModal
        open={open}
        onClose={() => setOpen(false)}
        addNewUser={addNewUser}
      />
      </GridWrapper>
    )
}

export default Storage
