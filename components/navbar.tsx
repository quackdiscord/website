"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, PlusCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent backdrop-blur-sm">
            <div className="flex items-center gap-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/images/webp/logo-circle.webp"
                        alt="Quack"
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                    <span className="text-foreground text-lg font-bold">Quack</span>
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/commands"
                        className="text-foreground/80 hover:text-foreground transition-colors text-sm"
                    >
                        Commands
                    </Link>

                    {/* <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors text-sm outline-none">
                            Resources
                            <ChevronDown className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="bg-card border-border">
                            <DropdownMenuItem className="text-foreground/80 hover:text-foreground focus:text-foreground focus:bg-border">
                                <Link href="/docs">Documentation</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground/80 hover:text-foreground focus:text-foreground focus:bg-border">
                                <Link href="/support">Support Server</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground/80 hover:text-foreground focus:text-foreground focus:bg-border">
                                <Link href="/changelog">Changelog</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}

                    <Link
                        href={process.env.NEXT_PUBLIC_BOT_INVITE_LINK || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors text-sm font-bold"
                    >
                        <PlusCircle className="size-4 text-background fill-primary" />
                        Add to Discord
                    </Link>
                </div>
            </div>
        </nav>
    );
}
