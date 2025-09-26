import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import TwSizeIndicator from "./TwSizeIndicator";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  applicationName: "e-Likita Hospital Consultant Assistant",
  title: "e-Likita Hospital Consultant Assistant",
  description: "#1 Most Used Health Care Platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" id="_next">
      <body className={poppins.className}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
      <TwSizeIndicator />
    </html>
  );
}
