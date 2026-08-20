import { useEffect, useState } from "react";
import api from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
     const token= (localStorage.getItem("token"));
    api
      .get(`/orders/my`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="site-main orders-page">
      <div className="page-heading"><div><p className="eyebrow">Your orbit</p><h1>Order history</h1><p className="subtle">A record of everything on its way to you.</p></div></div>
      {orders.length === 0 ? <div className="empty-state"><h3>No orders yet</h3><p className="subtle">Your next favourite is only a few clicks away.</p></div> : <div className="orders-list">{orders.map((order) => <article className="order-card" key={order.orderId}><div className="order-card-head"><div><p className="eyebrow">Order #{order.orderId}</p><p className="subtle">Placed {order.orderDate}</p></div><span className="status-pill">{order.status}</span></div><div className="order-products">{order.items.map((item) => <div className="order-product" key={item.productId}><span>{item.productName}</span><strong>× {item.quantity}</strong></div>)}</div></article>)}</div>}
    </div>
  );
}

export default Orders;