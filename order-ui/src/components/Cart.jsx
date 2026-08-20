import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";

function Cart() {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [cartError, setCartError] = useState("");
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

    let storedCart = [];
    try {
      const parsedCart = JSON.parse(localStorage.getItem(`cart_${userId}`));
      storedCart = Array.isArray(parsedCart) ? parsedCart.filter((item) => item && item.productId && Number.isInteger(Number(item.quantity)) && Number(item.quantity) > 0) : [];
    } catch {
      localStorage.removeItem(`cart_${userId}`);
    }

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
    setCartError("");
    const updatedCart = cart.map((item) => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + delta;

        if (newQuantity < 1) return item;

        if (newQuantity > item.availableStock) {
          setCartError(`Only ${item.availableStock} unit${item.availableStock === 1 ? "" : "s"} available for ${item.name}.`);
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
      setCartError("Your bag is empty.");
      return;
    }

    const invalidItem = cart.find((item) => !Number.isInteger(Number(item.quantity)) || Number(item.quantity) < 1 || Number(item.quantity) > Number(item.availableStock));
    if (invalidItem) {
      setCartError(`${invalidItem.name} has an invalid quantity. Please update your bag.`);
      return;
    }
    setCartError("");

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
      setCartError(error.response?.data?.message || "We could not place your order. Please try again.");
      console.error(error);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  return (
    <div className="site-main cart-page">
      <div className="page-heading"><div><p className="eyebrow">Almost yours</p><h1>Your bag</h1><p className="subtle">{cart.length} {cart.length === 1 ? "item" : "items"} ready to go home.</p></div></div>
      {cartError && <p className="form-error cart-feedback">{cartError}</p>}
      {cart.length === 0 ? <div className="empty-state"><h3>Your bag is waiting</h3><p className="subtle">Add something from the collection and it will appear here.</p></div> : <div className="cart-layout"><section className="cart-items">{cart.map((item, index) => <article className="cart-item" key={item.productId}><div className={`cart-art product-tone-${index % 4}`} aria-hidden="true">✦</div><div className="cart-item-details"><div><h3>{item.name}</h3><p className="subtle">₹ {item.price} each · {item.availableStock} in stock</p></div><button className="remove-button" onClick={() => removeItem(item.productId)}>Remove</button><div className="quantity-control"><button onClick={() => updateQuantity(item.productId, -1)} aria-label="Decrease quantity">−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.productId, 1)} aria-label="Increase quantity">+</button></div><strong>₹ {item.price * item.quantity}</strong></div></article>)}</section><aside className="order-summary"><p className="eyebrow">Order summary</p><div className="summary-row"><span>Subtotal</span><strong>₹ {totalPrice}</strong></div><div className="summary-row"><span>Delivery</span><span className="free-label">Free</span></div><div className="summary-total"><span>Total</span><strong>₹ {totalPrice}</strong></div><button className="btn btn-primary checkout-button" onClick={placeOrder}>Place order <span aria-hidden="true">→</span></button><p className="secure-note">Secure checkout · Easy returns</p></aside></div>}
    </div>
  );
}

export default Cart;