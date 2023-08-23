import React, { useState } from "react";
import DataGrid from "../../components/common/DataTable/Clients/DataGridClient";
import GridWrapper from "../../components/common/GridWrapper/GridWrapper";
import BasicCard from "../../components/common/BasicCard/BasicCard";
import Box from "@mui/material/Box";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import NewClientModal from "../../components/Modals/NewClientModal/NewClientModal";
import { cardHeaderStyles } from "../styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useDispatch, useSelector } from "react-redux";
import { addOneClient } from "../../redux/sliceClient";

const Clients = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  const addNewClient = (client) => {
    dispatch(addOneClient(client));
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
            <PersonAddIcon />
            Agregar Clientes
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
      {!login.length? (
        null
      ) : (
        <GridWrapper>
          <BasicCard header={getHeader()} content={getContent()} />
          <NewClientModal
            open={open}
            onClose={() => setOpen(false)}
            addNewClient={addNewClient}
          />
        </GridWrapper>
      )}
    </>
  );
};

export default Clients;
