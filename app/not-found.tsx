import Image from "next/image";
import notFound from "@/public/images/not-found-1024x1024.png";

export const metadata = {
    title: "Page not found",
};

export default function NotFound() {
    return (
        <div className="px-2 w-full h-screen flex flex-col justify-center items-center gap-10">
            <h2 className="text-2xl">Page Not Found</h2>
            <Image
                src={notFound}
                width={250}
                height={250}
                sizes="250px"
                priority={true}
                className="m-0 rounded-xl"
                alt="Page not found"
                title="Page not found"
            />
        </div>
    );
}
