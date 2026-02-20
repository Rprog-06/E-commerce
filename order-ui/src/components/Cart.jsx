import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";

function Cart() {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const hasInitialized = useRef(false);

  // 🔐 Decode token and set userId
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const id = decoded.id || decoded.sub;

      if (!id) {
        window.location.href = "/login";
        return;
      }

      setUserId(id);

    } catch (error) {
      console.error("Invalid token", error);
      window.location.href = "/login";
    }
  }, []);

  // 📦 Load cart when userId is ready
  useEffect(() => {
    if (!userId) return;

    const storedCart =
      JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

    setCart(storedCart);
    hasInitialized.current = true;

  }, [userId]);

  // 💾 Save cart ONLY after initialization
  useEffect(() => {
    if (!userId) return;
    if (!hasInitialized.current) return;

    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));

  }, [cart, userId]);

  // ➕➖ Update quantity
  const updateQuantity = (productId, delta) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + delta;

        if (newQuantity < 1) return item;

        if (newQuantity > item.availableStock) {
          alert("Cannot exceed available stock!");
          return item;
        }

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);
  };

  // ❌ Remove item
  const removeItem = (productId) => {
    const updatedCart = cart.filter(
      (item) => item.productId !== productId
    );
    setCart(updatedCart);
  };

  // 🛒 Place Order
  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderPayload = {
      items: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    try {
      const response = await api.post("/orders", orderPayload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(response.data.message || "Order placed successfully");

      setCart([]);

    } catch (error) {
      alert("Error placing order");
      console.error(error);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
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
          <p>Total: ₹ {item.price * item.quantity}</p>
          <p>Available: {item.availableStock}</p>

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
          <button onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;