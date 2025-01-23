import AppShell from "@/components/layouts/AppShell";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { CartProvider } from "@/context/CartContext"; // Import CartProvider

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider> {/* Wrap the application with CartProvider */}
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </CartProvider>
  );
}

