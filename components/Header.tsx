import { HomeIcon, FileIcon, UsersRoundIcon } from "lucide-react";
import NavButton from "@/components/NavButton";

export default function Header() {
    return (
        <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 flex justify-between">
            <NavButton href="/home" label="Home" icon={HomeIcon} />

            <ul className="flex gap-2">
                <li>
                    <NavButton href="/tickets" label="Tickets" icon={FileIcon} />
                </li>
                <li>
                    <NavButton href="/customers" label="Customers" icon={UsersRoundIcon} />
                </li>
            </ul>
        </header>
    );
}
