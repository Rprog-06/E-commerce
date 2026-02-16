import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../api";


function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  const [quantity,setQuantity]=useState("");
  const [stock,setStock]=useState("");
  
   const token = localStorage.getItem("token");

  // 🔥 Reusable fetch function
  const fetchProducts = async () => {
    try {
      const res = await API.get("http://localhost:8080/products", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const deleteProduct = async (id) => {
  try{
    await API.delete(`http://localhost:8080/products/${id}/stock?amount=${stock}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    setStock("");
    setProducts(products.filter(p => p.id !== id));
  }
    catch(err){
      console.error(err); 
    }
  }
    
    const addProduct= async()=>{
      try{
    await API.post("/products",{
        name,price,quantity
      },{
        headers:{
          Authorization:"Bearer "+localStorage.getItem("token"),
        }
      })
      
        setProducts([...products,res.data]);
        setName("");
        setPrice("");
        setQuantity("");
        alert("Product added");
      
    }
      catch(err){
        console.error(err);
      }
     }
     const increaseStock = async (id) => {
      try{
    await axios.put(`http://localhost:8080/products/${id}/stock`, {
      quantity: parseInt(stock)
    }, {
         headers: {
           Authorization: "Bearer " + localStorage.getItem("token"),
         },
       })
      
      fetchProducts();
      } catch(err){
        console.error(err);
      }
     }
  

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Add Product</h3>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
      <input placeholder="Quantity" value={quantity} onChange={e=>setQuantity(e.target.value)} />
      <button onClick={addProduct}>Add Product</button>
      <h3>Products</h3>
      {products.length==0
        ? <p>No products available.</p>
        : products.map(p => (
        <div key={p.id}>
          <p>{p.name} - ₹{p.price}</p>
          <p>Quantity: {p.quantity}</p>
          <button onClick={() => deleteProduct(p.id)}>
            Delete
          </button>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)}  style={{ width: "60px", marginLeft: "10px" }} />
          <button onClick={() => increaseStock(p.id)} style={{ marginLeft: "10px" }}>
            Increase Stock
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;