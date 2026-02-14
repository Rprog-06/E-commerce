import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  const [quantity,setQuantity]=useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/products", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(res => setProducts(res.data))
    .catch(err => console.error(err));
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:8080/products/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(() => {
      setProducts(products.filter(p => p.id !== id));
    });
  }
    
    const addProduct= async()=>{
      axios.post("http://localhost:8080/products",{
        name,price,quantity
      },{
        headers:{
          Authorization:"Bearer "+localStorage.getItem("token"),
        }
      })
      .then(res=>{
        setProducts([...products,res.data]);
        setName("");
        setPrice("");
        setQuantity("");
        alert("Product added");
      })
      .catch(err=>console.error(err));
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
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;