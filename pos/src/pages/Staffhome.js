import bgimage from '../bg5.jpg';
import Navbar from 'react-bootstrap/Navbar';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Staffhome=()=>{


  const [items, setItems] = useState(null);
  const [product, setProducts] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderProducts2, setOrderProducts2] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
     }

  const getProducts = async () => {
      const response = await axios.get('http://localhost:8080/items');
      setItems(response.data);
  }


const getstockdata=async(e)=>{
  //const t1=e.target.value;
  console.log(e);
  const responseitem2 = await axios.get(`http://localhost:8080/items/${e}`);
  const g1=responseitem2.data.id;
  const responseitem3 = await axios.get(`http://localhost:8080/items/${g1}`);
const g2=responseitem3.data.stockid;
const responseitem4 = await axios.get(`http://localhost:8080/stocks/${g2}`);

const g3=responseitem4.data.quentity;
console.log(g3);
const qohnew=g3-1;
console.log(qohnew);


const data4={
  
  "category_id":responseitem4.data.category_id,
   
  "manufactered":responseitem4.data.manufactered,
   
    "name": responseitem4.data.name,
    "price":responseitem4.data.price,
    
    
    "quentity":qohnew,
    "status":responseitem4.data.status,
    "upadtetime":responseitem4.data.upadtetime
}
console.log(data4);

const rs1=responseitem4.data.id;
const response7 = await axios.put(`http://localhost:8080/stocks/${rs1}`,data4);

console.log(response7);

  
  //console.log(responseitem4);
}

  const createOrder = async () => {
      const productIds = orderProducts.map(obj => obj.id);
      const data = {
          items: productIds
      }

     

      

console.log(productIds);
      const response = await axios.post("http://localhost:8080/orders", data);
      console.log(response);
      const getid=response.data.id;
      const hj=response.data.items;
      
     
      const responseitem = await axios.get(`http://localhost:8080/orders/${getid}`);
      console.log(responseitem.data.items);
      const rt=responseitem.data.items;
      
      

      rt.map(element => {
       
            
               // {element}
               console.log(element.id);
               const ds=element.id;
               getstockdata(ds);
              // const responseitem7 =  axios.get(`http://localhost:8080/items/${ds}`);
              //const responseitem7 =  axios.get(`http://localhost:8080/items/${74}`);
       //console.log(responseitem7);
    })

     // const re1=responseitem.data.items;
     // console.log(re1);
     // const responseitem2 = await axios.get(`http://localhost:8080/items/${re1}`);
     // const re3=responseitem2.data.stockid;

//const responseitem3 = await axios.get(`http://localhost:8080/stocks/${re3}`);
//console.log(responseitem3);

     

      if(response.status === 201) {
          setOrderProducts([]);
          setTotal(0);






         // setTax(0);
      } else {
          //show error message
      }
  

    }

  useEffect(() => {
    getProducts();
}, []);

useEffect(() => {
    
},[total]);




  
  return(
    <div className="App" >
           
           
    <header className="App-header"  style={{minHeight:"10vh"}} >
    
      
    
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
       
        
        
        
        

        




   
</header>
    <body style={{backgroundColor:"palegoldenrod "}}>
    
    <div className='container-fluid'  >

<div className="container-fluid">
                
                <div className="row">
                    <div className="col-md-6">
                        

                        {/* {items && items.map(item => (
                            <div className="product-box px-2 py-2">
                                {item.name} - {item.price}

                                <button className="btn btn-sm btn-primary" onClick={() => {
                                    setOrderProducts([...orderProducts, product]);

                                    let currentTotal = total;
                                    currentTotal = currentTotal + product.price;
                                    setTotal(currentTotal);

                                }}>Add to Order</button>

                            </div>
                        ))} */}
                    {/* </div> */}
                    {items && items.map(item => (
                    <Card style={{ width: '25rem' ,height:'12rem' ,marginTop:"5%",marginLeft:"5%"}}>
      
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          Rs:{item.price}
        </Card.Text>

        <Card.Text>
          {item.description}
        </Card.Text>
        {/* <Button variant="primary">Add to Order</Button> */}

        <button className="btn btn-sm btn-primary" onClick={() => {
                                    setOrderProducts([...orderProducts, item]);

                                    let currentTotal = total;
                                    currentTotal = currentTotal + item.price;
                                    setTotal(currentTotal);

                                }}>Add to Order</button>


      </Card.Body>
    </Card>

))}
</div>
                    <div className="col-md-6">
                        <h2>Order</h2>

                        <table className="table table-stripped">
                            <thead>
                                <tr>
                                    
                                    <th>Product Name</th>
                                    <th>Price (Rs)</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {orderProducts && orderProducts.map(product => (
                                    <tr>
                                        
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        
                                    </tr>
                                ))}

                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan={1}>
                                        Total
                                    </th>
                                    <th>
                                        {total}
                                    </th>
                                </tr>
                                
                            </thead>
                        </table>

                        <button className="btn btn-secondary" onClick={createOrder}>Complete Order</button>
                    </div>
                </div>

            </div>


    </div>


    
            
        








    </body>
  </div>
   
   
   
    );



} 
  



    
      
           

export default Staffhome;