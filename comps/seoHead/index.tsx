import Head from "next/head";

export default function SEOHead(props: any) {
    return (
        <Head>
            <title>{props.title || "Quack Discord Bot"}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta
                name="description"
                content={
                    props.description ||
                    "Quack is the easiest moderation bot on Discord. Designed for servers of all sizes, Quack helps you keep your server safe and secure from all types of threats."
                }
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#d79a61" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/webp/logo.webp" />

            {/* //   <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content="https://Quackbot.xyz" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Quack Discord Bot" />
            <meta
                property="og:description"
                content="Quack is the easiest moderation bot on Discord. Designed for servers of all sizes, Quack helps you keep your server safe and secure from all types of threats."
            />
            <meta property="og:image" content="https://Quackbot.xyz/images/webp/logo.webp" />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_small_image" />
            <meta property="twitter:domain" content="Quackbot.xyz" />
            <meta property="twitter:url" content="https://Quackbot.xyz" />
            <meta name="twitter:title" content="Quack Discord Bot" />
            <meta
                name="twitter:description"
                content="Quack is the easiest moderation bot on Discord. Designed for servers of all sizes, Quack helps you keep your server safe and secure from all types of threats."
            />
            <meta name="twitter:image" content="https://Quackbot.xyz/images/webp/logo.webp" />

            {/* Site keywords */}
            <meta
                name="keywords"
                content="Quack, Quackbot, discord, bot, discord bot, moderation, server, levels, economy, website, dickey, Quack, music, levels, discordbot, dashboard, web, add to server, invite, support, help, discord support, bots for discord"
            />
            <meta name="robots" content="index, follow" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="5 days" />
        </Head>
    );
}
