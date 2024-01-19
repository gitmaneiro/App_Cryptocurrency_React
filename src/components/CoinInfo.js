import React, { useEffect, useState, useContext } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoContext } from "../context/cryptoContext";
import axios from "axios";
import { Box, Button, CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { chartDays } from "../config/data";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


const CoinInfo =({coin})=>{

    const [historicacData, setHistoricacData]= useState();
    const [days, setDays]= useState(1);
    const [flag, setflag]= useState(false);


    const{currency}=useContext(CryptoContext);

    const showHistoricacData= async()=>{
        const data= await axios.get(HistoricalChart(coin.id, days , currency));
        console.log(data.data);
        setflag(true);
        setHistoricacData(data.data.prices);
    }


    useEffect(()=>{
        showHistoricacData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, days])


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
            <Box sx={{width:'75%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:5}}>
                {
                    !historicacData | flag===false?(
                        <CircularProgress sx={{color:'gold'}} sixe={250} thickness={1}/>
                    ):(
                        <>
                            <Line
                                data={{
                                    labels: historicacData.map(coin=>{
                                        let date = new Date(coin[0]);
                                        let time =
                                             date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                            return days === 1 ? time : date.toLocaleDateString();
                                    }),

                                    datasets: [
                                        {
                                          data: historicacData.map((coin) => coin[1]),
                                          label: `Price ( Past ${days} Days ) in ${currency}`,
                                          borderColor: "#EEBC1D",
                                        },
                                      ],
                                }}
                                options={{
                                    elements: {
                                      point: {
                                        radius: 1,
                                      },
                                    },
                                  }}
                            >

                            </Line>

                        </>
                    )
                }

                    <Box sx={{display:'flex', marginTop:2, width:'75%', justifyContent:'space-around'}}>
                        { chartDays.map(day=>(
                            <Button variant='outlined' key={day.value} onClick={()=>{setDays(day.value)}} selected={day.value===days} sx={{marginLeft:5}}>{day.label}</Button>
                        ))
                        } 
                    </Box>
            </Box>
        </ThemeProvider>
    );
} 

export default CoinInfo;