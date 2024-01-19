import {createContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import auth, { db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";


export const CryptoContext= createContext();

export const CryptoProvider=({children})=>{

    const [currency, setCurrency]=useState('usd');
    const [symbol, setSymbol]=useState('$');
    const [coins, setCoins]=useState([]);
    const [loading, setLoading]=useState(false);
    const [user, setUser]=useState(null);
    const [alert, setAlert]=useState({
        open:false,
        message:'',
        type:'success'
    });
    const [watchlist, setWatchlist]=useState([]);

    useEffect(()=>{
        if(user){
            const coinRef= doc(db, 'watchlist', user.uid)
           var unsubscribe = onSnapshot(coinRef, coin=>{
                if(coin.exists()){
                    console.log(coin.data().coin);
                    setWatchlist(coin.data().coin);
                }else{
                    console.log('No items in watchlist..');
                }
            });

            return ()=>{
                unsubscribe();
            }
        }
    }, [user])


    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            if(user)setUser(user);
            else setUser(null);
        })
    },[])


    const showData= async ()=>{
        setLoading(true);
        const data= await axios.get(CoinList(currency));
        console.log(data.data)
        setCoins(data.data)
        setLoading(false);
    }


    useEffect(()=>{
        if (currency === "usd") setSymbol("$");
    else if (currency === "eur") setSymbol("€");
    },[currency]);

    return(
        <CryptoContext.Provider value={{currency, symbol, setCurrency, showData, coins, loading, alert, setAlert, user, watchlist}}>
            {children}
        </CryptoContext.Provider>
    )
}