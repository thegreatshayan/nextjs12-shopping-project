import { useEffect, useState } from "react";
import Link from "next/link";

import Layout from "../../components/Layout";

const DashboardPage = () => {
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/summary");

        const data = await response.json();

        setAdminData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li className="w-1/2 p-2 m-2 bg-white rounded-md">
              <Link className="font-bold" href="/admin/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="w-1/2 p-2 m-2 bg-white rounded-md">
              <Link className="font-bold" href="/admin/orders">
                Orders
              </Link>
            </li>
            <li className="w-1/2 p-2 m-2 bg-white rounded-md">
              <Link className="font-bold" href="/admin/products">
                Products
              </Link>
            </li>
            <li className="w-1/2 p-2 m-2 bg-white rounded-md">
              <Link className="font-bold" href="/admin/users">
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3 ">
          <h2 className="mb-4 text-xl">Admin Dashboard</h2>
          <div>
            {adminData.map((item, index) => (
              <div key={index} className="flex p-2">
                <div className="m-5 p-5 bg-white rounded-xl text-center">
                  <p className="text-3xl">{item.ordersCount}</p>
                  <p>Orders</p>
                </div>
                <div className="m-5 p-5 bg-white rounded-xl text-center">
                  <p className="text-3xl">{item.productsCount}</p>
                  <p>Products</p>
                </div>
                <div className="m-5 p-5 bg-white rounded-xl text-center">
                  <p className="text-3xl">{item.usersCount}</p>
                  <p>Users</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

DashboardPage.auth = { adminOnly: true };

export default DashboardPage;
