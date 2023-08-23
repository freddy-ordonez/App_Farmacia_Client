import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Outlet } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Header from './components/Header/Header';
import { useLocation } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { initializeProduct } from './redux/sliceProduct';
import { initializeUser } from './redux/sliceUser';
import { initializeClient } from './redux/sliceClient';

function App() {
  const [title, setTitle] = useState(null);
  const location = useLocation();

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(initializeProduct())
    dispatch(initializeUser())
    dispatch(initializeClient())
  },[])
  
  useEffect(() => {
    const parsedTitle = location.pathname.replace(/\W/g, ' ');
    setTitle(parsedTitle);
  }, [location]);

  return (
    <Grid container>
      <Navbar />
      <Header title={title} />
      <Outlet />
    </Grid>
  );
}

export default App;
