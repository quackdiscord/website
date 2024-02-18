import Image from "next/image";
import { FaHashtag, FaPlusCircle } from "react-icons/fa";

export default function DiscordElement() {
    return (
        <div className="bg-[#323337] w-full h-full p-4 rounded-lg justify-between flex flex-col">
            <div className="border-b border-zinc-600 flex flex-row pb-4 items-center">
                <FaHashtag className="text-xl text-zinc-400 mr-2" />
                <p className="text-zinc-400 font-medium">general</p>
            </div>

            <div>
                <div className="">
                    <Image src={`/images/png/quack-discord.png`} alt="Discord Image" width={500} height={500} />
                </div>

                <div className="bg-[#373a3f] rounded-lg mt-4 p-3 flex-row flex text-zinc-500 items-center">
                    <FaPlusCircle className="text-xl mr-2" />
                    <p>Message #general</p>
                </div>
            </div>
        </div>
    );
}
