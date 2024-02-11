import Link from "next/link";

import Layout from "../components/Layout";

const OrderCompletedPage = () => {
  return (
    <Layout title="Order Completed">
      <h2>Thanks For Order</h2>
      <Link href="/order-history">View Order Histor!</Link>
    </Layout>
  );
};

export default OrderCompletedPage;
