import "../styles/globals.css";

import { SessionProvider, useSession } from "next-auth/react";

import { useRouter } from "next/router";

import { CartContextProvider } from "../context/Cart";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        {Component.auth ? (
          <Auth adminOnly={Component.auth.adminOnly}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </CartContextProvider>
    </SessionProvider>
  );
};

const Auth = ({ children, adminOnly }) => {
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized");
    },
  });

  if (status === "loading") {
    return "Loading";
  }

  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized");
    
    return;
  }

  return children;
};

export default MyApp;
