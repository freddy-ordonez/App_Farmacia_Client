import * as React from "react";
import Box from "@mui/material/Box";
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
import { createColumns } from "./columns";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneClient, updateOneClient } from "../../../../redux/sliceClient";

export default function FullFeaturedCrudGrid() {

  const clients = useSelector(state => state.client)
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleClose = () => setOpen(!open);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    dispatch(deleteOneClient(id))
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = clients.find((row) => row.id === id);
    if (editedRow.isNew) {
      dispatch(updateOneClient(id))
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    dispatch(updateOneClient(newRow))
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = createColumns(handleSaveClick,handleCancelClick,handleEditClick,handleDeleteClick,rowModesModel)

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
        rows={clients}
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
