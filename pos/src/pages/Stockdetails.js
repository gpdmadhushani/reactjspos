import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import bgimage from '../bg17.png';

import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import axios from "axios";
import { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from "react-router-dom"



const Stockdetails=()=>{
  const [categories,setstocks]=useState(null);

  useEffect (()=>{

    getstocks();
    
    
  },[])

  const navigate=useNavigate();
  
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
     }
  const getstocks=async()=>{
  
 
    try {
        const response = await axios.get("http://localhost:8080/stocks");
        
      
       setstocks(response.data);
       const res5=response.data.category_id.name;
       const bn="hi";
       console.log(bn);
       console.log(res5);
      // getitems();
       
    }catch (error) {
        
    }
  
    
  }




    return(
        <div className="App">
           
           
   

    <body style={{backgroundColor:"palegoldenrod "}} >

    <Navbar className="navb" bg="purple" data-bs-theme="purple" style={{height:"70px",color:"black",fontSize:"21px"}} >
      <Container>
        
            
      <Nav.Link href="home">Home</Nav.Link>

           

            <NavDropdown title="Stocks" id="basic-nav-dropdown" style={{marginLeft:"4%"}}>
              <NavDropdown.Item href="addstock">Add Stock</NavDropdown.Item>
              <NavDropdown.Item href="editstock">
                Update Stock
              </NavDropdown.Item>
              <NavDropdown.Item href="stockdetails">Stock Details</NavDropdown.Item>
              
              
              
            </NavDropdown>

            
            <Nav.Link href="pos">Point of Sale</Nav.Link>
            <Nav.Link onClick={handleLogout}   >Logout</Nav.Link>
      </Container>
    </Navbar>
   
         
          

    <div className='container-fluid' style={{ width:"100vh",height:"100vh"}}>
    <div className="additem-box" >

<div className="text-center mb-5" >
    <h1 style={{marginTop:"5%"}}>Stock Details</h1>

</div>



<Table striped bordered hover size="sm" >
  
      <thead>
        <tr>
          <th>Name</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Category</th>
          
          <th>Manufactered Company</th>
          <th>Last Update</th>
        </tr>
      </thead>
      
      <tbody>
      {categories && categories.map((category)=>(
        <tr>

       
          
          
          <td>{category.name}</td>
          <td>{category.price}</td>
          <td>{category.quentity}</td>
          <td>{category.category_id.name}</td>
          <td>{category.manufactered}</td>
          <td>{category.upadtetime}</td>
          
          
          

          

          

        </tr>
       ))}
      </tbody>
    </Table>





</div>
       </div>
   
    </body>

  
   </div>
  
        );


        
  

  
  }

      
           

export default Stockdetails;