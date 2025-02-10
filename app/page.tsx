import Link from "next/link";

export default function Home() {
    return (
        <section className="h-screen bg-black text-white bg-homeBackground bg-cover grid place-content-center">
            <article className="space-y-10 p-12 rounded-xl bg-black/65 w-fit">
                <h1 className="text-2xl sm:text-3xl text-semibold underline mb-10">
                    Computer Repair Shop
                </h1>
                <div className="flex justify-between items-start">
                    <address>
                        555 Gateway Lane <br />
                        South Wales, UK
                    </address>
                    <p className="flex flex-col">
                        <span>Open: 9am - 5pm</span>
                        <span>Monday - Friday</span>
                    </p>
                </div>
                <p className="text-center text-lg">
                    <Link href="tel:01443 000000">01443 000000</Link>
                </p>
            </article>
        </section>
    );
}
