import React from 'react';
import {UserContext} from '../../App';
import {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';


const Logout=()=>{
    const navigate=useNavigate();
    const {state,dispatch}=useContext(UserContext);   
    const handleClickLogoutBtn=(e)=>{
        e.preventDefault();
       dispatch({type:"USER",payload:false})
      window.alert("You have Logged out !");
      navigate("/login")
     
    }; 
    useEffect(()=>{
        fetch('/',{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"},credentials:"include"}).then((res)=>{ dispatch({type:'USER',payload:true})
    navigate("/")});
       
    })
    return(
        <Button type="submit" color='inherit' variant="contained" onClick={()=>handleClickLogoutBtn}>Logout</Button>
        );
}
export default Logout