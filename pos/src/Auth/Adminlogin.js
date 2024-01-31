import bgimage from '../login3.jpg';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Container from 'react-bootstrap/Container';
import Feedback from 'react-bootstrap/Feedback'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState ,useEffect} from 'react';
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Adminlogin=()=>{

    const [username1,setUsername]=useState("");
    const [password1,setPassword]=useState("");
    const navigate=useNavigate();

    const handleUsername=(event)=>{
        setUsername(event.target.value);
            }
        
        const handlePassword=(event)=>{
        setPassword(event.target.value);
                    }
        





    
      const handleSubmit=async(event)=>{
       

        event.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        let errorMsg;
        const passwordRegex = /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/;
        
        if(username.length==0){
            errorMsg = "Please enter user name";
        
         } else if(password.length==0) {
            errorMsg = "Please enter password";
            
            
        } else if(username.length < 8) {
            errorMsg = "Username must have atleast 8 characters";
            
            


        } else if (!passwordRegex.test(password)) {
            errorMsg = "Password must have atleast 8 characters, one uppercase, one lowercase, one number and a symbol";  

            console.log(errorMsg);

        } else {
            errorMsg = "";
        }

    
        document.getElementById('errorMsg').innerHTML = errorMsg;

        const data = {
          "username": username1,
          "password": password1,
      }

      const response = await axios.post("http://localhost:8080/auth/login",data);
      
      console.log(response);
      if(response.status === 200) {
          //store the token in frontend
          localStorage.setItem("token",response.data);

          //Use this as the default token for axios
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

          navigate("/");

      } else {
          console.log("Login error");
      }


            return true;

    }





       
    


    
// function FormExample() {
//     const [validated, setValidated] = useState(false);
  
    
      
  
    
   


       
        

        
        
        
        
        
        
       // event.preventDefault();
       
        
    
  return(
     <div className="App">
           
           
   

    <body style={{backgroundColor:"palegoldenrod "}} >

    <Navbar className="navb" bg="purple" data-bs-theme="purple" style={{height:"70px",color:"black",fontSize:"21px"}} >
      <Container>
        
            <NavDropdown title="Items" id="basic-nav-dropdown" style={{marginLeft:"2%"}}>
              <NavDropdown.Item href="#action/3.1">Add Item</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Edit Item
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Delete Item</NavDropdown.Item>
             
             
            </NavDropdown>
        

            <NavDropdown title="Category" id="basic-nav-dropdown" style={{marginLeft:"1%"}}>
              <NavDropdown.Item href="#action/3.1">Add Category</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Edit Category
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Delete Category</NavDropdown.Item>
              
              
            </NavDropdown>

            <NavDropdown title="Stocks" id="basic-nav-dropdown" style={{marginLeft:"4%"}}>
              <NavDropdown.Item href="#action/3.1">Update Stock</NavDropdown.Item>
              
            </NavDropdown>

            <NavDropdown title="Point of Sale" id="basic-nav-dropdown" style={{marginLeft:"4%"}}>
              
            </NavDropdown>

      </Container>
    </Navbar>
   
    <div className='container-fluid' style={{backgroundImage:`url(${bgimage})`,backgroundRepeat: "no-repeat", width:"100vh",height:"100vh"}}>
          
          



<div className="login-box" >

        <div className="text-center mb-5" >
            <h1 style={{marginTop:"10%"}}>Login</h1>

        </div>
        
        <form onSubmit={handleSubmit} >
        
        <div className="form-group mb-3">
            <input type="text" className="form-control"  placeholder="Username " onChange={handleUsername}   style={{width:"90%"}} id='username'   />
            
             
           
             
            
         
        </div>

        <div className="form-group mb-3">
            <input type="password" className="form-control"  placeholder="Password "  onChange={handlePassword}  style={{width:"90%"}} id='password'   />
           
        </div>

        <div id="errorMsg" class="error-message" style={{color:"red"}}>

</div>

        <button type="submit" className="btn btn-primary" style={{marginLeft:"30%",width:"30%",height:"30%",marginTop:"5%"}}>Submit</button>
        
    </form>

    
</div>

    </div>

    </body>
  
   </div>
  
   
    );


        
  

  
  }

      
           

export default Adminlogin;