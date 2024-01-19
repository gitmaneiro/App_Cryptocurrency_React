import React, { useContext, useEffect, useState } from "react";

import { CryptoContext } from "../context/cryptoContext";
import { Container, LinearProgress, TableCell, TableContainer, Table, TableHead, TableRow, TextField, Typography, createTheme, TableBody, Pagination, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";


const TableCoins =()=>{

    const [search, setSearch]= useState('');
    const [page, setPage]= useState(1);

    const{currency, symbol, showData, coins, loading }=useContext(CryptoContext);
    const navigate= useNavigate();

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }



    console.log(coins);
    useEffect(()=>{
        showData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currency])

    const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

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
            <Container sx={{textAlign: 'center'}}>
                <Typography variant='h4' sx={{margin:3, color:'white', fontFamily:'Montserrat'}}>
                    Cryptocurrency by Market Cap
                </Typography>
                <TextField label="Search For a Crypto..." variant="standard" onChange={(e)=>setSearch(e.target.value)} sx={{marginBottom:5, width:'100%', color:'white'}}/>
                <TableContainer>
                    {
                        loading ?(
                            <LinearProgress sx={{backgroundColor:'gold'}}></LinearProgress>
                        ): (
                            <Table>
                                <TableHead sx={{backgroundColor:'#EEBC1D'}}>
                                    <TableRow>
                                        <TableCell sx={{color:'black', fontWeight:700, fontFamily:'Monserrat'}}>Coin</TableCell>
                                        <TableCell sx={{color:'black', fontWeight:700, fontFamily:'Monserrat', textAlign:'right'}}>Price</TableCell>
                                        <TableCell sx={{color:'black', fontWeight:700, fontFamily:'Monserrat', textAlign:'right'}}>24h Change</TableCell>
                                        <TableCell sx={{color:'black', fontWeight:700, fontFamily:'Monserrat', textAlign:'right'}}>Market Cap</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((rowCoin)=>{
                                            let profit= rowCoin.price_change_percentage_24h > 0;

                                            return(
                                                <TableRow key={rowCoin.name} onClick={() => navigate(`/coin/${rowCoin.id}`)} sx={{backgroundColor: '#16171a', cursor: 'pointer', fontFamily: "Montserrat" }}>
                                                    <TableCell component='th' scope='row' sx={{display:'flex', gap:3}}>
                                                        <img src={rowCoin.image} alt={rowCoin.name} height='40' style={{marginBotton:3}}/>
                                                        <div style={{display:'flex', flexDirection:'column'}}>
                                                            <span style={{textTransform: 'uppercase', fontSize:20, color:'white'}}>{rowCoin.symbol}</span>
                                                            <span style={{color:'darkgrey'}}>{rowCoin.name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell sx={{textAlign:'right', color:'white'}}>
                                                            {symbol}{''}
                                                            {numberWithCommas(rowCoin.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell sx={{textAlign:'right'}} style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500}}>
                                                            {profit && '+'}
                                                            {rowCoin.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell sx={{textAlign:'right', color:'white'}}>
                                                        {symbol}{''}
                                                        {numberWithCommas(rowCoin.market_cap.toString().slice(0, -6))}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }

                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                <Pagination count={(handleSearch().length/10).toFixed(0)} onChange={(_, value) =>{setPage(value); window.scroll(0, 450);}} color="primary" sx={{padding:5, width:'100%', display:'flex', justifyContent:'center'}}/>
            </Container>
        </ThemeProvider>
    );
} 
        
    export default TableCoins;
