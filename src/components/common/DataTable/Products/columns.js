import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";

export const createColumns = (handleSaveClick,handleCancelClick,handleEditClick,handleDeleteClick,handleShoppingCartClick,rowModesModel)=> {
    return [
        { field: "idProducto", headerName: "Id", width: 100, editable: true },
        {
          field: "descripcion",
          headerName: "Descripcion",
          width: 200,
          align: "left",
          headerAlign: "left",
          editable: true,
        },
        {
          field: "precio",
          headerName: "Precio",
          type: "number",
          width: 100,
          editable: true,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          width: 100,
          editable: true,
        },
        {
          field: "estadoProducto",
          headerName: "Estado Producto",
          width: 160,
          editable: true,
          type: "singleSelect",
          valueOptions: ["Agotado", "Existencia"],
        },
        {
          field: "tipoProducto",
          headerName: "Tipo Producto",
          width: 160,
          editable: true,
          type: "singleSelect",
          valueOptions: ["Recomendado", "Promocion", "Mas Vendido"],
        },
        {
          field: "actions",
          type: "actions",
          headerName: "Modificar",
          width: 150,
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
              <GridActionsCellItem
                icon={<AddShoppingCartIcon />}
                label="AddCart"
                onClick={handleShoppingCartClick(id)}
                color="inherit"
              />,
            ];
          },
        },
      ];
}