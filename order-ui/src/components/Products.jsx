import { useEffect, useState } from "react";
import Cart from "./Cart";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";
function Products() {
  const [products, setProducts] = useState([]);

  // load products
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }
    api
      .get("/products",
        {
          headers: {  
            "Authorization": `Bearer ${token}`
           
        }
  })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  
  // add to cart
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
         
        availableStock: product.quantity,
      });
    }
    if(product.quantity===0){
      alert("Product is out of stock!");
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");

  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{product.name}</h4>
          <p>₹ {product.price}</p>
          <p>Quantity :{product.quantity || "NA"} </p>


          <button onClick={() => addToCart(product)} disabled={product.quantity === 0}
            style={{ backgroundColor: product.quantity === 0 ? "gray" : "blue", color: "white" }}>
            Add to Cart
          </button>
          <button onClick={()=> window.location.href="/cart"} style={{ marginLeft: "10px" }}>
            View Cart
          </button>
       
    
            
        </div>
      ))}
    </div>
  );
}

export default Products;
