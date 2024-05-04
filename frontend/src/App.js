import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ItemsPage from './Pages/ItemsPage';
import Navbar from './Components/Navbar';
import Order from './Pages/Order';
import Checkout from './Pages/Checkout';
import Dashboard from './Pages/Dashboard';
import AddItems from './Pages/AddItems';
import AddCategory from './Pages/AddCategory';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Layout from './Components/Layout';
import OrderSummery from './Pages/OrderSummery';
import OrderHistory from './Pages/OrderHistory';
import EditPage from './Pages/EditPage';
import Setting from './Pages/Setting';
import PersonalInfo from './Components/PersonalInfo';
import BusinessInfo from './Components/BusinessInfo';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfo } from './redux/reducers/userSlice';
import AddEmployee from './Pages/AddEmployee';
import axios from 'axios';

function App() {
  const dispatch = useDispatch()
 
  useEffect(()=>{
    dispatch(getUserInfo())
  },[])
  return (
 <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Separate routes with exact path for login to avoid rendering Navbar */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          {/* Introduce a layout component for common elements */}

          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='/orders' element={<Order />} />
            <Route path='/sales' element={<Order />} />
            <Route path='/setting/' element={<Setting />} >
              <Route index element={<PersonalInfo/>}/>
              <Route path='business' element={<BusinessInfo/>}/>
              <Route path='personal' element={<PersonalInfo/>}/>

            </Route>
              <Route path='setting/business/add-employee' element={<AddEmployee/>}/>
            <Route path='/order-history' element={<OrderHistory />} />
            <Route path='/order-summery/:orderId' element={<OrderSummery />} />
            <Route path='/items'>
              <Route index element={<ItemsPage />} />
              <Route path='check-out' element={<Checkout />} />
              <Route path='add' element={<AddItems />} />
              <Route path='add/add-new-category' element={<AddCategory />} />
              <Route path='edit/:id' element={<EditPage/>}/>
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
