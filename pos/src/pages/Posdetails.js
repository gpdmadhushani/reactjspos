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
import { Link, useNavigate } from "react-router-dom";

const Posdetails=()=>{

    const [orders,setorders]=useState(null);

  useEffect (()=>{

    getorders();
    
    
  },[])

  const navigate=useNavigate();
  
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
     }
  const getorders=async()=>{
  
 
    try {
        const response = await axios.get("http://localhost:8080/orders");
        
       // const mn=response.data.order_time;
       setorders2();
       setorders(response.data);

       
       //const res5=response.data.category_id.name;
       //const bn="hi";
      // console.log(bn);
       //console.log(res5);
      // getitems();
       
    }catch (error) {
        
    }
  
    
  }


  
    const setorders2=async() =>{
      const response2 = await axios.get("http://localhost:8080/orders");
      console.log(response2.data.items);
      const df=response2.data;

      const output = Object.assign({}, df)

console.log(output)

df.map(element => {
//console.log(element.items);

//console.log(element.items);
const ds=element.items;
console.log(ds);
const lj=ds.length;
console.log(lj);
const rows = [];

for (let i = 0; i < ds.length; i++) {

 
   // rows.push(element.items.id);
    console.log(ds[i].id);
    rows.push(ds[i].name,);
   
}

//console.log(rows);
const ts="";
ts.concat("asdd");
//console.log(ts);

for (let i = 0; i < rows.length; i++) {

 //ts.concat("ghj");
 // console.log(ts);
 var es=rows[i].toString();
  
if(i==(rows.length-1)){
  es=es+""+rows[i].toString();
  break;
}else{
   
    //const ws=rows[i].toString();
 
   
    es=es+""+rows[i+1].toString();
   
}

console.log(es);
}




//console.log(ds.length);


})


console.log(output[0].id);
      //console.log(response2.data[0].orderTime);
      

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
    <h1 style={{marginTop:"5%"}}>Order Details</h1>

</div>


                    

<Table size="sm" >
  
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Time</th>
          <th>Total</th>
          
          
          
        </tr>
      </thead>
      
      <tbody>
      {orders && orders.map((order1)=>(
        
        <tr>

       
          
          
          <td>{order1.id}</td>
          <td>{order1.orderTime}</td>
          <td>{order1.total}</td>
         
          
          <Button type="submit"  style={{width:"100px",backgroundColor:"mediumpurple",marginLeft:"20%",marginTop:"5%"}}>Details</Button>
          
          

          

          

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
  export default Posdetails;