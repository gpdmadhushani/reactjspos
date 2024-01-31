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

const Login=()=>{

    const [username1,setUsername]=useState("");
    const [password1,setPassword]=useState("");
    const [role,setrole]=useState("");
    var[role5]=useState("");
    const navigate=useNavigate();


 
    const handleUsername=(event)=>{
        setUsername(event.target.value);
            }
        
        const handlePassword=(event)=>{
        setPassword(event.target.value);
                    }
        
                    const getusernew=async(e)=>{
                      //const t1=e.target.value;
                      console.log(e);
                     const responseitem2 = await axios.get(`http://localhost:8080/users/${e}`);
                      console.log(responseitem2);
                      var role3=responseitem2.data.role;
                      console.log(role3);
                      role5=role3;
                      setrole(role3);
                      console.log(role5);


                      if(role5=="Admin"){
                        navigate("/home");
                      }else if(role5=="Staff"){
                        navigate("/staffhome"); 
                                
                      }else{
                      navigate("/customerhome");
                      }
                            


                      
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
        if(errorMsg.length==0){
        
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

          const res2=await axios.get("http://localhost:8080/users");
          console.log(res2.data);
     
     const rt=res2.data;
console.log(rt.length);

for (let i = 0; i < rt.length; i++) {

 
  // rows.push(element.items.id);
   console.log(rt[i].username);
   const ds3=rt[i].username;

console.log(ds3);
   if(username1==ds3){
    const idnew=rt[i].id;
    console.log(idnew);
   
   getusernew(idnew);
  break;
   }
}


    
        
        
     
 
 console.log(role5);
 const hj=role5;
 console.log(hj);
 



            return true;
         
    }
  
        }else{

        }

  }


       
    


    
// function FormExample() {
//     const [validated, setValidated] = useState(false);
  
    
      
  
    
   


       
        

        
        
        
        
        
        
       // event.preventDefault();
       
        
    
  return(
     <div className="App">
           
           
   

    <body style={{backgroundColor:"palegoldenrod "}} >

   
      
    <div className='container-fluid' style={{backgroundImage:`url(${bgimage})`,backgroundRepeat: "no-repeat", width:"100vh",height:"100vh"}}>
          
          
    <div className='container-fluid' >

<div className="row" >


<div className="login-box"  >

        <div className="text-center mb-5" style={{marginTop:"10%"}} >
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
<div className='label2'>
<a href="register" class="text-decoration-none">Register Now!</a>
</div>

        <button type="submit" className="btn btn-primary" style={{marginLeft:"30%",width:"30%",height:"30%",marginTop:"5%"}}>Submit</button>
        
    </form>

    
</div>
</div>
</div>
    </div>

    </body>
  
   </div>
  
   
    );


        
  

  
  }

      
           

export default Login;