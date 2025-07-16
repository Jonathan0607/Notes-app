"use client"

import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { loginAction, signUpAction } from "@/actions/users";

type Props = {
    type: "login" | "register";
}

function AuthForm({ type }: Props) {
    const isLogin = type === "login";

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {


        startTransition(async () => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            let errorMessage;
            let title;
            let description;

            if (!email || !password) {
                toast.error("Email and password are required.");
                return;
            }

            if (isLogin) {
                errorMessage = (await loginAction(email, password)).errorMessage;
                title = "Logged in";
                description = "You have successfully logged in.";
            } else {
                errorMessage = (await signUpAction(email, password)).errorMessage;
                title = "Signed up";
                description = "Check your email for a verification link.";
            }

            if (!errorMessage) {
                toast.success(`${title} successfully`, {
                    description,
                });
                router.replace("/");
            } else {
                toast.error(errorMessage, {
                    description: "Please try again.",
                });
            }
        });
    };

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
                    />
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
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-6 mt-4">
                <Button className="w-full" type="submit">
                    {isPending ? <Loader2 className="animate-spin" /> : isLogin ? "Login" : "Register"}
                </Button>
                <p className="text-xs">{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
                <Link
                    href={isLogin ? "/signup" : "/login"}
                    className={`text-blue-500 hover:underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
                >
                    {isLogin ? "Create an account" : "Login to your account"}
                </Link>
            </CardFooter>
        </form>
    );
}

export default AuthForm;