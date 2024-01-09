import { FaDiscord, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";

export default function SmallFooter(props: any) {
    return (
        <>
            <footer className="footer py-6 text-base-content sm:justify-between justify-center">
                <aside className="items-center grid-flow-col justify-center">
                    <Image src="/images/webp/logo.webp" width={30} height={30} alt="Seeds Logo" />
                    <div className="flex flex-col ml-2 justify-center">
                        <p className="opacity-40">© 2023 Object LLC.</p>
                    </div>
                </aside>
                <nav className="md:place-self-center md:justify-self-end justify-self-center">
                    <div className="grid grid-flow-col gap-4">
                        <div className="flex flex-row items-center gap-4 opacity-40">
                            <a
                                className="hover:opacity-40 cursor-pointer transition-all ease-in-out duration-150"
                                href="https://github.com/seedsdiscord"
                                target="_blank"
                            >
                                <FaGithub className="text-2xl" />
                            </a>
                            <a
                                className="hover:opacity-40 cursor-pointer transition-all ease-in-out duration-150"
                                href="/discord"
                                target="_blank"
                            >
                                <FaDiscord className="text-2xl" />
                            </a>
                            <a
                                className="hover:opacity-40 cursor-pointer transition-all ease-in-out duration-150"
                                href="https://twitter.com/kyledickeyy"
                                target="_blank"
                            >
                                <FaTwitter className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </nav>
            </footer>
        </>
    );
}
