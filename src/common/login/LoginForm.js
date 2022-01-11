import React,{useState} from 'react';
import '../login/LoginForm.css'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { useEffect } from "react";

import { useNavigate } from 'react-router-dom';
import { FormHelperText } from '@material-ui/core';




   
    const LoginForm=()=>{
    
   const navigate=useNavigate();
      const FormValues={username:"",passwordLogin:""};
      const[formvalues,setFormValues]=useState(FormValues);
      const[formerrors,setFormErrors]=useState({});
      const [isSubmit, setIsSubmit] = useState(false);
    
      const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setFormValues({...formvalues,[name]:value});
        console.log(formvalues)
      }
      
      const handleSubmitLogin=(e)=>{
        
        e.preventDefault();
        setFormErrors(validate(formvalues));
        
        console.log(JSON.parse(localStorage.getItem('UserDetails')))
        let userInfo=JSON.parse(localStorage.getItem('UserDetails'));
       
       
        if((userInfo.email===formvalues.username) && (userInfo.passwordRegister ===formvalues.passwordLogin)&&(formvalues.username!==''&& formvalues.passwordLogin!=='')){
         
          localStorage.setItem("islogged",true);
         navigate("/") 
       
        }
      }
      
      useEffect(() => {
        console.log(formerrors);
        if (Object.keys(formerrors).length === 0 && isSubmit) {
          console.log(formvalues);
        }
      }, [formerrors]);
  
      const validate = (values) => {
        const errors = {};
        
        if (!values.username) {
          errors.username = "required";
        }
        if (!values.passwordLogin) {
          errors.passwordLogin = "required";
        } 
        return errors;
      };
  
        return(
          <form onSubmit={handleSubmitLogin}>
            
            <FormControl sx={{mt:4}}>
            <InputLabel htmlFor="Username">Username</InputLabel>
            <Input id="Username" 
           
            type='text'
            name="username"
            value={formvalues.username}  
            onChange={handleChange}/>
            </FormControl>
            <FormHelperText sx={{color:'red',textAlign:'left',marginLeft:'97px'}}>{formerrors.username}</FormHelperText>
            <FormControl>
            <InputLabel htmlFor="PasswordLogin">Password</InputLabel>
            <Input id="PasswordLogin" 
           variant="filled"
            type='text'
            name='passwordLogin'
            value={formvalues.passwordLogin}
            onChange={handleChange} />
            </FormControl>
            <FormHelperText sx={{color:'red',textAlign:'left',marginLeft:'97px'}}>{formerrors.passwordLogin}</FormHelperText>
            
            <Button type="submit" variant='contained' className='Button' sx={{mt:4,color:'white',bgcolor:'#00008B'}}>Login</Button>
          </form>
        );
    }
    export default LoginForm