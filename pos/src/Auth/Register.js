import bgimage from '../bg8.jpg';


import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState ,useEffect} from 'react';
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Register=()=>{

    const [username1,setUsername]=useState("");
    const [email1,setEmail]=useState("");
    const [password1,setPassword]=useState("");
    const [userrole2,setrole2]=useState("");
    const [compassword,setComPassword]=useState("");
    const [role1,setRole]=useState("");
    const navigate=useNavigate();


    const handleUsername=(event)=>{
        
        setUsername(event.target.value);
            }

            const handleEmail=(event)=>{
                setEmail(event.target.value);
                    }

        
        
        const handlePassword=(event)=>{
        setPassword(event.target.value);
                    }
        
 const handleComPassword=(event)=>{
        setComPassword(event.target.value);
                    }
                    const handleRole=(event)=>{
                        setRole(event.target.value);
                                    }
                        




                                    const handleRegister=async(event)=>{

       

        event.preventDefault();
        let username = document.getElementById('username').value;
       
        let password = document.getElementById('password').value;
        let email = document.getElementById('email').value;
        let confirmPassword = document.getElementById('confirmPassword').value;
        let userrole = document.getElementById('role').value;
        console.log(userrole);
        const re1=userrole;
        setrole2(re1);
        let errorMsg;

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passwordRegex = /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/;
        console.log(username.length);

        if(username.length===0){
   
    errorMsg="please enter username";
    document.getElementById('username').style.border = '1px solid red';
  
}else if(email.length===0){
    document.getElementById('username').style.border = null;
errorMsg="please enter email";
document.getElementById('email').style.border = '1px solid red';
}else if(password.length===0){
    document.getElementById('username').style.border = null;
    document.getElementById('email').style.border = null;
    errorMsg="please enter password";
    document.getElementById('password').style.border = '1px solid red';

}else if(confirmPassword.length===0){
    document.getElementById('username').style.border = null;
    document.getElementById('email').style.border = null;
    document.getElementById('password').style.border = null;
    errorMsg="please enter confirm password";
    document.getElementById('confirmPassword').style.border = '1px solid red';
    

}else if(username.length < 8) {
            errorMsg = "Username must have atleast 8 characters";
            document.getElementById('email').style.border = null;
            document.getElementById('password').style.border = null;
            document.getElementById('confirmPassword').style.border = null;
            document.getElementById('username').style.border = '1px solid red';
           
            
        } else if (!emailRegex.test(email)) {
            errorMsg = "Please enter a valid email address";
            document.getElementById('password').style.border = null;
            document.getElementById('confirmPassword').style.border = null;
            document.getElementById('username').style.border = null;
           
            document.getElementById('email').style.border = '1px solid red';
        } else if (!passwordRegex.test(password)) {
            
            errorMsg = "Password must have atleast 8 characters, one uppercase, one lowercase, one number and a symbol";
            document.getElementById('email').style.border = null;
            document.getElementById('confirmPassword').style.border = null;
            document.getElementById('username').style.border = null;
           
            
            document.getElementById('password').style.border = '1px solid red';
        
        } else if(password !== confirmPassword) {
            errorMsg = "Password and confirm password must be matching";
            document.getElementById('email').style.border = null;
            document.getElementById('password').style.border = null;
            document.getElementById('username').style.border = null;
            document.getElementById('confirmPassword').style.border = '1px solid red';
        } else {
            document.getElementById('email').style.border = null;
            document.getElementById('password').style.border = null;
            document.getElementById('username').style.border = null;
            document.getElementById('confirmPassword').style.border = null;
            errorMsg = "";
            
        }

        document.getElementById('errorMsg').innerHTML = errorMsg;

if(errorMsg.length==0){
        const data={
            "username":username1,
            "password":password1,
            "email":email1,
            "role":userrole
        }
       
        const response=await axios.post(`http://localhost:8080/auth/register`,data);
        console.log(response);
        if((response.status===200) && (userrole=="Admin")){
        console.log("login");
        navigate("/login");

        }else if((response.status===200) && (userrole=="Staff")){
            navigate("/login");
        }else if((response.status===200) && (userrole=="Customer")){
            navigate("/login");
        }else{
            console.log("error");
        }




        return true;
    }else{
        
    }
    }



    
    

  
  return(
    <div className="App" >
           
           
   
    <body style={{backgroundColor:"palegoldenrod "}} >
    
   
     <div className='container-fluid' style={{backgroundImage:`url(${bgimage})`,backgroundRepeat: "no-repeat", width:"150vh",height:"150vh"}} > 
          
          

     <div className='container-fluid'>

     <div className="row">

        <div className="text-center mb-5" >
            <h1 style={{marginTop:"5%"}}>Register</h1>

        </div>
        <form onSubmit={handleRegister}  >
        
        <div className="form-group mb-3">
           
            <input type="text" className="form-control"   onChange={handleUsername}   placeholder="Username "  id="username" style={{width:"65%",marginLeft:"20%"}}/>
        </div>

        <div className="form-group mb-3">
            <input type="text" className="form-control"  onChange={handleEmail}    id='email' placeholder="Email "  style={{width:"65%",marginLeft:"20%"}}/>
        </div>


        <div className="form-group mb-3">
            <input type="password" className="form-control"  onChange={handlePassword}  id='password'  placeholder="Password "  style={{width:"65%",marginLeft:"20%"}}/>
        </div>

        <div className="form-group mb-3">
            <input type="password" className="form-control"  onChange={handleComPassword}  id='confirmPassword' placeholder="Confirm Password " style={{width:"65%",marginLeft:"20%"}}/>
        </div>

        

        <Form.Select aria-label="Default select example"   onChange={handleRole}   id='role' style={{width:"65%",marginLeft:"20%"}} >
      
      <option value="Admin" >Admin</option>
      <option value="Staff">Staff</option>
      <option value="Customer">Customer</option>
    </Form.Select>

    <div id="errorMsg" class="error-message" style={{color:"red",marginLeft:"20%",marginTop:"1%"}}>

</div>


        <button type="submit" className="btn btn-primary" style={{marginLeft:"35%",width:"15%",height:"15%",marginTop:"2%"}}>Submit</button>
        
    </form>

    
</div>
</div>
    </div>

    </body>
  </div>
  
   
   
   
    );

  }


  



    
      
           

export default Register;