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
import { addBilling } from "../../../../redux/sliceBilling";

export default function FullFeaturedCrudGrid() {

  const billings = useSelector(state => state.billing)
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleClose = ()=> setOpen(!open)

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    console.log(id);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = billings.find((row) => row.id === id);
    if (editedRow.isNew) {
    }
  };

  const processRowUpdate = (newRow) => {
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
        rows={billings}
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
