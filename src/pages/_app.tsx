import type { AppProps } from "next/app";
import { UserProvider } from "../components/UserContext";
import "../styles/globals.css";
import { Heebo } from "next/font/google";

const heebo = Heebo({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <main className={heebo.className}>
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
}
