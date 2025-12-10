"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


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
        <section className="relative bg-blue-50 text-blue-500 py-20 px-6 overflow-hidden rounded-b-[5%]">
            <div className="container max-w-7xl mx-auto text-start">
                <div className="relative w-full flex flex-col justify-center items-center text-start">
                    <h2 className="text-4xl sm:text-6xl text-[#2052bd]">
                        What{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4]">
                            People Say
                        </span>
                    </h2>
                    <p className="text-gray-400 mb-12 mt-6">
                        Hear from our clients who trusted Unity11 to bring their digital <br />
                        visions to life with scalable, future-ready software solutions.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </div>
            <div className="mt-10 right-0 flex justify-center text-blue-500">
                <div className="flex justify-between items-center mx-5">
                    <button className="w-10 h-10 rounded-full border-2 flex items-center justify-center">
                        <IoIosArrowBack className="text-lg" />
                    </button>
                    <button
                        onClick={() => router.push("/about")}
                        className="flex items-center rounded-full bg-linear-to-r px-20 py-2 text-[#2052bd] border-2 border-blue-500 shadow-lg transition-all gap-4 hover:gap-8 duration-500"
                    >
                        See More
                    </button>
                    <button className="w-10 h-10 rounded-full border-2 flex items-center justify-center">
                        <IoIosArrowForward className="text-lg" />
                    </button>
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ testimonial }) {
    return (
        <div
            radius={350}
            color="#262626"
            className="w-full p-1 rounded-4xl bg-linear-to-tr from-blue-600 to-blue-300 backdrop-blur-lg transition-all duration-300 hover:scale-105"
        >
            <div className="relative inset-1 flex flex-col text-start space-y-4 p-4 rounded-3xl">
                <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white">
                    <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-100">{testimonial.role}</p>
                </div>

                {/* Star Rating */}
                <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                            key={i}
                            className={`text-sm ${i < testimonial.rating ? "text-white" : "text-blue-900"
                                }`}
                        />
                    ))}
                </div>

                <p className="text-gray-100 text-sm leading-relaxed">
                    {testimonial.feedback}
                </p>
            </div>
        </div>
    );
}
