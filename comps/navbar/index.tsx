import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { FaBars, FaCode, FaCrown, FaDiscord, FaPlus, FaPlusCircle } from "react-icons/fa";
import UserMenu from "./userMenu";
import Link from "next/link";

export default function Navbar(props: any) {
    // const { data: session } = useSession();

    return (
        <div className="navbar rounded-lg fixed top-0 backdrop-blur-lg py-5 z-[99] bg-transparent lg:px-10 px-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <FaBars className="text-2xl" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-md w-64 dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box"
                    >
                        <li>
                            <Link href="/commands">Commands</Link>
                        </li>
                        <li>
                            <a>Resources</a>
                            <ul className="p-2">
                                <li>
                                    <a href="https://docs.seedsbot.xyz" target="_blank">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <Link href="/support">Support Server</Link>
                                </li>
                                <li>
                                    <a href="/blog">Blog</a>
                                </li>
                            </ul>
                        </li>
                        <li className="text-primary font-bold">
                            <Link href="/invite">
                                <FaPlusCircle className="text-md" />
                                Add to Discord
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link className="btn flex btn-ghost normal-case text-xl font-bold" href="/">
                    <Image src="/images/webp/logo.webp" alt="Logo" width={32} height={32} className="rounded-full" />
                    Quack
                </Link>

                <ul className="menu menu-horizontal hidden lg:flex flex-row px-1 text-zinc-300">
                    <li>
                        <Link href="/commands">Commands</Link>
                    </li>
                    <li tabIndex={0}>
                        <details>
                            <summary>Resources</summary>
                            <ul className="p-2  bg-base-200">
                                <li>
                                    <a href="https://docs.quackbot.xyz" target="_blank">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <Link href="/support">Support Server</Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li className="text-primary font-bold">
                        <Link className="normal-case" href="/invite">
                            <FaPlusCircle className="text-md" />
                            Add to Discord
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end gap-4">
                {/* {session?.user ? (
                    <UserMenu user={session?.user as any} />
                ) : (
                    <button
                        className="btn btn-ghost justify-center items-center normal-case"
                        onClick={() => signIn("discord")}
                    >
                        <FaDiscord className="text-2xl" />
                        Login
                    </button>
                )} */}
            </div>
        </div>
    );
}
