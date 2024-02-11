import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import { CartContext } from "../context/Cart";

const PaymentPage = () => {
  const router = useRouter();

  const { state, dispatch } = useContext(CartContext);

  const { cart } = state;

  const { paymentMethod } = cart;

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState(paymentMethod);

  const methods = ["Gateway", "offline Payment"];

  const submitHandler = (event) => {
    event.preventDefault();

    if (!selectedPaymentMethod) {
      alert("Select Your Payment Method!");
      return;
    }

    dispatch({
      action: "SAVE_PAYMENT_METHOD",
      payload: selectedPaymentMethod,
    });

    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };

  return (
    <Layout title="Payment Page">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h2 className="mb-4 text-xl">Payment Method</h2>
        {methods.map((item) => (
          <div className="mb-4" key={item}>
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={item}
              type="radio"
              checked={selectedPaymentMethod === item}
              onChange={() => setSelectedPaymentMethod(item)}
            />
            <label className="p-2" htmlFor={item}>
              {item}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push("/shipping")}
            className="rounded-xl bg-gray-300 text-gray-700 px-4 py-2 w-28"
            type="button"
          >
            Back
          </button>
          <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-28">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
};

PaymentPage.auth = true;

export default PaymentPage;
