import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { CryptoContext } from "../../context/cryptoContext";
import auth from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp({ handleClose }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { setAlert } = useContext(CryptoContext);


    const enviarDatos = async() => {

        if (password !== confirmPassword) {
            setAlert({
                open: true,
                message: 'Password do not match',
                type: 'error'
            });
            return;
        }

        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
      // Signed in 
       const user = userCredential.user;
       console.log(user);
       console.log('usuario registrado...');

       setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${user}`,
        type: "success",
    });
       handleClose();
      // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        // ..
        });



    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '2' }}>
            <TextField variant='outlined' type='email' label='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField variant='outlined' type='password' label='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
            <TextField variant='outlined' type='password' label='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} fullWidth />
            <Button onClick={enviarDatos} variant='contained' size='large' sx={{ backgroundColor: '#EEBc1D' }}>Sign Up</Button>
        </Box>
    );
}

export default SignUp;