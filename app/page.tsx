import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#2b2b2b]">
            <Navbar />
            <main className="pt-16">
                <Hero />
            </main>
        </div>
    );
}
