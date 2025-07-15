"use client"

import { use, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LogOutButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setLoading(false);

        const errorMessage = null;

        if (!errorMessage) {
            toast.success("Logged out successfully");
        }
        router.push("/");
        if (errorMessage) {
            toast.error(errorMessage);
        }
    }
    return (
        <Button
            className="w-24"
            variant={"outline"} 
            onClick={() => { handleLogout() }} 
            disabled={loading}
        >
            {loading ? <Loader2 className="animate-spin" /> : "Logout"}
        </Button>);
}

export default LogOutButton;