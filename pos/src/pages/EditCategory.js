import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bgimage from '../bg17.png';


import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import axios from "axios";
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from "react-router-dom";

const EditCategory=()=>{

  
  const {id}=useParams();
  const [categories,setcategories]=useState(null);
  const [name,setname]=useState(null);

  const [description,setdescription]=useState(null);
  const [categoryName,setcategoryname]=useState(null);


  useEffect (()=>{

    getcategories();
},[])


  const handlecategory=(event)=>{
    setcategoryname(event.target.value);
    
 }
 const handledescription=(event)=>{
setdescription(event.target.value)
 }

 const handlename=(event)=>{
  setname(event.target.value)
   }

   const navigate=useNavigate();
const handleLogout=()=>{
  localStorage.removeItem("token");
  navigate("/login");
   }


const getcategories=async()=>{
  
 
  try {
      const response = await axios.get("http://localhost:8080/categories");
      
    // console.log(response.data);
     setcategories(response.data);

     
  }catch (error) {
      
  }
}




const updatedetails=async(event)=>{
  event.preventDefault();
  let cate = document.getElementById('productcategory').value;

  const data={
        
      
   
      
    "description": description,
    "name": name
    
    

}
console.log(cate);
  const response = await axios.put(`http://localhost:8080/categories/${cate}`,data);
  console.log(response);
  setname("");
  setdescription("");
  setcategoryname("");
  getcategories();
}
const handlesearch=async(event)=>{
  event.preventDefault();
  getcategories();

  

  let cate = document.getElementById('productcategory').value;


  
  console.log("kk");
      console.log(cate);
   const response = await axios.get(`http://localhost:8080/categories/${cate}`);
  
   console.log(response.data);
   const val1=response.data.name;
   console.log(val1);
   
   setname(response.data.name);
  setdescription(response.data.description);
                
               

  
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
    <h1 style={{marginTop:"5%"}}>Edit Category</h1>

</div>

<form inline >
  
<Row>
     <Form.Select aria-label="Default select example"  style={{width:"80%"}} onChange={handlecategory} value={categoryName} id={'productcategory'} required >

    
                   <option>please select</option>
                  
                    {categories && categories.map((category)=>(
                   
           <option key={category.name}  value={category.id} >
           
                {category.name}
           
                </option>
                
                       
                     
       ))}
      
    </Form.Select>
    
    
    <Col xs="auto">
            <Button type="submit" onClick={handlesearch} style={{width:"100px",backgroundColor:"mediumpurple",marginLeft:"20%"}}>Search</Button>
          </Col>
          </Row>
            
          
          
<Form.Label column sm="2">
          Name
        </Form.Label>
<div className="form-group mb-3">
    <input type="text" className="form-control"  placeholder=" "   onChange={handlename} value={name} required style={{width:"90%"}}    />
    
    
     </div>

     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{width:"90%"}}>
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" onChange={handledescription} value={description}   required rows={6} />
      </Form.Group>
     

     
        
        

<div id="errorMsg" class="error-message" style={{color:"red"}}>

</div>

<button type="submit" onClick={updatedetails} className="btn btn-primary" style={{marginLeft:"30%",width:"30%",height:"30%",marginTop:"5%"}}>Submit</button>

</form>
{/* <img src={bgimage} alt="Logo" style={{marginLeft:"80%",marginTop:"20%"}} /> */}

</div>

             </div>
           
             
            

        

        

    </body>

  
   </div>
  
        );


        
                    }

  
  

      
           

export default EditCategory;