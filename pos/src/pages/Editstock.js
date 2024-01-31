import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import bgimage from '../bg17.png';

import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from "axios";
import { useEffect, useState } from "react";

import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from "react-router-dom";

const EditStock=()=>{
  const [itemname,setname]=useState(null);
  const [itemprice,setprice]=useState(null);
  const [itemqoh,setqoh]=useState(null);
  const [categories,setcategories]=useState(null);
  const [items,setitems]=useState(null);

  const [imageitem,setimage]=useState();
  
  const [categoryName,setcategoryname]=useState(null);
  const [itemName,setitemname]=useState(null);
  const [itemName1,setitemname1]=useState(null);
  const [categoryNamenew,setcategorynamenew]=useState(null);
  const [categoryNamenew2,setcategorynamenew2]=useState(null);
  const [categoryname2,setcategoryname2]=useState(null);
  const [itemmanu,setmanu]=useState(null);
  const [stockids,setstock]=useState(null);

  const navigate=useNavigate();
  
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
     }


  const handlename=(event)=>{
    setitemname1(event.target.value);
   
    
 }

 const handleprice=(event)=>{
  setprice(event.target.value);
  
}

const handleqoh=(event)=>{
  setqoh(event.target.value);
  
}

function handleimage(e){
 
console.log(e.target.files);
        setimage(URL.createObjectURL(e.target.files[0]));
     
       //setimage(URL.createObjectURL(e.target.value));
  
 
}


const handlecategory=(event)=>{
 // setcategoryname(event.target.value);
  setcategoryname(parseInt(event.target.value));
  
}

const handleitem=(event)=>{
  setitemname(event.target.value);
  
}

const handlesearchcategory=(event)=>{
  event.preventDefault();
  getcategories();

}
const handlesearchitem=(event)=>{
  event.preventDefault();
  
  getcatname();
  getitemdetails();
  setitemname1();
}

const handlenewcategory=(event)=>{
  event.preventDefault();
  setcategorynamenew(event.target.value);
  

}
const handledes=(event)=>{
  //setdescription(event.target.value)
}

const handlemanu=(event)=>{
  setmanu(event.target.value);
  
}



useEffect (()=>{

  getcategories();
  
  
},[])



const getcategories=async()=>{
  
 
  try {
      const response = await axios.get("http://localhost:8080/categories");
      
    
     setcategories(response.data);
     getitems();
     
  }catch (error) {
      
  }

  
}



const getitems=async()=>{
  
  let cate = document.getElementById('productcategory').value;
  console.log(cate);
  try {
    const response = await axios.get(`http://localhost:8080/categories/${cate}/stocks`);
    
     // const response = await axios.get("http://localhost:8080/categories");
      
    console.log(response.data);
     setitems(response.data);

     
  }catch (error) {
      
  }
}


const getitemdetails=async()=>{
  
  let item = document.getElementById('itemid').value;
  
  try {
    const response = await axios.get(`http://localhost:8080/stocks/${item}`);
    
    //const response=await axios.get(`http://localhost:8080/items/${item}`, {responseType: 'blob'})
     // const response = await axios.get("http://localhost:8080/categories");
      
    console.log(response.data);
     //setitems(response.data);
     setitemname1(response.data.name);
     setprice(response.data.price);
     setqoh(response.data.quentity);
     setmanu(response.data.manufactered);

     

     //setcategorynamenew(categories);

    
    
}catch (error) {
      
  }
}









const getcatname=async()=>{
  
  let catid = document.getElementById('productcategory').value;
  console.log(catid);
  
  try {
    const response = await axios.get(`http://localhost:8080/categories/${catid}`);
    
     // const response = await axios.get("http://localhost:8080/categories");
      
    console.log(response.data.name);
    console.log(response.data.id);
    const cat7=response.data.id;
    setcategoryname(response.data.id);
     //setitems(response.data);
     let cx=response.data.name;
    // categoryname2=cx;
    // console.log(categoryname2);
     setcategoryname2(cx);
     setcategorynamenew2(cx);
     setcategorynamenew(cat7);
     console.log(categoryNamenew);
     console.log(cx);
     //setcategoryname(response.data.category);

     
  }catch (error) {
      
  }
}

