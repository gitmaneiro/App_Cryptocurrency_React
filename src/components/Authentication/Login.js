import React, { useState, useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import { CryptoContext } from "../../context/cryptoContext";
import auth from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";


const Login=({handleClose})=>{

    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const {setAlert}=useContext(CryptoContext);

    const enviarDatos= async()=>{

        if(!email || !password){
            setAlert({
                open:true,
                message:'Please fill all the Fields',
                type:'error',
            });
            return;
        }


        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
             console.log('Entrando al sistema...');

             setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${user}`,
                type: "success",
              });

              handleClose();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    
    };

    return(
        <Box sx={{display:'flex', flexDirection:'column', gap:'8px', padding:'2'}}>
            <TextField variant='outlined' type='email' label='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth/>
            <TextField variant='outlined' type='password' label='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} fullWidth/>
            <Button onClick={enviarDatos} variant='contained' size='large' sx={{backgroundColor:'#EEBc1D'}}>Sign Up</Button>
        </Box>
    )
}

export default Login;