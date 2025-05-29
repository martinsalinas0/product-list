"use client";
import "bootstrap/dist/css/bootstrap.css";
import { Signika_Negative } from "next/font/google";
import { Provider } from "react-redux";
import store from "@/store/configureStore";

const signikaNegative = Signika_Negative({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={signikaNegative.className}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}