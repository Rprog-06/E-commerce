import { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  let id = null;
  if (token) {
    const decoded = jwtDecode(token);
    id = decoded.userId || decoded.id; // Adjust based on your token structure
  }
  
 
  
  useEffect(() => {
     const token= (localStorage.getItem("token"));
    axios
      .get(`http://localhost:8080/orders/my`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <div key={order.orderId} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><b>Order ID:</b> {order.orderId}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Date:</b> {order.orderDate}</p>
         
          <ul>
            {order.items.map((item) => (
              <li key={item.productId}>
                {item.productName} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Orders;