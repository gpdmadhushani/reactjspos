
import './App.scss';


import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './pages/Home.js';


import AddItem from './pages/AddItem.js';
import EditItem from './pages/EditItem.js';
import DeleteItem from './pages/DeleteItem.js';
import AddCategory from './pages/Addcategory.js';
import EditCategory from './pages/EditCategory.js';
import DeleteCategory from './pages/Deletecategory.js';
import AddStock from './pages/Addstock.js';
import EditStock from './pages/Editstock.js';
import Stockdetails from './pages/Stockdetails.js';
import Posdetails from './pages/Posdetails.js';
import Customerhome from './pages/Customerhome.js';
import Staffhome from './pages/Staffhome.js';
import Register from  './Auth/Register';
import Login from './Auth/Login';



import ProductedRoughts from './Utils/ProtectedRoughts';




function App() {
  return (
    <BrowserRouter>
    
  
      <Routes>
      <Route element={<ProductedRoughts/>}>
        <Route index element={<Login/>}/>
       
        <Route path='/additem' element={<AddItem/>} />
        <Route path='/edititem' element={<EditItem/>} />
        <Route path='/deleteitem' element={<DeleteItem/>} />
        <Route path='/addcategory' element={<AddCategory/>} />
        <Route path='/editcategory' element={<EditCategory/>} />
        <Route path='/deletecategory' element={<DeleteCategory/>} />
        <Route path='/addstock' element={<AddStock/>} />
        <Route path='/editstock' element={<EditStock/>} />
        <Route path='/stockdetails' element={<Stockdetails/>} />
        <Route path='/pos' element={<Posdetails/>} />
        <Route path='/customerhome' element={<Customerhome/>} />
        <Route path='/staffhome' element={<Staffhome/>} />
        <Route path='/home' element={<Home/>} />


      </Route>
     
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      
    </Routes>


      
      </BrowserRouter>
  );
}

export default App;
