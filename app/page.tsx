import Link from "next/link";

export default function Home() {
    return (
        <section className="h-screen bg-black text-white bg-homeBackground bg-cover grid place-content-center">
            <article className="space-y-4 p-12 rounded-xl bg-black/65 w-fit">
                <h1 className="text-xl sm:text-2xl">Computer Repair Shop</h1>
                <address>
                    555 Gateway Lane <br />
                    South Wales, UK
                </address>
                <p>Open: 9am - 5pm</p>
                <p>
                    <Link href="tel:01443 000000">01443 000000</Link>
                </p>
            </article>
        </section>
    );
}
