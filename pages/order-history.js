import { useEffect, useState } from "react";

import Layout from "../components/Layout";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/orders/history");

      const data = await response.json();

      setOrders(data.orders);
    };

    fetchOrders();
  }, []);

  return (
    <Layout title="Order History">
      {orders.map((item) => (
        <div key={item._id} className="flex p-2">
          <div className="px-2">{item._id}</div>
          <div className="px-2">{item.totalPrice}</div>
        </div>
      ))}
    </Layout>
  );
};

export default OrderHistoryPage;
