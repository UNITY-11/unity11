"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

const CONTACT_DETAILS = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@spirox.dev",
    description: "Our friendly team is here to help.",
    action: "mailto:hello@spirox.dev",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 000-0000",
    description: "Mon-Fri from 8am to 5pm.",
    action: "tel:+15550000000",
  },
];

export const ContactInfo = () => {
  return (
    <div className="flex flex-col justify-between gap-6 lg:gap-8 w-full h-full">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Get in touch</h2>
        <p className="text-gray-400 font-light mb-8 max-w-md">
          We&apos;d love to hear from you. Please fill out this form or shoot us an email.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {CONTACT_DETAILS.map((detail, index) => (
          <motion.a
            key={detail.title}
            href={detail.action}
            target={detail.title === "Office" ? "_blank" : undefined}
            rel={detail.title === "Office" ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 shadow-sm hover:border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform duration-300">
              <detail.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">{detail.title}</h3>
              <p className="text-gray-400 text-sm mb-2 font-light">{detail.description}</p>
              <p className="text-blue-400 font-medium">{detail.value}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};
