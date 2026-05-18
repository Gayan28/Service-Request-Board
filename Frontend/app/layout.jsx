import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "GlobalTNA Service Board",
  description: "Mini Service Request Board",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main className="min-h-screen max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}