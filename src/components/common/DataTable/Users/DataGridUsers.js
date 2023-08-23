import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneUser, updateOneUser } from "../../../../redux/sliceUser";


export default function FullFeaturedCrudGrid() {

  const users = useSelector(state=> state.user)
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
    console.log(id);
    // setRows(rows.filter((row) => row.id !== id));
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    dispatch(deleteOneUser(id))
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = users.find((row) => row.id === id);
    if (editedRow.isNew) {
      dispatch(updateOneUser(id))
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    dispatch(updateOneUser(newRow))
    console.log(newRow);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "Id", width: 230, editable: true },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "correoElectronico",
      headerName: "Correo Electronico",
      width: 230,
      editable: true,
    },
    {
      field: "tipoUsuario",
      headerName: "Tipo Usuario",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Administrador", "Vendedor", "Contabilidad"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Modificar",
      width: 180,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      },
    },
  ];

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
        rows={users}
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
