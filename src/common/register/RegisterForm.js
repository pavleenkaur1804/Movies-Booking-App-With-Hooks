import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { useEffect } from "react";
import '../register/RegisterForm.css'
import { FormHelperText } from '@material-ui/core';



   
 
    const RegisterForm=()=>{
      const FormValues={email:"",passwordRegister:"",lastName:"",firstName:"",contactNo:""};
      const[formvalues,setFormValues]=useState(FormValues);
      const[formerrors,setFormErrors]=useState({});
      const [isSubmit, setIsSubmit] = useState(false);
     
      
      const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setFormValues({...formvalues,[name]:value});
        console.log(formvalues)
      }
    
      const handleSubmitRegister=(e)=>{
        e.preventDefault();
        setFormErrors(validate(formvalues));
        setIsSubmit(true)
        const UserDetails=formvalues;
        localStorage.setItem('UserDetails',JSON.stringify(UserDetails))
      };
      useEffect(() => {
        console.log(formerrors);
        if (Object.keys(formerrors).length === 0 && isSubmit) {
          console.log(formvalues);
          setIsSubmit(true);
          
          
        }
      }, [formerrors]);
  
     
  
  
      const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
       
        if (!values.firstName) {
          errors.firstName = "required";
        }
        if(!values.lastName){
          errors.lastName="required";
        }
      
        if (!values.contactNo) {
          errors.contactNo = "required";
        }
        if (!values.email) {
          errors.email = "required";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }
       
        if (!values.passwordRegister) {
          errors.passwordRegister = "required";
        } else if (values.passwordRegister.length < 4) {
          errors.password = "Password must be more than 4 characters";
        } else if (values.passwordRegister.length > 10) {
          errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
      };
  
     
     
        return(
          
          <form onSubmit={handleSubmitRegister}>
            
            <FormControl sx={{mt:4}}>
            <InputLabel htmlFor="FirstName">First Name</InputLabel>
            <Input id="FirstName" 
            type='text'
            name="firstName"
            value={formvalues.firstName}  
            onChange={handleChange}/>
            </FormControl>
            <FormHelperText sx={{color:'red',textAlign:'left',marginLeft:'97px'}}>{formerrors.firstName}</FormHelperText>
            <FormControl>
            <InputLabel htmlFor="LastName">Last Name</InputLabel>
            <Input id="LastName" 
            type='text'
            name='lastName'
            value={formvalues.lastName}
            onChange={handleChange} />
            </FormControl>
            <FormHelperText sx={{color:'red',textAlign:'left',marginLeft:'97px'}}>{formerrors.lastName}</FormHelperText>
            <FormControl>
            <InputLabel htmlFor="Email">Email</InputLabel>
            <Input id="Email"
            variant="filled"
            type='text' 
            name='email'
            value={formvalues.email}
            onChange={handleChange} />
            </FormControl>
            <FormHelperText sx={{color:'red',textAlign:'left',marginLeft:'97px'}}>{formerrors.email}</FormHelperText>
            <FormControl>
            <InputLabel htmlFor="PasswordRegister">Password</InputLabel>
            <Input id="passwordRegister"
            variant="filled"
            type='text' 
            name='passwordRegister'
            value={formvalues.passwordRegister}
            style={{textAlign:'center',margin:'2%'}}
            onChange={handleChange} />
            </FormControl>
            <FormHelperText sx={{color:'red',textAlign:'left',marginLeft:'97px'}}>{formerrors.passwordRegister}</FormHelperText>
            <FormControl>
            <InputLabel htmlFor="ContactNo">Contact No</InputLabel>
            <Input id="ContactNo" 
            type='text'
            name='contactNo'
            value={formvalues.contactNo}
            style={{textAlign:'center',margin:'2%'}}
            onChange={handleChange} />
            </FormControl>
            <FormHelperText sx={{color:'red',textAlign:'left',marginLeft:'97px'}}>{formerrors.contactNo}</FormHelperText>
            
            {Object.keys(formerrors).length === 0 && isSubmit ? (
              <FormHelperText sx={{color:'black',textAlign:'center'}}>Registration Successful. Please Login!</FormHelperText>
            ) :null}
            <Button type="submit" variant='contained' className='Button' sx={{mt:4,color:'white',bgcolor:'#00008B'}}>Register</Button>
            </form> 
            );
    }
export default RegisterForm