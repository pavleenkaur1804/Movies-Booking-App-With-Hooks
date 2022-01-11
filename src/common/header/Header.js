import React,{useState} from 'react';
import { makeStyles } from "@material-ui/styles";
import Modal from 'react-modal'
import logo from '../../assets/logo.svg';
import LoginForm from '../login/LoginForm'
import RegisterForm from '../register/RegisterForm';
import './Header.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box  from '@material-ui/core/Box';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Logout from '../logout/Logout'


Modal.setAppElement('#root')
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
       
        width: '25ch',
      },
      
    },
    noBorder: {
        border: "none",
      },
      
  }));

 
const Header=(props)=>{
 
  
  const ButtonSelect=()=>{
  
    
    if(localStorage.getItem("islogged")===true){
      return(
        < Logout />
        );
    }
    else{
      return(
        <Button color='inherit' variant="contained" onClick={()=>{setModalIsOpen(true)}}>Login</Button>
        )}
  }
    const CombinedForm=()=>{
        const [value,setValue]=useState(0);
        const handleChange =(event,newValue)=>{setValue(newValue);};
        const paperStyleCombined={width:340,margin:"20px auto"}
  
        function TabPanel(props) {
           const { children, value, index, ...other } = props;
  
            return (
            <Grid
             role="tabpanel"
             hidden={value !== index}
             id={`simple-tabpanel-${index}`}
             aria-labelledby={`simple-tab-${index}`}
             {...other}>
             {value === index && (
             <Box>
              <Grid>{children}</Grid>
             </Box>
             )}
            </Grid>
                   );
  }
  
  
        return(
            <Grid style={paperStyleCombined}>
              <Tabs className="TabLoginForm"
              TabIndicatorProps={{style: {background:'crimson'}}}
              centered
              value={value}
              variant="fullWidth"
              textColor="inherit"
              onChange={handleChange}>
              
              <Tab label="Login" />
              <Tab label="Register" />
              </Tabs>
                  <TabPanel value={value} index={0}>
                   <LoginForm/>
                  </TabPanel>
                  
                  <TabPanel value={value} index={1}>
                   <RegisterForm/>
                  </TabPanel>
            </Grid>);
    }
    
    const[modalIsOpen,setModalIsOpen]=useState(false)
   
    return(
        <div className='header'>
        <img src={logo} alt='' className='app_logo'/>
    <ButtonSelect />
        
            <Modal className="ModalLogin" isOpen={modalIsOpen} shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true} onRequestClose={()=>setModalIsOpen(false)} style={{overlay:{zIndex: 100,
              backgroundColor: 'rgba(70, 70, 70, 0.5)',display:'flex',justifyContent:'center'}}}
              
            >
            <Paper>
            <CombinedForm />
            </Paper>
            </Modal>
        </div>
        
    );

};
       

export default Header