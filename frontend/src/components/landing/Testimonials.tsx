"use client";

import React from "react";
import { motion } from "framer-motion";

type Testimonial = {
    name: string;
    role: string;
    description: string;
};

const testimonialsData: Testimonial[] = [
    { name: "Teesta Mukherjee", role: "Heart Recipient", description: "Thanks to organ donation, I got a second chance at life. Now I can watch my children grow up." },
    { name: "Arun Verma", role: "Kidney Recipient", description: "Dialysis was draining my life, but the transplant gave me the freedom to live again." },
    { name: "Nisha Kapoor", role: "Liver Donor (Living)", description: "Donating part of my liver to my father was the best decision of my life. He's healthier than ever." },
    { name: "Ravi Subramanian", role: "Donor's Brother", description: "Losing my sister was heartbreaking, but knowing she saved four lives gives me peace." },
    { name: "Fatima Khan", role: "Cornea Recipient", description: "I was blind for over a decade. Now I can see my grandchildren's faces thanks to someone's gift." },
    { name: "Devansh Rathi", role: "Awareness Volunteer", description: "Talking to people about organ donation changed my perspective—and theirs too." },
    { name: "Megha Chatterjee", role: "Mother of Recipient", description: "My son was just 8 when he got a liver transplant. That anonymous donor saved his childhood." },
    { name: "Prakash Iyer", role: "Transplant Surgeon", description: "Every successful transplant I perform reminds me of the deep humanity in donation." },
    { name: "Ananya Roy", role: "Tissue Recipient", description: "After a major accident, donated skin helped me recover without severe scarring." },
    { name: "Mohit Sharma", role: "Donor (Living Kidney)", description: "I donated a kidney to my cousin. We both lead healthy lives today." },
    { name: "Sharanya Pillai", role: "Social Worker", description: "I work with donor families, and their strength in loss never fails to move me." },
    { name: "Yusuf Ali", role: "Father of Donor", description: "My daughter died too soon, but her organs saved six lives. Her kindness lives on." },
];

interface TestimonialRowProps {
    testimonials: Testimonial[];
    direction?: "left" | "right";
}

const TestimonialRow: React.FC<TestimonialRowProps> = ({
    testimonials,
    direction = "left",
}) => {
    const duplicatedTestimonials: Testimonial[] = [...testimonials, ...testimonials];

    const marqueeVariants = {
        animate: {
            x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: testimonials.length * 2,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <motion.div
            className="flex gap-4 w-full overflow-visible"
            variants={marqueeVariants}
            animate="animate"
        >
            {duplicatedTestimonials.map((t, i) => (
                <div
                    className="flex-none w-[85vw] xs:w-[70vw] sm:w-[300px] md:w-[320px] lg:w-[350px] h-[320px] sm:h-[300px] overflow-visible"
                    key={`${direction}-${i}`}
                >
                    <div className="flex flex-col h-full bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:-translate-y-1 overflow-visible">
                        <div className="quote-icon text-3xl text-yellow-500 mb-3">❝</div>
                        <p className="text-gray-800 font-medium text-sm leading-relaxed mb-4">
                            {t.description}
                        </p>
                        <div className="mt-auto">
                            <div className="text-gray-900 font-bold text-base">{t.name}</div>
                            <div className="text-gray-700 font-medium text-xs bg-yellow-100 px-2 py-0.5 rounded-full inline-block mt-1">
                                {t.role}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

const Testimonials: React.FC = () => {
    const secondRowTestimonials: Testimonial[] = [...testimonialsData].reverse();

    return (
        <section
            id="testimonials-section"
            className="min-h-screen w-full overflow-hidden"
            style={{ backgroundColor: "#8B0000" }}
        >
            <div className="text-center text-white mb-10 sm:mb-12 pt-8">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-linear-to-r from-yellow-200 via-white to-yellow-300 bg-clip-text text-transparent drop-shadow-2xl">
                    Voices of Hope
                </h1>
                <p className="text-base sm:text-lg text-white/90 font-medium italic drop-shadow-lg">
                    "Let Your Legacy Breathe, Beat, and See Again."
                </p>
            </div>

            <div className="w-full flex flex-col gap-6 overflow-visible mb-16">
                <TestimonialRow testimonials={testimonialsData} direction="left" />
                <TestimonialRow testimonials={secondRowTestimonials} direction="right" />
            </div>
        </section>
    );
};

export default Testimonials;