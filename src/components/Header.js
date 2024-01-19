import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoContext } from "../context/cryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const Header =()=>{

    const{currency, setCurrency, user}=useContext(CryptoContext);

    console.log(currency);
    const history= useNavigate();

    const darkTheme= createTheme({
        palette:{
            primary:{
                main:'#fff',
            },
            type:'dark',
        },
    });

    return(
        <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar>
                    <Typography onClick={()=>history('/')} variant='h5' sx={{flex:2, color:'gold', fontFamily:'Montserrat', fontWeight:'bold', cursor:'pointer'}}>
                        Crypto Study
                    </Typography>
                    <Select  variant="outlined" value={currency} onChange={(e)=>setCurrency(e.target.value)} sx={{color:'white'}} style={{width:100, height:40, marginRight:15}}>
                        <MenuItem value={'usd'}>USD</MenuItem>
                        <MenuItem value={'eur'}>EUR</MenuItem>
                    </Select>
                    {user? <UserSidebar/> :<AuthModal/>}
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    );
    
} 

export default Header;