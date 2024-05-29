import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ItemsPage from './Pages/ItemsPage';
import Order from './Pages/Order';
import Checkout from './Pages/Checkout';
import Dashboard from './Pages/Dashboard';
import AddItems from './Pages/AddItems';
import AddCategory from './Pages/AddCategory';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Layout from './Components/Common/Layout';
import OrderSummery from './Pages/OrderSummery';
import OrderHistory from './Pages/OrderHistory';
import EditPage from './Pages/EditPage';
import Setting from './Pages/Setting';
import PersonalInfo from './Components/Core/Setting/PersonalInfo';
import BusinessInfo from './Components/Core/Setting/BusinessInfo';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfo } from './redux/reducers/userSlice';
import AddEmployee from './Pages/AddEmployee';
import ProtectedRoute from './Components/Core/Auth/ProtectedRoute';
import LoggedInRoute from './Components/Core/Auth/LoggedInRoute';
import KitchenDisplaySystem from './Pages/KitchenDisplaySystem';

function App() {
  const dispatch = useDispatch()
 
  useEffect(()=>{
    console.log('getting user infor 1');
    dispatch(getUserInfo())
    
  },[])
  return (
 <BrowserRouter>

      <div className="App">
        <Routes>
          {/* Separate routes with exact path for login to avoid rendering Navbar */}
          <Route path='/login' element={<LoggedInRoute><Login /></LoggedInRoute>} />
          <Route path='/signup' element={<LoggedInRoute><Signup /></LoggedInRoute>} />

          {/* Introduce a layout component for common elements */}
          

          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path='/orders' element={<ProtectedRoute><Order /></ProtectedRoute>} />
            <Route path='/orders/kitchen' element={<ProtectedRoute><KitchenDisplaySystem/></ProtectedRoute>} />
            <Route path='/sales' element={<ProtectedRoute><Order /></ProtectedRoute>} />
            <Route path='/setting/' element={<ProtectedRoute><Setting /></ProtectedRoute>} >
              <Route index element={<ProtectedRoute><PersonalInfo/></ProtectedRoute>}/>
              <Route path='business' element={<ProtectedRoute><BusinessInfo/></ProtectedRoute>}/>
              <Route path='personal' element={<ProtectedRoute><PersonalInfo/></ProtectedRoute>}/>

            </Route>
              <Route path='setting/business/add-employee' element={<ProtectedRoute><AddEmployee/></ProtectedRoute>}/>
            <Route path='/order-history' element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            <Route path='/order-summery/:orderId' element={<ProtectedRoute><OrderSummery /></ProtectedRoute>} />
            <Route path='/items'>
              <Route index element={<ProtectedRoute><ItemsPage /></ProtectedRoute>} />
              <Route path='check-out' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path='add' element={<ProtectedRoute><AddItems /></ProtectedRoute> }/>
              <Route path='add/add-new-category' element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
              <Route path='edit/:id' element={<ProtectedRoute><EditPage/></ProtectedRoute>}/>
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
