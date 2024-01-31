import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import bgimage from '../bg17.png';
import axios from "axios";
import { useEffect, useState } from "react";

import Col from 'react-bootstrap/Col';

import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from "react-router-dom";

const Addstock=()=>{
  const [itemname,setname]=useState(null);
  const [itemprice,setprice]=useState(null);
  const [itemqoh,setqoh]=useState(null);
  const [categories,setcategories]=useState(null);
  const [image,setimage]=useState();
  const [categoryName,setcategoryname]=useState(null);
  const [uploadimage,setimageok]=useState("");
  const [itemmanu,setmanu]=useState(null);

 // const [previewImage, setPreviewImage] = useState(null);
 // const [uploadedImage, setUploadedImage] = useState(null);


 const navigate=useNavigate();
  
 const handleLogout=()=>{
   localStorage.removeItem("token");
   navigate("/login");
    }

  const handlename=(event)=>{
    setname(event.target.value);
    
 }

 const handleprice=(event)=>{
  setprice(event.target.value);
  
}

const handleqoh=(event)=>{
  setqoh(event.target.value);
  
}

const handlemanu=(event)=>{
  setmanu(event.target.value);
  
}




const handlecategory=(event)=>{
 // let  integernum = Long(event.target.value);
 // setcategoryname(Number(event.target.value));

 setcategoryname(parseInt(event.target.value));
 //setcategoryname(this.setState({ data: parseInt(event.target.value) }));
}


useEffect (()=>{

  getcategories();
},[])



const getcategories=async()=>{
  
 
  try {
      const response = await axios.get("http://localhost:8080/categories");
      
    
     setcategories(response.data);

     
  }catch (error) {
      
  }
}


const handleSubmit=async(event)=>{
  event.preventDefault();

  
  let category1 = document.getElementById('productcategory').value;
  
    const response5 = await axios.get(`http://localhost:8080/categories/${category1}`);
    const res8=response5.data;
    console.log(res8)

  const st=" Items added";
  let name = document.getElementById('name').value;
        let price = document.getElementById('price').value;
        let qoh = document.getElementById('qoh').value;
       // let images = document.getElementById('newimage').value;
        
        let manu1=document.getElementById('manu').value;
        let errorMsg;
       

        if(name.length==0){
          errorMsg = "Please enter name";
      
       } else if(price.length==0) {
          errorMsg = "Please enter price";

       }else if(qoh.length==0) {
            errorMsg = "Please enter quentity";

          // }else if(uploadimage.length==0) {
           // errorMsg = "Please upload image";
          
          }else if(manu1.length==0) {
            errorMsg = "Please enter company name";
       }else{
        errorMsg = "";
       }

       document.getElementById('errorMsg').innerHTML = errorMsg;
            
      //  const formData =new FormData();
      //  formData.append('image',image);
      //  console.log(image);

      //  const data2={
      //   "image":image
      // }

      
console.log(categoryName);
console.log(manu1);
setmanu(manu1);
console.log(itemmanu);

 

const date5=new Date().toLocaleString();


if(errorMsg==""){
  const data1={
        
    "category_id":res8,
   
    "manufactered":itemmanu,
     
      "name": itemname,
      "price":itemprice,
      
      
      "quentity":itemqoh,
      "status":st,
      "upadtetime":date5
//"image":image,


 
  
  
  }
      
  
//       axios.post(`http://localhost:8080/items`,formData).then((res)=>{
// console.log(res)
//       })

  console.log(data1);
 
console.log(categoryName);
  

  console.log(errorMsg);
  try{
   // const response2=await axios.post(`http://localhost:8080/items`,data2);
  const response=await axios.post(`http://localhost:8080/stocks`,data1);
  
  
  console.log(response);
  // console.log(response2);
  
  }catch{

  }
  deletefields();
  return true;
}else{
return false;
}
 


}
 

const deletefields=()=>{
 // console.log(image);
  setprice("");
  setname("");
  setimage("");
  setqoh("");
  setmanu("");
  // document.getElementById('image').value=null;
  
}


// const handleUploadImage = () => {
//   const data = new FormData();
//   data.append('files[]', previewImage);
  
//   fetch(`http://localhost:8080/items`, { method: 'POST', body: data }).then(async (response) => {
//       const imageResponse = await response.json();
//       setUploadedImage(imageResponse);
//   }).catch((err) => {

//   });
// }









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
    <h1 style={{marginTop:"5%"}}>Add Stock</h1>

</div>

<form onSubmit={handleSubmit} >
<Form.Label column sm="2">
         Item Name
        </Form.Label>
<div className="form-group mb-3">
    <input type="text" className="form-control"  placeholder=" " onChange={handlename} value={itemname} id='name'   style={{width:"90%"}}    />
    
     </div>
<Form.Label column sm="2">
        Unit Price
        </Form.Label>
        <div className="form-group mb-3">
    <input type="text" className="form-control"  placeholder=" "  onChange={handleprice} value={itemprice} id='price'   style={{width:"90%"}}    />
    
     </div>

    

     {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"   style={{width:"90%"}}>
        <Form.Label>Manufactured company</Form.Label>
        <Form.Control as="textarea" rows={4}    value={itemmanu} id='manu' />
      </Form.Group> */}
     
      
     {/* <Form.Label column sm="2">
     Manufactured company
        </Form.Label>
        <div className="form-group mb-3">
    <input type="text" className="form-control"   placeholder=" "  onChange={handlemanu} value={itemmanu} id='manu'   style={{width:"90%"}}    />
    
     </div> */}

     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"   style={{width:"90%"}}>
        <Form.Label>Manufactured company</Form.Label>
        <Form.Control as="textarea" rows={4}   onChange={handlemanu} value={itemmanu} id='manu' />
      </Form.Group>







     <Form.Label column sm="2">
         Quantity
        </Form.Label>
        <div className="form-group mb-3">
    <input type="text" className="form-control"  placeholder=" "  onChange={handleqoh} value={itemqoh} id='qoh'   style={{width:"90%"}}    />
    
     </div>

      <Form.Label column sm="2">
        Category
        </Form.Label>
     <Form.Select aria-label="Default select example"   onChange={handlecategory} value={categoryName} id={'productcategory'}  required  style={{width:"90%"}} >
     
                  
                  {categories && categories.map((category)=>(
                 
         <option key={category.id}  value={category.id}   >
         
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
           
             <button type="submit" className="btn btn-primary" onClick={handleSubmit} style={{marginLeft:"55%",width:"15%",height:"10%"}}>Submit</button>
    
            

        

        

    </body>

  
   </div>
  
        );


        
  

  
  }

      
           

export default Addstock;