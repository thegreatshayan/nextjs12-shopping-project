import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import { CartContext } from "../context/Cart";

const PlaceOrderPage = () => {
  const router = useRouter();

  const { state, dispatch } = useContext(CartContext);

  const {
    cart: { shippingData, paymentMethod, cartItems },
  } = state;

  const placeOrderHandler = async () => {
    const totalPrice = cartItems.reduce(
      (acc, cur) => acc + cur.qty * cur.price,
      0
    );

    try {
      await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          orderItems: cartItems,
          shippingData,
          paymentMethod,
          totalPrice,
        }),
        headers: { "Content-Type": "application/json" },
      });

      router.push("/order-completed");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-lg">Place Order</h1>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-3">
          <div className="p-5">
            <h2 className="text-lg mb-2">Shipping Data</h2>
            <p>
              {`${shippingData.name} - 
              ${shippingData.address} - 
              ${shippingData.postalCode} `}
            </p>
            <div>
              <Link href="/shipping">Edit</Link>
            </div>
          </div>
          <div className="p-5">
            <h2 className="text-lg mb-2">Payment Method</h2>
            <div>{paymentMethod}</div>
            <div>
              <Link href="/payment">Edit</Link>
            </div>
          </div>
          <div className="overflow-x-auto p-5">
            <h2 className="mb-2 text-lg">Order-items</h2>
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td>
                      <div className="flex items-center">
                        <Image
                          src={item.image}
                          width={50}
                          height={50}
                          alt={item.title}
                        />
                        &nbsp;
                        {item.title}
                      </div>
                    </td>
                    <td className="p-5 text-right">{item.qty}</td>
                    <td className="p-5 text-right">{item.price}</td>
                    <td className="p-5 text-right">{item.qty * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <Link href="/cart">Edit</Link>
            </div>
          </div>
        </div>
        <div className="p-5">
          <h2 className="mb-2 text-lg">Order Summary</h2>
          <ul>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Total Price</div>
                <div>
                  {cartItems.reduce((acc, cur) => acc + cur.qty * cur.price, 0)}
                </div>
              </div>
            </li>
            <li>
              <button
                onClick={placeOrderHandler}
                className="rounded-xl bg-gray-700 text-white px-4 py-2"
              >
                Place Order
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(PlaceOrderPage), { ssr: false });
