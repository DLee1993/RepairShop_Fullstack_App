export default function RSLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Header here */}
            <main className="px-4 py-2">{children}</main>
        </>
    );
}
