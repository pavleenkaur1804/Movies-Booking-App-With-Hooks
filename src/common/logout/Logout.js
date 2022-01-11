import React from 'react';
import {UserContext} from '../../App';
import {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';


const Logout=()=>{
    const navigate=useNavigate();
    const handleClickLogoutBtn=(e)=>{
        e.preventDefault();
      logged.setItem("islogged",false)
      window.alert("You have Logged out !");
      navigate("/")
     
    }; 
    const logged=true;
    useEffect(()=>{
       logged=localStorage.getItem("islogged")
       
    })
    return(
        <Button type="submit" color='inherit' variant="contained" onClick={()=>handleClickLogoutBtn}>Logout</Button>
        );
}
export default Logout