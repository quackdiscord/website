import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://quackbot.xyz";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Quack - Discord Moderation Bot",
        template: "%s | Quack",
    },
    description:
        "Quack is a powerful Discord moderation bot with warnings, bans, case tracking, tickets, logging, appeals, and more. Keep your server safe with 43+ commands.",
    keywords: [
        "Discord bot",
        "Discord moderation",
        "moderation bot",
        "Discord mod bot",
        "ban bot",
        "kick bot",
        "warning system",
        "case management",
        "ticket system",
        "Discord logging",
        "server moderation",
        "Discord appeals",
        "auto moderation",
        "Quack bot",
    ],
    authors: [{ name: "Quack" }],
    creator: "Quack",
    publisher: "Quack",
    applicationName: "Quack",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        siteName: "Quack",
        title: "Quack - Discord Moderation Bot",
        description:
            "Powerful Discord moderation with warnings, bans, case tracking, tickets, logging, and appeals. 43+ commands to keep your server safe.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Quack - Discord Moderation Bot",
        description:
            "Powerful Discord moderation with warnings, bans, case tracking, tickets, logging, and appeals. 43+ commands to keep your server safe.",
    },
    icons: {
        icon: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
    alternates: {
        canonical: siteUrl,
    },
};

export const viewport: Viewport = {
    themeColor: "#e5a92d",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Script
                    src="https://cdn.visitors.now/v.js"
                    data-token={process.env.VISITORS_TOKEN}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#2b2b2b]`}
            >
                {children}
            </body>
        </html>
    );
}
