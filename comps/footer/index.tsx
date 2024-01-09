import Image from "next/image";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <>
            <footer className="footer p-10 bg-base-100 text-base-content border-t-[1px] border-neutral">
                <aside>
                    <Image src="/images/webp/logo.webp" width={50} height={50} alt="Seeds Logo" />
                    <div className="w-3/4">
                        <p>Making Discord safer, one server at a time.</p>

                        <div className="flex flex-row items-center gap-2 my-2 opacity-40">
                            <a
                                className="hover:opacity-40 cursor-pointer transition-all ease-in-out duration-150"
                                href="https://github.com/seedsdiscord"
                                target="_blank"
                            >
                                <FaGithub className="text-xl" />
                            </a>
                            <a
                                className="hover:opacity-40 cursor-pointer transition-all ease-in-out duration-150"
                                href="/discord"
                                target="_blank"
                            >
                                <FaDiscord className="text-xl" />
                            </a>
                            <a
                                className="hover:opacity-40 cursor-pointer transition-all ease-in-out duration-150"
                                href="https://twitter.com/kyledickeyy"
                                target="_blank"
                            >
                                <FaTwitter className="text-xl" />
                            </a>
                        </div>

                        <p className="opacity-40">
                            © 2023
                            <a
                                className="link link-hover link-primary text-inherit mx-1"
                                href="https://dickey.gg"
                                target="_blank"
                            >
                                Object
                            </a>
                            LLC.
                        </p>
                    </div>
                </aside>
                <nav>
                    <header className="footer-title">Seeds</header>
                    <a className="link link-hover link-primary text-white" href="/commands">
                        Commands
                    </a>
                    <a className="link link-hover link-primary text-white" href="/premium">
                        Premium
                    </a>
                    <a className="link link-hover link-primary text-white" href="/status">
                        Status
                    </a>
                    <a className="link link-hover link-primary text-white" href="/blog">
                        Blog
                    </a>
                </nav>
                <nav>
                    <header className="footer-title">Support</header>
                    <a className="link link-hover link-primary text-white" href="/docs">
                        Documentation
                    </a>
                    <a className="link link-hover link-primary text-white" href="/commands">
                        Commands
                    </a>
                    <a className="link link-hover link-primary text-white" href="/discord">
                        Support Server
                    </a>
                    <a className="link link-hover link-primary text-white" href="/discord">
                        Contact Us
                    </a>
                </nav>
                <nav>
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover link-primary text-white" href="/terms">
                        Terms of use
                    </a>
                    <a className="link link-hover link-primary text-white" href="/privacy">
                        Privacy policy
                    </a>
                    <a className="link link-hover link-primary text-white" href="/cookies">
                        Cookie policy
                    </a>
                </nav>
            </footer>
        </>
    );
}
