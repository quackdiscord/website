import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { hog } from "../lib/posthog";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
    if (hog) hog;

    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}