const updateitem=async(event)=>{
  event.preventDefault();


  //let category1 = document.getElementById('productcategory').value;
  let cats = document.getElementById('newproductcategory').value;
  
    const response5 = await axios.get(`http://localhost:8080/categories/${cats}`);
    const res8=response5.data;
    console.log(res8)
  
  let item = document.getElementById('itemid').value;
  let manu1=document.getElementById('manu').value;
  let name1 = document.getElementById('name').value;
  let price = document.getElementById('price').value;
  let qoh = document.getElementById('qoh').value;
  
  let cate = document.getElementById('productcategory').value;
  console.log(cate);
  const date5=new Date().toLocaleString();
  const st=" Items edited";
  setmanu(manu1);
  //setname(name1);
  setitemname1(name1);
  setprice(price);
  setqoh(qoh);
console.log(cats);


    // setitems(response.data);

// response3 = await axios.get(`http://localhost:8080/categories/${cats}/items`);
const response13 = await axios.get(`http://localhost:8080/categories/${cate}`);
console.log(response13)

console.log(response13.data);

//console.log(response3.data.category_id);

const data4={
  
  "category_id":res8,
   
  "manufactered":itemmanu,
   
    "name": itemName1,
    "price":itemprice,
    
    
    "quentity":itemqoh,
    "status":st,
    "upadtetime":date5
}
console.log(data4);

//setcategorynamenew(data4);

//console.log(categoryNamenew);

  
    


console.log(item);
  const response = await axios.put(`http://localhost:8080/stocks/${item}`,data4);
 
  console.log(response);
  setname("");
  setprice("");
  setqoh("");
  
  getcategories();
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
   
   
         
          

    <div className='container-fluid' style={{ width:"100vh",height:"130vh"}}>
    <div className="additem-box" >

<div className="text-center mb-5" >
    <h1 style={{marginTop:"10%"}}>Edit Stock</h1>

</div>


<Form inline>
<Row>
     <Form.Select aria-label="Default select example"   onChange={handlecategory} value={categoryName} id={'productcategory'} required style={{width:"80%"}}  >

    
                   <option>Select Category</option>
                  
                    {categories && categories.map((category)=>(
                   
           <option key={category.id}  value={category.id}  >
           
                {category.name}
                
                </option>
                
                       
                     
       ))}


                     
                   
     




      
      
    </Form.Select>
    
    
    <Col xs="auto">
            <Button type="submit" onClick={handlesearchcategory} style={{width:"100px",backgroundColor:"mediumpurple",marginLeft:"20%"}}>Search</Button>
          </Col>
          </Row>
      </Form>


      <Form inline>
<Row style={{marginTop:"5%"}}>
     <Form.Select aria-label="Default select example"  style={{width:"80%"}} onChange={handleitem} value={itemName} id={'itemid'} required >

    
                   <option>Select Item</option>
                  
                    {items && items.map((item)=>(
                   
           <option key={item.name}  value={item.id} >
           
                {item.name}

                





           
                </option>
                
                       
                     
       ))}
      
    </Form.Select>
    
    
    <Col xs="auto">
            <Button type="submit" onClick={handlesearchitem} style={{width:"100px",backgroundColor:"mediumpurple",marginLeft:"20%"}}>Search</Button>
          </Col>
          </Row>
      </Form>



<form  >
<Form.Label column sm="2">
          Name
        </Form.Label>
<div className="form-group mb-3">
    <input type="text" className="form-control"  onChange={handlename} placeholder=" " id={'name'} value={itemName1}   style={{width:"90%"}}    />
    
     </div>
<Form.Label column sm="2">
         Price
        </Form.Label>
        <div className="form-group mb-3">
    <input type="text" className="form-control"  onChange={handleprice}  placeholder=" " value={itemprice} id={'price'}   style={{width:"90%"}}    />
    
     </div>

     <Form.Label column sm="2">
         Quantity
        </Form.Label>
        <div className="form-group mb-3">
    <input type="text" className="form-control"  placeholder=" "  onChange={handleqoh} value={itemqoh} id={'qoh'}  style={{width:"90%"}}    />
    
     </div>

     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"    style={{width:"90%"}}>
        <Form.Label>Manufactured company</Form.Label>
        <Form.Control as="textarea" rows={4}   onChange={handlemanu} value={itemmanu} id='manu' />
      </Form.Group>


     <Form.Label column sm="2">
        Category
        </Form.Label>
     <Form.Select aria-label="Default select example"   onChange={handlenewcategory} value={categoryNamenew} id={'newproductcategory'} required  style={{width:"90%"}} >
     <option>{categoryNamenew2}</option>
                  
                  {categories && categories.map((category)=>(
                 
         <option key={category.id}   value={category.id}  >
         
              {category.name}
         
              </option>
              
                     
                   
     ))}
    </Form.Select> 
   

      {/* <Form.Label column sm="2">
       Select Image
        </Form.Label>
        <div className="form-group mb-3">
     <input type="file"  name='file' id='image'   onChange={handleimage}  style={{width:"90%"}} />
     <Container>
      <Row>
        
        <Col xs={6} md={4}>
          <Image  src={imageitem} id='newimage' thumbnail />
        </Col>
      </Row>
    </Container>
     </div>
         */}


<div id="errorMsg" class="error-message" style={{color:"red"}}>

</div>

<button type="submit" className="btn btn-primary"  onClick={updateitem}  style={{marginLeft:"30%",width:"30%",height:"30%",marginTop:"5%"}}>Submit</button>

</form>
{/* <img src={bgimage} alt="Logo" style={{marginLeft:"80%",marginTop:"20%"}} /> */}

</div>

             </div>
           
             
            

        

        

    </body>

  
   </div>
  
        );


        
  
        }

      
           

export default EditStock;