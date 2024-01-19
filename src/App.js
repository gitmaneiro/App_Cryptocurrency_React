import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './App.css';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import Coinpages from './Pages/Coinpages';
import Box from '@mui/material/Box';
import Alertt from './components/Banner/Alert';


function App() {


  return (
    <BrowserRouter>
        <Box sx={{backgroundColor:'#1d1f25', color:'white', minHeight: '100vh' }}>
          <Header/>
            <Routes>
              <Route path='/' element={<Homepage/>} />
              <Route path='/coin/:id' element={<Coinpages/>} />
            </Routes>
        </Box>
        <Alertt/>
    </BrowserRouter>
  );
}

export default App;
