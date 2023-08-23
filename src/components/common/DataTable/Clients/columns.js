import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";

export const createColumns = (handleSaveClick,handleCancelClick,handleEditClick,handleDeleteClick,rowModesModel)=> {
    return [
      { field: "id", headerName: "Id", width: 230, editable: true },
      {
        field: "nombre",
        headerName: "Nombre",
        width: 230,
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
            />,
          ];
        },
      },
    ];
}