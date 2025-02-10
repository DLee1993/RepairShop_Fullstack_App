import Header from "@/components/Header";

export default function RSLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-4xl mx-auto">
            <Header />
            <main className="px-4 py-2">{children}</main>
        </div>
    );
}
