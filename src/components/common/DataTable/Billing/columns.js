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
      { field: "id", headerName: "Id", width: 80, editable: true },
      {
        field: "idCliente",
        headerName: "Id Cliente",
        width: 180,
        align: "left",
        headerAlign: "left",
        editable: false,
      },
      {
        field: "fechaCompra",
        headerName: "Fecha Compra",
        type: "date",
        width: 180,
        editable: false,
      },
      {
        field: "total",
        headerName: "Total",
        type: "number",
        width: 120,
        align: "left",
        headerAlign: "left",
        editable: false,
      },
      {
        field: "cantidad",
        headerName: "Cantidad",
        type: "number",
        width: 120,
        align: "left",
        headerAlign: "left",
        editable: false,
      },
      {
        field: "metodoPago",
        headerName: "Metodo Pago",
        width: 220,
        align: "left",
        headerAlign: "left",
        editable: false
      }
    ];
}