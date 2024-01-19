import React, { useContext } from "react";
import { CryptoContext } from "../../context/cryptoContext";
import { Snackbar, Stack} from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Alertt=()=>{

    const {alert, setAlert}=useContext(CryptoContext);
 
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlert({open:false});
      };

    return(
        <Stack spacing={2} sx={{ width: '100%' }}>

        <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Stack>
    )
}

export default Alertt;