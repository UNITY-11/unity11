"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import React from "react";
import { CardSpotlight } from "@/components/ui/cards/card-spotlight";

export default function TestimonialSection() {
    const router = useRouter();

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Startup Founder",
            image: "/images/people/avatar1.png",
            feedback:
                "Unity11 helped us scale our SaaS platform with robust architecture and clean UI. Their team’s commitment to quality is unmatched.",
            rating: 5,
        },
        {
            name: "David Patel",
            role: "Tech Lead, Fintech Co.",
            image: "/images/people/avatar2.png",
            feedback:
                "From backend optimization to front-end polish, Unity11 delivered excellence across every sprint. Their communication is top-tier.",
            rating: 5,
        },
        {
            name: "Emily Carter",
            role: "Operations Manager",
            image: "/images/people/avatar3.png",
            feedback:
                "We partnered with Unity11 for custom CRM development. The final product boosted our team’s efficiency and client satisfaction rates.",
            rating: 4,
        },
        {
            name: "Michael Brown",
            role: "Marketing Director",
            image: "/images/people/avatar4.png",
            feedback:
                "Unity11's attention to design detail and performance optimization exceeded expectations. Excellent work from start to finish.",
            rating: 5,
        },
    ];

    return (
        <section className="relative bg-black text-white py-20 px-6 overflow-hidden">
            <div className="container max-w-7xl mx-auto text-center">
                <h2 className="text-4xl sm:text-6xl text-white">
                    What{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4]">
                        People Say
                    </span>
                </h2>

                <p className="text-gray-400 max-w-2xl mx-auto mb-12 mt-6">
                    Hear from our clients who trusted Unity11 to bring their digital
                    visions to life with scalable, future-ready software solutions.
                </p>

                <div className="grid md:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>

                <div className="mt-10 flex gap-4 justify-center items-center">
                    <button
                        onClick={() => router.push("/about")}
                        className="flex items-center rounded-full bg-linear-to-r from-[#2052bd] to-[#7fcbe4] px-6 py-2.5 text-white shadow-lg transition-all gap-4 hover:gap-8 duration-500"
                    >
                        See More
                        <IoIosArrowForward className="text-xl sm:text-2xl" />
                    </button>
                </div>
            </div>

            <div className="absolute inset-0 bg-[url('/images/bg-grid.svg')] bg-center bg-cover opacity-5 pointer-events-none"></div>
        </section>
    );
}

function TestimonialCard({ testimonial }) {
    return (
        <CardSpotlight
            radius={350}
            color="#262626"
            className="w-full p-1 rounded-4xl bg-black backdrop-blur-lg border-2 border-t-blue-500 border-r-blue-500 border-b-blue-300 border-l-blue-300 transition-all duration-300"
        >
            <div className="relative inset-1 flex flex-col text-start space-y-4 p-4 rounded-3xl">
                <div className="w-16 h-16 rounded-full overflow-hidden border-b-3 border-blue-600">
                    <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>

                {/* Star Rating */}
                <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                            key={i}
                            className={`text-sm ${i < testimonial.rating ? "text-blue-600" : "text-blue-950"
                                }`}
                        />
                    ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                    {testimonial.feedback}
                </p>
            </div>
        </CardSpotlight>
    );
}
