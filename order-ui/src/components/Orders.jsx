import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
 
  
  useEffect(() => {
     const user= JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:8080/orders/user/${user.userId || user.id}`)
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