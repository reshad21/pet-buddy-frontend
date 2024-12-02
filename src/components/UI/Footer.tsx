"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Search from "../modules/home/Search";

const Footer = () => {
  return (
    <footer className="p-5 mt-10 bg-gray-100">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Column 1: Navigation Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Navigation</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Services */}

        {/* Column 3: Contact Us */}
        <div className="space-y-4 md:col-span-2">
          <h4 className="text-lg font-semibold">Contact Us</h4>
          <ul className="space-y-2">
            <li>
              <p>
                <strong>Address:</strong> C.N.B Road, Barishal, Bangladesh, 8200
              </p>
            </li>
            <li>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:rasheduzzamanreshad@gmail.com"
                  className="hover:text-blue-500"
                >
                  rasheduzzamanreshad@gmail.com
                </a>
              </p>
            </li>
            <li>
              <p>
                <strong>Phone:</strong>{" "}
                <a href="tel:+880 1787170612" className="hover:text-blue-500">
                  +880 1787170612
                </a>
              </p>
            </li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Connect with Us</h4>
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              <FaLinkedinIn />
            </Link>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} PETBUDDY. All rights reserved.
          </p>
          <Search />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
