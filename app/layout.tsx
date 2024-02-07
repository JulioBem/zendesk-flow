import "@/styles/globals.css";

export const metadata = {
  title: "Zendesk Flow",
  description: "Create a ticket for Zendesk app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="app">
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">{children}</main>
      </body>
    </html>
  );
}
