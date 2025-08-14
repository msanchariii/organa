// import Image from "next/image";
"use client";
import Hero from "@/components/landing/Hero";
import Testimonials from "@/components/landing/Testimonials";

export default function Home() {
    return (
        <div className="min-h-screen bg-linear-to-r from-rose-50 to-teal-50 antialiased">
            <Hero />
            <Testimonials />
        </div>
    );
}
