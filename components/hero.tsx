"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Shield,
    Server,
    Users,
    Zap,
    TriangleAlert,
    HelpCircle,
} from "lucide-react";
import { DiscordIcon } from "@/components/icons/discord";
import { commandCategories } from "@/lib/commands";

type Stats = {
    servers: number;
    users: number;
    commandsRun: number;
};

const defaultStats: Stats = {
    servers: 0,
    users: 0,
    commandsRun: 0,
};

function getCommands() {
    return commandCategories.flatMap((category) => category.commands.map((command) => `/${command.name}`));
}

export function Hero() {
    const [stats, setStats] = useState<Stats>(defaultStats);
    const [isLoading, setIsLoading] = useState(true);
    const commandShowcase = getCommands()

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/stats");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchStats();
    }, []);
    return (
        <section className="h-[calc(100vh-64px)] flex flex-col">
            <div className="flex-1 flex items-center px-6 lg:px-16">
                <div className="max-w-7xl mx-auto w-full">
                    {/* Main content */}
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                        {/* Left side */}
                        <div className="flex-1 text-center lg:text-left">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-sm text-primary font-medium">{commandShowcase.length} commands available</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-4">
                                Discord moderation
                                <br />
                                <span className="text-primary">made simple</span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-6">
                                Warnings, bans, case tracking, tickets, logging, and more.
                                Everything you need to keep your server safe.
                            </p>

                            {/* CTAs */}
                            <div className="flex gap-3 w-full max-w-lg mx-auto lg:mx-0 mb-6">
                                <Button
                                    asChild
                                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 rounded-full justify-center"
                                >
                                    <Link
                                        href={process.env.NEXT_PUBLIC_BOT_INVITE_LINK || ""}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <DiscordIcon className="size-5 mr-2" />
                                        Add to Your Server
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="bg-secondary flex-1 text-muted-foreground hover:text-foreground hover:bg-secondary/80 font-medium h-12 rounded-full justify-center"
                                >
                                    <Link
                                        href={process.env.NEXT_PUBLIC_SUPPORT_SERVER_LINK || ""}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <HelpCircle className="size-4 mr-2" />
                                        Need Help?
                                    </Link>
                                </Button>
                            </div>

                            {/* Stats - simple inline */}
                            <div className="flex items-center gap-6 justify-center lg:justify-start text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Server className="size-4" />
                                    <span>
                                        <span className="text-foreground font-semibold">
                                            {isLoading ? "..." : stats.servers.toLocaleString()}
                                        </span> servers
                                    </span>
                                </div>
                                <div className="w-px h-4 bg-border" />
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="size-4" />
                                    <span>
                                        <span className="text-foreground font-semibold">
                                            {isLoading ? "..." : formatNumber(stats.users)}
                                        </span> users
                                    </span>
                                </div>
                                <div className="w-px h-4 bg-border" />
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Zap className="size-4" />
                                    <span>
                                        <span className="text-foreground font-semibold">
                                            {isLoading ? "..." : formatNumber(stats.commandsRun)}
                                        </span> commands run
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Discord mockup */}
                        <div className="hidden lg:block w-full max-w-md lg:max-w-lg shrink-0">
                            <DiscordMockup />
                        </div>
                    </div>
                </div>
            </div>

            {/* Command ticker */}
            <div className="shrink-0 overflow-hidden border-t border-border/50 py-3 bg-secondary/30">
                <div className="animate-marquee flex gap-8 whitespace-nowrap">
                    {[...commandShowcase, ...commandShowcase, ...commandShowcase].map((cmd, i) => (
                        <span key={i} className="text-muted-foreground/60 font-mono text-sm">
                            {cmd}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

function DiscordMockup() {
    return (
        <div className="bg-discord-bg rounded-lg overflow-hidden shadow-2xl shadow-black/30 border border-white/5">
            {/* Channel header */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-discord-embed/50 border-b border-white/5">
                <span className="text-muted-foreground">#</span>
                <span className="text-foreground/90 font-medium text-sm">mod-logs</span>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-4">
                <Message
                    command="/warn"
                    user="mod"
                >
                    <Embed color="primary">
                        <div className="flex items-center gap-2 mb-2">
                            <TriangleAlert className="size-4 text-primary" />
                            <span className="text-foreground font-medium text-sm">Warning Issued</span>
                        </div>
                        <div className="space-y-1 text-sm">
                            <div>
                                <span className="text-muted-foreground">User: </span>
                                <span className="text-discord-blurple">@troublemaker</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Reason: </span>
                                <span className="text-foreground/80">Spamming</span>
                            </div>
                        </div>
                        <div className="text-[10px] text-muted-foreground/60 mt-2">Case #1847</div>
                    </Embed>
                </Message>

                <Message
                    command="/ban"
                    user="mod"
                >
                    <Embed color="red">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="size-4 text-red-400" />
                            <span className="text-foreground font-medium text-sm">User Banned</span>
                        </div>
                        <div className="space-y-1 text-sm">
                            <div>
                                <span className="text-muted-foreground">User: </span>
                                <span className="text-discord-blurple">@spambot</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Reason: </span>
                                <span className="text-foreground/80">Raid attempt</span>
                            </div>
                        </div>
                        <div className="text-[10px] text-muted-foreground/60 mt-2">Case #1848 | Appeals enabled</div>
                    </Embed>
                </Message>
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
                <div className="flex items-center gap-2 bg-discord-embed rounded px-3 py-2">
                    <span className="text-muted-foreground/40 text-sm">Message #mod-logs</span>
                </div>
            </div>
        </div>
    );
}

function Message({
    command,
    user,
    children,
}: {
    command: string;
    user: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex gap-3">
            <div className="shrink-0">
                <div className="size-10 rounded-full overflow-hidden">
                    <Image
                        src="/images/webp/logo-circle.webp"
                        alt="Quack"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground/60 mb-0.5">
                    {user} used <span className="text-discord-blurple">{command}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary font-semibold text-sm">Quack</span>
                    <span className="bg-discord-blurple text-white text-[10px] px-1 py-0.5 rounded font-medium">BOT</span>
                </div>
                {children}
            </div>
        </div>
    );
}

function Embed({
    children,
    color,
}: {
    children: React.ReactNode;
    color: "primary" | "red";
}) {
    const borderColors = {
        primary: "var(--primary)",
        red: "#f87171",
    };

    return (
        <div
            className="bg-discord-embed rounded p-3 border-l-4"
            style={{ borderLeftColor: borderColors[color] }}
        >
            {children}
        </div>
    );
}

function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
}
