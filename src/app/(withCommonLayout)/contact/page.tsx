"use client";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import React, { useRef } from "react";
import { FaEnvelope, FaPaperPlane, FaUser } from "react-icons/fa";
import contactimg from "../../../../public/contact.png";

export default function ContactUs() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_m5j9tp8",
          "template_pjuuara",
          form.current,
          "H1FDX9WkK7hJQntOL"
        )
        .then(
          (result) => {
            console.log(result.text);
            alert("Message sent successfully!");
          },
          (error) => {
            console.log(error.text);
            alert("Failed to send the message. Please try again later.");
          }
        );
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6 lg:px-0">
        {/* Left Side - Illustration or Decorative Image */}
        <div className="md:w-1/2">
          <Image
            src={contactimg}
            width={300}
            height={150}
            alt="Contact Us Illustration"
            className="w-full"
          />
        </div>

        {/* Right Side - Contact Form */}
        <div className="md:w-1/2 bg-white shadow-2xl rounded-lg p-8 border border-gray-200">
          <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-8">
            Get in Touch
          </h2>

          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="user_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                className="w-full px-4 py-3 pl-12 rounded-md bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
              />
              <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <label
                htmlFor="user_email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                className="w-full px-4 py-3 pl-12 rounded-md bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your message"
                rows={5}
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center bg-purple-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-purple-700 transition duration-300 w-full font-medium"
            >
              <FaPaperPlane className="mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
