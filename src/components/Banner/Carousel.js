import React, { useContext, useState, useEffect } from "react";
import Box from '@mui/material/Box';
import axios from "axios";
import { CryptoContext } from "../../context/cryptoContext";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";



function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const Carousel =()=>{

    const [trending, setTrending]=useState([]);

    const {currency, symbol}=useContext(CryptoContext);

    const [moneda, setMoneda]=useState('eur');

    const showtrendingCoin= async ()=>{
        const data= await axios.get(TrendingCoins(currency));
        console.log(data.data)
        setTrending(data.data)
    }

    useEffect(()=>{
        showtrendingCoin()
    },[currency]);



    const responsive = {
        0: {
          items: 2,
        },
        512: {
          items: 4,
        }
      };

    
      const items= trending.map((coin)=>{
        let profit = coin.price_change_percentage_24h >= 0;
        return(
            <Link style={{display:'flex', flexDirection:'column', alignItems:'center', color:'white',cursor: 'pointer', textTransform: 'uppercase'}} to={'/coin/${coin.id}'}>
                <img src={coin.image} alt={coin.image} height='80' style={{marginBottom:12}}/>
                <span>{coin.symbol}
                    &nbsp;
                    <span style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight:500}}>
                        {profit && '+'}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </span>
                
                <span  style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    return(
        <Box sx={{height:'50%', display:'flex', alignItems:'center'}}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControl   
                responsive={responsive}
                autoPlay
                items={items}
            />
        </Box>
    );
} 

export default Carousel;