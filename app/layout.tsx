import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/themeprovider";
import { AuthProvider } from "@/app/AuthProvider";

export const metadata: Metadata = {
    title: {
        template: "%s | Computer Repair shop",
        default: "Computer Repair Shop",
    },
    description: "A mock computer repair shop with users, staff and tickets",
    applicationName: "Repair Shop",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
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
        </AuthProvider>
    );
}
