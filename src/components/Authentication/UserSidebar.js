import React, {useContext} from "react";

import Drawer from '@mui/material/Drawer';
import { Avatar, Box, Button } from "@mui/material";
import { CryptoContext } from "../../context/cryptoContext";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import {AiFillDelete} from 'react-icons/ai';


const watchlistt= {
  flex: 1,
  width: "100%",
  backgroundColor: "grey",
  borderRadius: 10,
  padding: 2,
  paddingTop: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  overflowY: "scroll",
}

export default function UserSidebar () {
  const [state, setState] = React.useState({right: false});

  const {user, setAlert, watchlist, coins, symbol}=useContext(CryptoContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  const removeFromWatchlist = async (coin)=>{
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

  const logOut= ()=>{
    signOut(auth)

    setAlert({
      open:true,
      type:'success',
      message:'Logout Successfull..'
    });

    toggleDrawer();
  }

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)} 
            sx={{height:30, width:30, cursor:'pointer', backgroundColor:'#EEBC1D'}}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box sx={{width:300, padding:5, height:'100%', display:'flex', flexDirection:'column', fontFamily:'monospace'}}>
                <Box sx={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap: '20px', height: '92%'}}>
                    <Avatar onClick={toggleDrawer(anchor, true)} 
                        sx={{height:140, width:140, cursor:'pointer', backgroundColor:'#EEBC1D', objectFit:'contain'}}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <span style={{width:'100%', fontSize:18, textAlign:'center', fontWeight:'bolder', wordWrap:'break-work'}}>
                        {user.displayName || user.email}
                    </span>
                    <Box sx={watchlistt}>
                        <span style={{fontSize:15, textShadow:'0 0 5px black'}}>WatchList</span>

                        {coins.map(coin=>{
                            if(watchlist.includes(coin.id)){
                                return(
                                  <Box sx={{padding:1, borderRadius:3, color:'black', alignItems:'center', width:'100%', display:'flex', justifyContent:'space-between', backgroundColor:'#EEBC1D'}}>
                                      <span>{coin.name}</span>
                                      <span style={{dispaly:'flex', gap:2}}>
                                          {symbol}
                                          {numberWithCommas(coin.current_price.toFixed(2))}
                                      </span>
                                      <AiFillDelete onClick={()=>removeFromWatchlist(coin)} style={{cursor:'pointer'}} fontSize='14'/>
                                  </Box>
                                )
                            }
                        })}
                    </Box>
                </Box>
                <Button variant='contained' onClick={logOut} sx={{height: '8%', width:'100%', backgroundColor:'#EEBC1D', marginTop:3}}>
                    Log Out
                </Button>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}