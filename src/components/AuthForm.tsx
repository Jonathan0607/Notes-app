"use client"

import { useRouter } from "next/navigation";
import { CardContent } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useTransition } from "react";

type Props = {
    type: "login" | "register";
}

function AuthForm({ type }: Props) {
    const isLogin = type === "login";
    const router = useRouter();
    const handleSubmit = async (formData: FormData) => {
        console.log("Form submitted");
    }

    const [isPending, startTransition] = useTransition();

    return (
        <form action={handleSubmit} className="flex flex-col gap-4 p-4">
            <CardContent className="grid w-full gap-4 items-center">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        disabled={isPending}
                    ></Input>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        disabled={isPending}
                    ></Input>
                </div>
            </CardContent>
        </form>

    );
}

export default AuthForm;