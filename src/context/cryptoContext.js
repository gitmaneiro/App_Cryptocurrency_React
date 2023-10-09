import {createContext, useEffect, useState } from "react";

export const CryptoContext= createContext();

export const CryptoProvider=({children})=>{

    const [currency, setCurrency]=useState('usd');
    const [symbol, setSymbol]=useState('$');

    useEffect(()=>{
        if (currency === "usd") setSymbol("$");
    else if (currency === "eur") setSymbol("€");
    },[currency]);

    return(
        <CryptoContext.Provider value={{currency, symbol, setCurrency}}>
            {children}
        </CryptoContext.Provider>
    )
}