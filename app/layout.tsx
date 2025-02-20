import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/themeprovider";

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
        <html lang="en" suppressHydrationWarning>
            <body className={`antialiased`}>
                <ThemeProvider
                    disableTransitionOnChange
                    enableSystem
                    attribute="class"
                    defaultTheme="dark"
                >
                    <main>{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}
