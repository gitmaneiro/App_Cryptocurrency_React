import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CoinInfo from "../components/CoinInfo";
import axios from "axios";
import { CryptoContext } from "../context/cryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Coinpages =()=>{

    const {id}=useParams();
    const [coin, setCoin]= useState();

    const{currency, symbol, user, watchlist, setAlert}=useContext(CryptoContext);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    const showCoin= async ()=>{
        const data= await axios.get(SingleCoin(id));
            setCoin(data.data);
    }

    console.log(user)
    const inwatchlist= watchlist.includes(id);
    
    const addToWatchlist = async()=>{
        const coinRef= doc(db, 'watchlist', user.uid)

        try {
            await setDoc(coinRef, 
                {coin:watchlist? [...watchlist, coin.id] : [coin.id],}    
            );
            
            setAlert({
                open: true,
                message: `${coin.name} added to the watchlist..`,
                type: 'success'
            });

        } catch (error) {
            setAlert({
                open: true,
                message: 'error.message',
                type: 'error'
            });
        }
    }

    const removeFromWatchlist = async ()=>{
        const coinRef= doc(db, 'watchlist', user.uid)

        try {
            await setDoc(coinRef, 
                {coin:watchlist.filter((watch)=> watch !==coin.id)},
                {merge:'true'}    
            );
            
            setAlert({
                open: true,
                message: `${coin.name} Remove from the watchlist..`,
                type: 'success'
            });

        } catch (error) {
            setAlert({
                open: true,
                message: 'error.message',
                type: 'error'
            });
        }

    }


    useEffect(()=>{
        showCoin();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

        if(!coin) return <LinearProgress sx={{backgroundColor:'gold'}}/>

        return(
            <Box sx={{display:'flex'}}>
                <Box sx={{display:'flex', width:'30%', flexDirection:'column', alignItems:'center', marginTop:5, borderRight:'2px solid grey'}}>
                    <img src={coin.image.large} alt={coin.name} height='130' style={{marginBotton:10}}/>
                    <Typography variant="h4" sx={{fontWeight:'bold', marginBottom:2, fontFamily:'Montserrat'}}>
                        {coin.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{width:'100%', fontFamily:'Montserrat', padding:2, paddingBottom:2, paddingTop:0, textAlign:'justify'}}>
                        {coin.description.en.split('. ')[0]}
                    </Typography>
                    <Box sx={{}}>
                        <span style={{display:'flex'}}>
                            <Typography variant="h5" sx={{fontFamily:'montserrat',paddingBottom:2, fontWeight:'bold'}}>
                                Rank:{'  '}{' '}
                            </Typography>
                            &nbsp; &nbsp;
                            <Typography variant="h5" style={{fontFamily:'monserrat'}}>
                                {coin.market_cap_rank}
                            </Typography>
                        </span>
                        <span style={{display:'flex'}}>
                            <Typography variant="h5" sx={{fontFamily:'montserrat',paddingBottom:2, fontWeight:'bold'}}>
                                Current Price:{''}{' '}
                            </Typography>
                            &nbsp; &nbsp;
                            <Typography variant="h5" style={{fontFamily:'monserrat'}}>
                                {symbol}{'  '}
                                {numberWithCommas(coin.market_data.current_price[currency.toLowerCase()])}
                            </Typography>
                        </span>
                        <span style={{display:'flex'}}>
                            <Typography variant="h5" sx={{fontFamily:'Montserrat',paddingBottom:2, fontWeight:'bold'}}>
                                Market Cap:{'  '}{' '}
                            </Typography>
                            &nbsp; &nbsp;
                            <Typography variant="h5" style={{fontFamily:'Monserrat'}}>
                            {symbol}{''}
                                {numberWithCommas(coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}
                            </Typography>
                        </span>
                       {user && (<Button variant='outlined' onClick={inwatchlist? removeFromWatchlist : addToWatchlist} sx={{width:'100%', heigth:40, backgroundColor:inwatchlist? '#ff0000' :'#EEBC1D', color:'black'}}>{inwatchlist? 'Remove from Watchlist' : 'Add to WatchList'}</Button>)}
                    </Box>
                </Box>
                <CoinInfo coin={coin}/>

            </Box>
        );
    } 
    
export default Coinpages;