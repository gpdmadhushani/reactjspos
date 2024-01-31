import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import bgimage from '../bg17.png';
import axios from "axios";
import { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from "react-router-dom";

const AddCategory=()=>{
  
  const [catogoryname,setname]=useState(null);
  const [description,setdescription]=useState(null);
  


  const handlename=(event)=>{
    setname(event.target.value);
    
 }
 
 const navigate=useNavigate();
const handleLogout=()=>{
  localStorage.removeItem("token");
  navigate("/login");
   }


 const handledescription=(event)=>{
  setdescription(event.target.value);
  
}


const handleSubmit=async(event)=>{
  event.preventDefault();
  
  let name = document.getElementById('name').value;
        let des = document.getElementById('des').value;
        let errorMsg;

        if(name.length==0){
          errorMsg = "Please enter name";
      
       } else if(des.length==0) {
          errorMsg = "Please enter description";
       }else{
        errorMsg = "";
       }

       document.getElementById('errorMsg').innerHTML = errorMsg;
            
if(errorMsg==""){
  const data={
        
      
   
      
      "description": description,
      "name": catogoryname
      
      
 
  }

      
  

  console.log(data);
  try{
  const response=await axios.post(`http://localhost:8080/categories`,data);
  
  
  console.log(response);
   
  
  }catch{

  }
  deletefields();
  return true;
}else{
return false;
}
 


}
 

const deletefields=()=>{
  setdescription("");
  setname("");
}



  
            
            
            
       


            
       


    return(
        <div className="App">
           
           
        
    
 

    <body style={{backgroundColor:"palegoldenrod "}} >

    <Navbar className="navb" bg="purple" data-bs-theme="purple" style={{height:"70px",color:"black",fontSize:"21px"}} >
  <Container>
  <Nav.Link href="staffhome">Home</Nav.Link>
        <NavDropdown title="Items" id="basic-nav-dropdown" style={{marginLeft:"2%"}}>
          <NavDropdown.Item href="additem">Add Item</NavDropdown.Item>
          <NavDropdown.Item href="edititem">
            Edit Item
          </NavDropdown.Item>
          <NavDropdown.Item href="deleteitem">Delete Item</NavDropdown.Item>
         
         
        </NavDropdown>
    

        <NavDropdown title="Category" id="basic-nav-dropdown" style={{marginLeft:"2%"}}>
          <NavDropdown.Item href="addcategory">Add Category</NavDropdown.Item>
          <NavDropdown.Item href="editcategory">
            Edit Category
          </NavDropdown.Item>
          <NavDropdown.Item href="deletecategory">Delete Category</NavDropdown.Item>
          
          
        </NavDropdown>

        {/* <NavDropdown title="Stocks" id="basic-nav-dropdown" style={{marginLeft:"4%"}}>
          <NavDropdown.Item href="addstock">Add Stock</NavDropdown.Item>
          <NavDropdown.Item href="editstock">
            Update Stock
          </NavDropdown.Item>
          <NavDropdown.Item href="stockdetails">Stock Details</NavDropdown.Item>
          
          
          
        </NavDropdown>

        
        <Nav.Link href="pos">Point of Sale</Nav.Link> */}

<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
  </Container>
</Navbar>
   
         
          

    <div className='container-fluid' style={{ width:"100vh",height:"100vh"}}>
    <div className="additem-box" >

<div className="text-center mb-5" >
    <h1 style={{marginTop:"5%"}}>Add Category</h1>

</div>

<form onSubmit={handleSubmit}  >
<Form.Label column sm="2">
          Name
        </Form.Label>
<div className="form-group mb-3">
    <input type="text" className="form-control"   placeholder=" "  onChange={handlename}   style={{width:"90%"}} value={catogoryname} id='name'   />
    
     </div>

     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"   style={{width:"90%"}}>
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={6}   onChange={handledescription} value={description} id='des' />
      </Form.Group>
     

     
        
        

<div id="errorMsg" class="error-message" style={{color:"red"}}>

</div>


<button type="submit"    style={{marginLeft:"30%",width:"30%",height:"30%",marginTop:"5%"}}   className="btn btn-primary"    >Submit</button>
                    
      
          
</form>


          
        
        
        



{/* <img src={bgimage} alt="Logo" style={{marginLeft:"80%",marginTop:"20%"}} /> */}

</div>

             
           
             
            

            
</div>
           
                



        

    </body>

  
   </div>
  
        );


        
  

  
  }

      
           

export default AddCategory;