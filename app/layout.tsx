import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Compputer Repair Shop",
    description: "A mock computer repair shop with users, staff and tickets",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <main>{children}</main>
            </body>
        </html>
    );
}
