import { useContext, useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import { Menu } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartContext } from "../context/Cart";
import DropDown from "./DropDown";

const Layout = ({ children, title }) => {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;

  const { status, data: session } = useSession();

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((acc, cur) => acc + cur.qty, 0));
  }, [cart.cartItems]);

  const logoutHandler = () => {
    Cookies.remove();

    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <Head>
        <title>{title} - Shopping</title>
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="bg-gray-100 flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-14 px-8 justify-between items-center border-b-4 bg-white">
            <Link href="/" className="text-lg font-bold">
              Shopping
            </Link>
            <div>
              <Link className="p-2" href="/cart">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-xl bg-gray-200 px-2 py-1 text-xs font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === "loading" ? (
                "Loading..."
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-500">
                    {session.user.name}
                    <Menu.Items
                      className="absolute right-0 w-56 bg-white rounded-xl p-4 origin-top-right
                      border-w border-slate-100"
                    >
                      <Menu.Item>
                        <DropDown
                          className="flex p-2 text-gray-950"
                          href="/profile"
                        >
                          Profile
                        </DropDown>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          href="#"
                          className="flex p-2 text-gray-950"
                          onClick={logoutHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <DropDown
                          className="flex p-2 text-gray-950"
                          href="/order-history"
                        >
                          Order History
                        </DropDown>
                      </Menu.Item>
                      {session.user.isAdmin && (
                        <Menu.Item>
                          <DropDown
                            className="flex p-2 text-gray-950"
                            href="/admin/dashboard"
                          >
                            Admin Dashboard
                          </DropDown>
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Menu.Button>
                </Menu>
              ) : (
                <Link className="p-2" href="/login">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10">
          Footer
        </footer>
      </div>
    </>
  );
};

export default Layout;
