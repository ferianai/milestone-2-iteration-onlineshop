import AppShell from "@/components/layouts/AppShell";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { CartProvider } from "@/context/CartContext"; // Import CartProvider
// import { useRouter } from "next/router";
// import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // const router = useRouter();

  // useEffect(() => {
  //   // Check authentication on route change
  //   const handleRouteChange = () => {
  //     const isAuthenticated = localStorage.getItem("isAuthenticated");
  //     const isAboutPage = router.pathname.startsWith("/about");

  //     console.log(`isAuthenticated: ${isAuthenticated}, isAboutPage: ${isAboutPage}`);

  //     if (!isAuthenticated && isAboutPage) {
  //       router.push("/auth/login");
  //     } else if (isAuthenticated && !isAboutPage) {
  //       router.push("/about");
  //     }

  //   };

  //   // Check on initial load
  //   handleRouteChange();

  //   // Add event listener for route changes
  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   // Remove event listener on component unmount
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   }
  // }, [router]);

  return (
    <CartProvider> {/* Wrap the application with CartProvider */}
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </CartProvider>
  );
}

