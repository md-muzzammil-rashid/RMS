import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
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
            <Route path='/items'>
              <Route index element={<ItemsPage />} />
              <Route path='check-out' element={<Checkout />} />
              <Route path='add' element={<AddItems />} />
              <Route path='add/add-new-category' element={<AddCategory />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
