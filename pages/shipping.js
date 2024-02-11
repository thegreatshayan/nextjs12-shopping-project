import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import { CartContext } from "../context/Cart";

const Shipping = () => {
  const { state, dispatch } = useContext(CartContext);

  const {
    cart,
    cart: { shippingData },
  } = state;

  const router = useRouter();

  const { handleSubmit, setValue, register } = useForm();

  useEffect(() => {
    setValue("name", shippingData.name);
    setValue("address", shippingData.address);
    setValue("postalCode", shippingData.postalCode);
  }, [
    setValue,
    shippingData.name,
    shippingData.address,
    shippingData.postalCode,
  ]);

  const submitHandler = ({ name, address, postalCode }) => {
    dispatch({
      type: "SAVE_SHIPPING_DATA",
      payload: { name, address, postalCode },
    });

    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingData: {
          name,
          address,
          postalCode,
        },
      })
    );

    console.log({ name, address, postalCode });

    router.push("/payment");
  };
  return (
    <Layout title="Shipping">
      <CheckoutWizard activeStep={1} />
      <form className="mx-auto max-w-md" onSubmit={handleSubmit(submitHandler)}>
        <h2 className="mb-4 text-xl">Shipping</h2>
        <div className="mb-4">
          <input
            className="w-full rounded-xl p-2 outline-0"
            id="name"
            placeholder="Name"
            autoFocus
            {...register("name")}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full rounded-xl p-2 outline-0"
            id="address"
            placeholder="Address"
            {...register("address")}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full rounded-xl p-2 outline-0"
            id="postalCode"
            placeholder="Postal Code"
            {...register("postalCode")}
          />
        </div>
        <div className="mb-4">
          <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-28">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
};

Shipping.auth = true;

export default Shipping;
