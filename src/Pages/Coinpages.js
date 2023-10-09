import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { Box, LinearProgress, Typography } from "@mui/material";
import CoinInfo from "../components/CoinInfo";
import axios from "axios";
import { CryptoContext } from "../context/cryptoContext";

const Coinpages =()=>{

    const {id}=useParams();
    const [coin, setCoin]= useState();

    const{currency, symbol}=useContext(CryptoContext);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    const showCoin= async ()=>{
        const data= await axios.get(SingleCoin(id));
            setCoin(data.data);
    }

    useEffect(()=>{
        showCoin();
    }, []);

        if(!coin) return <LinearProgress sx={{backgroundColor:'gold'}}/>

        return(
            <Box sx={{display:'flex'}}>
                <Box sx={{display:'flex', width:'30%', flexDirection:'column', alignItems:'center', marginTop:5, borderRight:'2px solid grey'}}>
                    <img src={coin.image.large} alt={coin.name} height='140' style={{marginBotton:15}}/>
                    <Typography variant="h4" sx={{fontWeight:'bold', marginBottom:5, fontFamily:'Montserrat'}}>
                        {coin.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{width:'100%', fontFamily:'Montserrat', padding:5, paddingBottom:5, paddingTop:0, textAlign:'justify'}}>
                        {coin.description.en.split('. ')[0]}
                    </Typography>
                    <Box sx={{}}>
                        <span style={{display:'flex'}}>
                            <Typography variant="h5" sx={{fontFamily:'montserrat',paddingBottom:5, fontWeight:'bold'}}>
                                Rank:{'  '}{' '}
                            </Typography>
                            &nbsp; &nbsp;
                            <Typography variant="h5" style={{fontFamily:'monserrat'}}>
                                {coin.market_cap_rank}
                            </Typography>
                        </span>
                        <span style={{display:'flex'}}>
                            <Typography variant="h5" sx={{fontFamily:'montserrat',paddingBottom:5, fontWeight:'bold'}}>
                                Current Price:{''}{' '}
                            </Typography>
                            &nbsp; &nbsp;
                            <Typography variant="h5" style={{fontFamily:'monserrat'}}>
                                {symbol}{'  '}
                                {numberWithCommas(coin.market_data.current_price[currency.toLowerCase()])}
                            </Typography>
                        </span>
                        <span style={{display:'flex'}}>
                            <Typography variant="h5" sx={{fontFamily:'Montserrat',paddingBottom:5, fontWeight:'bold'}}>
                                Market Cap:{'  '}{' '}
                            </Typography>
                            &nbsp; &nbsp;
                            <Typography variant="h5" style={{fontFamily:'Monserrat'}}>
                            {symbol}{''}
                                {numberWithCommas(coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}
                            </Typography>
                        </span>
                    </Box>
                </Box>
                <CoinInfo coin={coin}/>

            </Box>
        );
    } 
    
export default Coinpages;