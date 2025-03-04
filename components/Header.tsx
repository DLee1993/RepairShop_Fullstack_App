import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import NavButton from "@/components/NavButton";
import { ThemeToggle } from "./ToogleTheme";
import { Button } from "@/components/ui/button";
import { HomeIcon, FileIcon, UsersRoundIcon, LogOutIcon } from "lucide-react";

export default function Header() {
    return (
        <header className="bg-background h-12 p-2 border-b sticky top-0 flex justify-between">
            <NavButton href="/home" label="Home" icon={HomeIcon} />

            <ul className="flex gap-2">
                <li>
                    <NavButton href="/tickets" label="Tickets" icon={FileIcon} />
                </li>
                <li>
                    <NavButton href="/customers" label="Customers" icon={UsersRoundIcon} />
                </li>
                <li>
                    <ThemeToggle />
                </li>
                <li>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="logout"
                        title="logout"
                        className="rounded-full"
                        asChild
                    >
                        <LogoutLink>
                            <LogOutIcon />
                        </LogoutLink>
                    </Button>
                </li>
            </ul>
        </header>
    );
}
