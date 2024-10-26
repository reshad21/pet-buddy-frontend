"use client";
import emailjs from "@emailjs/browser";
import React, { useRef } from "react";

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
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 py-16">
      <div className="max-w-3xl mx-auto px-8 md:px-6 lg:px-0">
        <h2 className="text-4xl font-semibold text-center text-slate-900 mb-10">
          Contact Us
        </h2>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div>
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
              className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
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
              className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
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
              className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your message"
              rows={5}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-700 transition duration-300 w-full font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
