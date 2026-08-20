import { useState } from "react";
import { placeOrder } from "../api/orderApi";

export default function OrderForm() {
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");

  const submit = async () => {
    const data = {
      userId: Number(userId),
      items: [
        { productId: Number(productId), quantity: Number(qty) }
      ]
    };
    const res = await placeOrder(data);
    alert("Order ID: " + res.data);
  };

  return (
    <div>
      <h3>Place Order</h3>
      <input placeholder="User ID" onChange={e => setUserId(e.target.value)} />
      <input placeholder="Product ID" onChange={e => setProductId(e.target.value)} />
      <input placeholder="Quantity" onChange={e => setQty(e.target.value)} />
      <button onClick={submit}>Place</button>
    </div>
  );
}