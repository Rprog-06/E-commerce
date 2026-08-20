import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";
import {useNavigate} from "react-router-dom";
function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const navigate=useNavigate();
  const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded=jwtDecode(token);
    return decoded.id||decoded.sub;   // or payload.sub (check your JWT)
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
  // load products
  useEffect(() => {
    const token = localStorage.getItem("token");
    
   // console.log("Decoded JWT Payload:", payload);


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
    // token = localStorage.getItem("token");
     const userId = getUserIdFromToken();
     if (!userId) {
      alert("Please login first");
      return;
    }
    if (!Number.isInteger(Number(product.quantity)) || Number(product.quantity) < 1) {
      setCartMessage("This product is currently out of stock.");
      return;
    }
    let cart;
    try {
      cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      if (!Array.isArray(cart)) cart = [];
    } catch {
      cart = [];
    }
   
    


    const existingItem = cart.find(
      (item) => item.productId === product.id
    );

    if (existingItem && existingItem.quantity >= product.quantity) {
      setCartMessage(`Only ${product.quantity} unit${product.quantity === 1 ? "" : "s"} available.`);
      return;
    }
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
         
        availableStock: product.quantity,
      });
    }
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    setCartMessage(`${product.name} added to your bag.`);

  };

  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="site-main">
      <section className="storefront-hero">
        <div><p className="eyebrow">Curated for everyday living</p><h1>Good things,<br /><em>beautifully chosen.</em></h1><p className="hero-copy">Thoughtful products for the rituals, rooms, and little moments that make your day.</p></div>
        <div className="hero-shape" aria-hidden="true"><span>new<br />arrivals</span></div>
      </section>
      <div className="shop-toolbar">
        <div><p className="eyebrow">The collection</p><h2>Shop all</h2></div>
        <label className="search-box"><span aria-hidden="true">Search</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find something lovely" /></label>
      </div>
      {cartMessage && <p className="form-success cart-feedback" role="status">{cartMessage}</p>}
      {visibleProducts.length === 0 ? <div className="empty-state"><h3>No products found</h3><p className="subtle">Try another search or check back soon.</p></div> : <div className="product-grid">
        {visibleProducts.map((product, index) => (
          <article className={`product-card product-tone-${index % 4}`} key={product.id}>
            <div className="product-art" aria-hidden="true"><span>{index % 2 === 0 ? "✦" : "◌"}</span></div>
            <div className="product-info"><div className="product-meta"><span>{product.quantity === 0 ? "Sold out" : "In stock"}</span><span>{product.quantity || 0} available</span></div><h3>{product.name}</h3><p className="product-price">₹ {product.price}</p><button className="btn btn-primary product-button" onClick={() => addToCart(product)} disabled={product.quantity === 0}>{product.quantity === 0 ? "Sold out" : "Add to bag"}</button></div>
          </article>
        ))}
      </div>}
      <button className="floating-cart btn btn-quiet" onClick={() => navigate("/cart")}>View your bag <span aria-hidden="true">→</span></button>
    </div>
  );
}

export default Products;
