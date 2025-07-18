import Link from "next/link";
import Image from "next/image";
import { shadow } from "@/styles/utils";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import LogOutButton from "./LogOutButton";
import { getUser } from "@/auth/server";
import { Sidebar } from "lucide-react";

async function Header() {
    const user = await getUser();

    return (
        <header className="relative flex items-center justify-between h-24 w-full bg-popover px-3 sm:px-8"
            style={{ boxShadow: shadow }}>
            <Link className="flex items-end gap-2" href="/">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="logo"
                />
                <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">AI <span>Notes</span></h1>
            </Link>
            <div className="flex gap-4">
                {user ? (
                    <LogOutButton/>
                ) : (
                    <>
                        <Button asChild className="hidden sm:block">
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/login">Login</Link>
                        </Button>

                    </>
                )}
                <DarkModeToggle />
            </div>
        </header>);
}
export default Header;