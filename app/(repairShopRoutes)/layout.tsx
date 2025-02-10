import Header from "@/components/Header";

export default function RSLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="px-4 py-2">{children}</main>
        </>
    );
}
