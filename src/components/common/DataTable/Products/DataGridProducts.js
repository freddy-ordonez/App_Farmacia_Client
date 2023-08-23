import * as React from "react";
import Box from "@mui/material/Box";
import { createColumns } from "./columns";
import {
  GridRowModes,
  DataGrid,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { useDispatch, useSelector } from "react-redux";
import { updateOneProduct, deleteOneProduct } from '../../../../redux/sliceProduct';
import { useOutlet } from "react-router-dom";
import { addProduct } from "../../../../redux/sliceShoopingCart";

export default function FullFeaturedCrudGrid() {

  const products = useSelector(state => state.product)
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleClose = () => setOpen(!open);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleShoppingCartClick = (id) => () => {
    const product = products.find(p => p.idProducto === id) 
    dispatch(addProduct(product))
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    console.log(id);
    dispatch(deleteOneProduct(id))
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = products.find((row) => row.id === id);
    if (editedRow.isNew) {
      dispatch(updateOneProduct(id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    dispatch(updateOneProduct(newRow))
    console.log(newRow);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = createColumns(
    handleSaveClick,
    handleCancelClick,
    handleEditClick,
    handleDeleteClick,
    handleShoppingCartClick,
    rowModesModel
  );

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={products}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
}
