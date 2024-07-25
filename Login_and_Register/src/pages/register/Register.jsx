import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
// import Button from '../../components/button/Buttons';
import Button from '@mui/material/Button';


function Register() {
  let email=useRef(null)
  let name=useRef(null)
  let password=useRef(null)
  const[error,setError]=useState({email:false,name:false,password:false})

  const handleSubmit=(e)=>{
    e.preventDefault();
    
    if(email.current.value && name.current.value && password.current.value){
      if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.current.value)){
        setError((prev)=>{
          return{...prev,email:true};
        })
      }
      else{
        setError((prev)=>{
          return{...prev,email:false,name:false,password:false};
        })
        console.log(email.current.value)
        console.log(name.current.value)
        console.log(password.current.value)
      }
    }
    else{
      // console.log("Error")
      if(!email.current.value && !name.current.value && !password.current.value){
        setError((prev)=>{
          return{...prev,email:true,name:true,password:true};
        })
      }
      else if(!email.current.value){
        setError((prev)=>{
          return{...prev,email:true};
        })
      }
      else if(!name.current.value){
        setError((prev)=>{
          return{...prev,name:true};
        })
      }
      else if(!password.current.value){
        setError((prev)=>{
          return{...prev,password:true};
        })
      }
    }

  }
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        width:"100%",
        height:"100vh",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography sx={{textAlign:"center"}} variant='h4'>Register</Typography>
        <Box>
            <TextField inputRef={email} id="outlined-basic" label="Email" variant="outlined" />
            {error.email&&(
            <Typography color={"red"} fontSize={"10px"}>
                Fill the valid email
            </Typography>
            )}
        </Box>
        <Box>
            <TextField inputRef={name} id="outlined-basic" label="Name" variant="outlined" />
            {error.name&&(
            <Typography color={"red"} fontSize={"10px"}>
                Fill the name
            </Typography>
            )}
        </Box>
        <Box>
            <TextField inputRef={password} id="outlined-basic" type='password' label="Password" variant="outlined" />
            {error.password&&(
            <Typography color={"red"} fontSize={"10px"}>
                Fill the password
            </Typography>
            )}
        </Box>
        {/* <Button/> */}
        <Button type='submit' onClick={handleSubmit} variant="contained">Submit</Button>
    </Box>
  )
}

export default Register