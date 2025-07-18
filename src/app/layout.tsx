import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers /ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/appsidebar";
import NoteProvider from "@/providers /NoteProvider";

export const metadata: Metadata = {
    title: "[BEST] Note Taking app",
    description: "created to help young students take notes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NoteProvider>
                        <SidebarProvider>
                            <AppSidebar />
                            <div className="flex flex-col min-h-screen w-full">
                                <Header />
                                <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">{children}</main>
                            </div>

                        </SidebarProvider>

                        <Toaster />
                    </NoteProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
