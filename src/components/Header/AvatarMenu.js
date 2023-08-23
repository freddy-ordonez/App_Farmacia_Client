import * as React from "react";
import { headerStyles } from "./styles";
import { Menu, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import LoginModal from "../Modals/LoginModal/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { logOut, login } from "../../redux/sliceLogin";

function AvatarMenu() {

  const users = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenModalLogin = ()=> {
    setOpenModalLogin(!openModalLogin)
  }

  const handleLogin = (data)=>{
    console.log(data);
    console.log(users);
    const findUser = users.find(user => user.correoELectronico === data.correoELectronico && user.contrasena === data.contrasena)
    console.log(findUser);
    if (findUser) {
      dispatch(login(findUser))
      setAnchorEl(null);
      setOpenModalLogin(!openModalLogin)
      return
    }
    alert("No se encontro el usuario")
    setAnchorEl(null);
    setOpenModalLogin(!openModalLogin)
  }

  const handleClickLogOut = ()=> {
    dispatch(logOut())
    setAnchorEl(null);
  }
  return (
    <>
      <Box sx={headerStyles.topRow}>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar src="https://mui.com/static/images/avatar/1.jpg" />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClickOpenModalLogin}>Login</MenuItem>
          <MenuItem onClick={handleClickLogOut}>Logout</MenuItem>
        </Menu>
      </Box>
      <LoginModal open={openModalLogin}
        onClose={() => setOpenModalLogin(false)}
        loginUser={handleLogin}/>
    </>
  );
}

export default AvatarMenu;
