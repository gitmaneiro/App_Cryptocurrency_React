import React from "react";
import Box from '@mui/material/Box';
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";


const Banner =()=>{
        return(
            <Box sx={{backgroundImage: 'url(./bannericon0.jpg)'}}>
                <Container sx={{height:400, display:'flex', flexDirection: 'column', paddinTop:25, justifyContent:'space-around'}}>
                    <Box sx={{display:'flex', height:'40%', flexDirection: 'column', justifyContent:'center', textAlign:'center'}}>
                        <Typography variant='h2' style={{fontWeight:'bold', marginBottom:10, fontFamily:'montserrat'}}>
                            Crypto Study
                        </Typography>
                        <Typography  variant='subtitle2' style={{color: "darkgrey", textTransform: "capitalize", fontFamily: "Montserrat"}}>
                            Get all the Info regarding your favorite Crypto Currency
                        </Typography>
                    </Box>
                    <Carousel/>
                </Container>
            </Box>
        );
    } 
    
export default Banner;