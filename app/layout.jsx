import "./globals.css";

export const metadata = {
  title: "Breath of Words",
  description: "An AI-powered writing assistant to help you create better content.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
