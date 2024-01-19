import * as React from 'react';
import { useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
///import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../../firebase/firebaseConfig';
import { CryptoContext } from "../../context/cryptoContext";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const google = {
  padding: 2,
  paddingTop: 0,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: 2,
  fontSize: 18,
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState('1');

  const { setAlert } = useContext(CryptoContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(value);

  const googleProvider= new GoogleAuthProvider();

  const signInWithGoogle= ()=>{
      signInWithPopup(auth, googleProvider).then(res=>{
          setAlert({
            open: true,
            message: `Login successfull. Welcome ${res.user.email}`,
            type: 'success'
          });
      }).catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: 'error'
        });

      });


  }

  return (
    <div>
      <Button onClick={handleOpen}sx={{width:80, height:40, marginLeft:3, backgroundColor:'#EEBC1D', color:'black'}}>Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value} variant="fullWidth" sx={{backgroundColor:'transparent', width:'100%', borderRadius:5}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor:'#1d1f25'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Login"  value="1" />
                        <Tab label="Sign Up" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1"><Login handleClose={handleClose}/></TabPanel>
                <TabPanel value="2"><SignUp handleClose={handleClose}/></TabPanel>
                  <Box sx={google}>
                      <span>OR</span>
                      <GoogleButton onClick={signInWithGoogle} style={{width:'100%', outline:'none'}}/>
                  </Box>
                </TabContext>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}