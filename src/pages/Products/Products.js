import React, { useState } from "react";
import DataGrid from "../../components/common/DataTable/Products/DataGridProducts";
import GridWrapper from "../../components/common/GridWrapper/GridWrapper";
import BasicCard from "../../components/common/BasicCard/BasicCard";
import Box from "@mui/material/Box";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import NewProductModal from "../../components/Modals/NewProductModal/NewProductModal";
import { cardHeaderStyles } from "../styles";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { addOneProduct } from "../../redux/sliceProduct";

const Database = () => {

  const login = useSelector((state) => state.login);
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const addNewProduct = (data) => {
    console.log(data);
    dispatch(addOneProduct(data))
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
            <AddIcon />
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
    {!login.length ? null : 
    <GridWrapper>
      <BasicCard header={getHeader()} content={getContent()} />
      <NewProductModal
        open={open}
        onClose={() => setOpen(false)}
        addNewProduct={addNewProduct}
      />
    </GridWrapper>}
    </>
  );
};

export default Database;
