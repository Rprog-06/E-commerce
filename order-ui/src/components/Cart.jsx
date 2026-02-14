import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
 

  // load cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // update quantity
  const updateQuantity = (productId, delta) => {
  const updatedCart = cart.map((item) => {
    if (item.productId === productId) {

      const newQuantity = item.quantity + delta;

      // Prevent below 1
      if (newQuantity < 1) return item;

      // Prevent exceeding available stock
      if (newQuantity > item.availableStock) {
        alert("Cannot exceed available stock!");
        return item;
      }

      return {
        ...item,
        quantity: newQuantity
      };
    }
    return item;
  });

  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

   
  const placeOrder = async () => {
  const token = (localStorage.getItem("token"));

  if (!token) {
    alert("Please login first");
    return;
  }
  if(cart.length==0){
    alert("Cart is empty");
    return;
  }

  const orderPayload = {
    
    items: cart.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    

      


    }))
  };
  console.log("Sending",orderPayload)

  try {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        
      },
   
      body: JSON.stringify(orderPayload)
    });

    if (!response.ok) {
      const error=await response.text();
      console.error("Order failed:", error);
      throw new Error("Order failed");

    }

    const message = await response.text();
    alert(message);
    

    // clear cart
    localStorage.removeItem("cart");
    setCart([]);

    // redirect
    window.location.href = "/orders";

  } catch (error) {
    alert("Error placing order");
    console.error(error);
  }
};

  // remove item
  const removeItem = (productId) => {
    const updatedCart = cart.filter(
      (item) => item.productId !== productId
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => (
        <div
          key={item.productId}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{item.name}</h4>
          <p>Price: ₹ {item.price}</p>
          <p>Quantity: {item.quantity}</p>
     

          <button onClick={() => updateQuantity(item.productId, -1)}>
            -
          </button>
          <button onClick={() => updateQuantity(item.productId, 1)}>
            +
          </button>

          <button
            onClick={() => removeItem(item.productId)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h3>Total: ₹ {totalPrice}</h3>
          <button style={{ marginTop: "10px" }} onClick={placeOrder} >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;