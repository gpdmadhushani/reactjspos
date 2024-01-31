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

import Image from 'react-bootstrap/Image';







const EditItem=()=>{
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
  const [itemdes,setdescription]=useState(null);
  const [stockids,setstock]=useState(null);


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
  
  setitemname();
  setitemname1();
}

const handlenewcategory=(event)=>{
  event.preventDefault();
  setcategorynamenew(event.target.value);
  

}


const navigate=useNavigate();
const handleLogout=()=>{
  localStorage.removeItem("token");
  navigate("/login");
   }

   const handledes=(event)=>{
    setdescription(event.target.value)
  }

useEffect (()=>{
  getstocks();
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
  
  let cate = document.getElementById('itemid').value;
  console.log(cate);
  try {
    const response = await axios.get(`http://localhost:8080/items/${cate}/items`);
    
     // const response = await axios.get("http://localhost:8080/categories");
      
    console.log(response.data);
    // setitems(response.data);

     
  }catch (error) {
      
  }
}


const getitemdetails=async()=>{
  
  let item = document.getElementById('itemid').value;
  console.log(item);
  
  
  try {
    const response = await axios.get(`http://localhost:8080/items/${item}`);

     
    //const response=await axios.get(`http://localhost:8080/items/${item}`, {responseType: 'blob'})
     // const response = await axios.get("http://localhost:8080/categories");
      
    console.log(response);
     //setitems(response.data);
     setitemname1(response.data.name);
     setprice(response.data.price);
     setqoh(response.data.quentity);
     setdescription(response.data.description);

     

    // setcategorynamenew(categories);

    }catch (error) {
      
  }
}








const getcatname=async()=>{
  
  let catid = document.getElementById('itemid').value;
  console.log(catid);
  
  try {
    const response = await axios.get(`http://localhost:8080/items/${catid}`);
    
     // const response = await axios.get("http://localhost:8080/categories");
      
    console.log(response.data.name);
    console.log(response.data.id);
    setcategoryname(response.data.id);
    setstock(response.data.stockid);
     //setitems(response.data);
     let cx=response.data.name;
    // categoryname2=cx;
    // console.log(categoryname2);
     setcategoryname2(cx);
     setcategorynamenew2(cx);
     console.log(cx);
     //setcategoryname(response.data.category);

     
  }catch (error) {
      
  }
}


const getstocks=async()=>{
  
 
  try {
      const response = await axios.get("http://localhost:8080/items");
      
    
     setitems(response.data);

     
  }catch (error) {
      
  }
}



const updateitem=async(event)=>{
  event.preventDefault();
  
  let price = document.getElementById('price').value;

   let des = document.getElementById('descs').value;
  
   let category1 = document.getElementById('productcategory').value;
   let name2 = document.getElementById('itemid').value;

   const response9 = await axios.get(`http://localhost:8080/stocks/${name2}`);
   const result=response9.data.name;
   console.log(result);
console.log(name2);

// response3 = await axios.get(`http://localhost:8080/categories/${cats}/items`);
const response3 = await axios.get(`http://localhost:8080/categories/${name2}`);

console.log(response3.data);


let name5 = document.getElementById('itemid').value;

        const response6 = await axios.get(`http://localhost:8080/items/${name2}`);
        const result5=response6.data.name;
        console.log(result5);
        const result2=response6.data.category_id;
        
        const response8 = await axios.get(`http://localhost:8080/stocks/${name2}`);
    
    //const response=await axios.get(`http://localhost:8080/items/${item}`, {responseType: 'blob'})
     // const response = await axios.get("http://localhost:8080/categories");
      
     const result13=response8.data.id;
     

//console.log(response3.data.category_id);

const data4={
        
      
   
      
     
      
  "price":itemprice,
  
  "name": result5,
  //"quentity":itemqoh,
  "description":des,
//"image":image,
  
"stockid":stockids,
"category_id":result2

}
  

//       axios.post(`http://localhost:8080/items`,formData).then((res)=>{
// console.log(res)
//       })


console.log(data4);

setcategorynamenew(data4);

console.log(categoryNamenew);

  

  const response11 = await axios.put(`http://localhost:8080/items/${name2}`,data4);
 
  console.log(response11);
  setname("");
  setprice("");
  setdescription("");
  
  getcategories();
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
      

<div className='container-fluid' style={{ width:"100vh",height:"80vh"}}>
<div className="additem-box" >

<div className="text-center mb-5" >
<h1 style={{marginTop:"5%"}}>Edit Item</h1>

</div>

<form  >

<Form inline>
<Row style={{marginTop:"5%"}}>
 <Form.Select aria-label="Default select example"  style={{width:"80%"}} onChange={handlename} value={itemName1} id={'itemid'} required >


               
              
                {items && items.map((item)=>(
               
       <option key={item.id}  value={item.id} >
       
            {item.name}

            





       
            </option>
            
                   
                 
   ))}
  
</Form.Select>


<Col xs="auto">
        <Button type="submit" onClick={handlesearchitem} style={{width:"100px",backgroundColor:"mediumpurple",marginLeft:"20%"}}>Search</Button>
      </Col>
      </Row>
  </Form>

<Form.Label column sm="2">
     Price
    </Form.Label>
    <div className="form-group mb-3">
<input type="text" className="form-control"  placeholder=" "  onChange={handleprice} value={itemprice} id='price'   style={{width:"90%"}}    />

 </div>

 <Form.Label column sm="2">
    Category
    </Form.Label>
 <Form.Select aria-label="Default select example"   onChange={handlenewcategory} value={categoryNamenew} id={'productcategory'} required  style={{width:"90%"}} >
 <option>{categoryNamenew2}</option>
              
              {categories && categories.map((category)=>(
             
     <option key={category.id}   value={category.id}  >
     
          {category.name}
     
          </option>
          
                 
               
 ))}
</Form.Select> 



 <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"   style={{width:"90%"}}>
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows={4}   onChange={handledes} value={itemdes} id='descs' />
  </Form.Group>


  {/* <Form.Label column sm="2">
    Category
    </Form.Label>
 <Form.Select aria-label="Default select example"   onChange={handlecategory} value={categoryName} id={'productcategory'}      required  style={{width:"90%"}} >
 
              
              {categories && categories.map((category)=>(
             
     <option key={category.id}  value={category.id}   >
     
          {category.name}
     
          </option>
          
                 
               
 ))}
</Form.Select>  */}











{/* <Form.Label column sm="2">
   Select Image
    </Form.Label>
    <div className="form-group mb-3">
 <input type="file"  name='file' id='image'   onChange={handleimage}  style={{width:"90%"}} />
 <Container>
  <Row>
    
    <Col xs={6} md={4}>
      <Image src={image} id='newimage' thumbnail />
    </Col>
  </Row>
</Container>
 </div> */}
    
  

 <div id="errorMsg" class="error-message" style={{color:"red"}}>

</div>

{/* <div>
<Container>
  <Row>
    
    <Col xs={6} md={4}>
      <Image src={image} thumbnail />
    </Col>
  </Row>
</Container>
</div> */}


</form>
{/* <img src={bgimage} alt="Logo" style={{marginLeft:"80%",marginTop:"20%"}} /> */}





</div>

         </div>
       
         <button type="submit" className="btn btn-primary" onClick={updateitem} style={{marginLeft:"55%",width:"15%",height:"10%"}}>Edit</button>

        

    

    

</body>

  
   </div>
  
        );


        
  

  
  }

      
           

export default EditItem;