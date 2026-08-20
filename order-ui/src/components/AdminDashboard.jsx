import { useEffect, useState } from "react";
import api from "../api/api";


function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  const [quantity,setQuantity]=useState("");
  const [stock,setStock]=useState({});
  
   const token = localStorage.getItem("token");

  // 🔥 Reusable fetch function
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products", {
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
    await api.delete(`/products/${id}/stock?amount=${stock}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    setStock({});
    setProducts(products.filter(p => p.id !== id));
  }
    catch(err){
      console.error(err); 
    }
  }
    
    const addProduct= async()=>{
      try{
   const res= await api.post("/products",{
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
      if (!stock[id] || Number(stock[id]) < 1) {
        alert("Enter the number of units to add");
        return;
      }
      try{
    await api.put(`/products/${id}/stock`, {
      quantity: parseInt(stock[id], 10)
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
  

  const totalStock = products.reduce((sum, product) => sum + (Number(product.quantity) || 0), 0);

  return (
    <div className="site-main admin-page">
      <div className="page-heading"><div><p className="eyebrow">Workspace / Admin</p><h1>Good morning.</h1><p className="subtle">Keep your collection fresh and ready to ship.</p></div><span className="admin-live"><i /> Store is live</span></div>
      <section className="admin-stats"><div><span className="stat-label">Products</span><strong>{products.length}</strong><span className="stat-note">in your catalogue</span></div><div><span className="stat-label">Units in stock</span><strong>{totalStock}</strong><span className="stat-note">ready to sell</span></div><div><span className="stat-label">Low stock</span><strong>{products.filter((product) => product.quantity > 0 && product.quantity < 5).length}</strong><span className="stat-note">need attention</span></div></section>
      <section className="admin-add-panel"><div><p className="eyebrow">Catalogue</p><h2>Add a new product</h2><p className="subtle">Make something new available to your customers.</p></div><form className="admin-product-form" onSubmit={(event) => { event.preventDefault(); addProduct(); }}><label><span>Name</span><input placeholder="e.g. Linen throw" value={name} onChange={(event) => setName(event.target.value)} required /></label><label><span>Price</span><input type="number" min="0" placeholder="₹ 0" value={price} onChange={(event) => setPrice(event.target.value)} required /></label><label><span>Opening stock</span><input type="number" min="0" placeholder="0" value={quantity} onChange={(event) => setQuantity(event.target.value)} required /></label><button className="btn btn-primary" type="submit">Add product <span aria-hidden="true">→</span></button></form></section>
      <section className="admin-inventory"><div className="inventory-heading"><div><p className="eyebrow">Inventory</p><h2>All products</h2></div><span className="subtle">{products.length} listings</span></div>{products.length === 0 ? <div className="empty-state"><h3>Your catalogue is empty</h3><p className="subtle">Add your first product above.</p></div> : <div className="inventory-list">{products.map((product) => <article className="inventory-row" key={product.id}><div className="inventory-swatch" aria-hidden="true">✦</div><div className="inventory-name"><h3>{product.name}</h3><span>SKU-{String(product.id).padStart(4, "0")}</span></div><div className="inventory-price">₹ {product.price}</div><div className={`inventory-stock ${product.quantity < 5 ? "is-low" : ""}`}><strong>{product.quantity}</strong><span>{product.quantity < 5 ? "Low stock" : "In stock"}</span></div><div className="inventory-actions"><label className="stock-input"><span>Add units</span><input type="number" min="1" placeholder="0" value={stock[product.id] || ""} onChange={(event) => setStock({ ...stock, [product.id]: event.target.value })} /></label><button className="btn btn-quiet" onClick={() => increaseStock(product.id)}>Restock</button><button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Remove</button></div></article>)}</div>}</section>
    </div>
  );
}

export default AdminDashboard;