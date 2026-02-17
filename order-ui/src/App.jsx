import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "./components/Login";
import Orders from "./components/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar"
import RegisterUser from "./components/RegisterUser";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
   <Routes>
     <Route path="/" element={ <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
    
     <Route element= {<Navbar />}/>
      
       

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

       
        <Route path="/admin" element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/products" element={
          <ProtectedRoute>
          <Products />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
          <Cart />
          </ProtectedRoute>} />
          
      </Routes>
   
    </BrowserRouter>
  );
}

export default App;