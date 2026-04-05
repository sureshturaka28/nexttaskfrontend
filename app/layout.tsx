import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}