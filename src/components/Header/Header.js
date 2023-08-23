import React, { useState } from "react";
import CommonButton from "../common/CommonButton/CommonButton";
import NotificationBell from "../common/NotificationBell/NotificationBell";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import Box from "@mui/material/Box";
import { headerStyles } from "./styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import AvatarMenu from "./AvatarMenu";
import ShoppingCartModal from "../Modals/ShoppingCart/ShoppingCartModal";
import LoginModal from "../Modals/LoginModal/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { addBilling, addOneBilling } from "../../redux/sliceBilling";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = ({ title }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpen] = useState(false);

  const cartShooping = useSelector(state=> state.cartShooping)
  const clients = useSelector(state => state.client)
  const dispatch = useDispatch()

  const addNewBilling = (client) => {
     if(cartShooping === []){
        return alert("No hay productos agregados todavia")
     }

     const date = new Date().getDate()
     const year = new Date().getFullYear()
     const month = new Date().getMonth()

     let subTotal = 0

     cartShooping.forEach(element => {
      console.log("aqui")
      const newBilling = {
        idCliente: client,
        fechaDeCompra: new Date().toString(),
        total: element.cantidad * element.precio,
        cantidad: element.cantidad,
        tipoProducto: cartShooping[0].tipoProducto,
      }
      dispatch(addBilling(newBilling))
     });
     setOpen(!openModal)
  };

  const handleClickIcon = () => {
    setOpen(!openModal);
  };


  return (
    <Box sx={headerStyles.wrapper}>
        <AvatarMenu/>
      <Box sx={headerStyles.middleRow}>
        <Typography variant="h1" color="white">
          {isNaN(title) ? title : "Bienvenido"}
        </Typography>
        <Box>
          <Tooltip title="Carrito de compras">
            <IconButton
              color="white"
              sx={headerStyles.helpIcon}
              onClick={handleClickIcon}
            >
              <StyledBadge badgeContent={cartShooping.length || 0} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <ShoppingCartModal
        open={openModal}
        onClose={() => setOpen(false)}
        addNewBilling={addNewBilling}
      />
    </Box>
  );
};

export default Header;
