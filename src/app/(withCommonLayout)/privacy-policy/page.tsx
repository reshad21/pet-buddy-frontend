/* eslint-disable react/no-unescaped-entities */
"use client";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-gray-50 to-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At <strong>Pet Buddy</strong>, we value your privacy and are committed
        to protecting your personal information. This Privacy Policy explains
        how we collect, use, and safeguard your information when you use our
        website or services.
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
      <p className="mb-4">We may collect the following types of information:</p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>
          **Personal Information:** Name, email address, phone number, and
          billing/shipping address.
        </li>
        <li>
          **Usage Data:** Information about how you interact with our website,
          including IP address, browser type, and pages visited.
        </li>
        <li>
          **Payment Information:** When making a purchase, we collect payment
          details such as credit/debit card numbers (processed securely via a
          third-party payment processor).
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">The information we collect is used to:</p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Provide and improve our products and services.</li>
        <li>Process transactions and send order updates.</li>
        <li>Respond to your inquiries and provide customer support.</li>
        <li>Send promotional materials (if you have opted-in).</li>
        <li>Ensure security and prevent fraud.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        3. How We Protect Your Information
      </h2>
      <p className="mb-4">
        We implement industry-standard security measures to protect your
        information from unauthorized access, use, or disclosure. These measures
        include encryption, secure servers, and access controls.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        4. Sharing Your Information
      </h2>
      <p className="mb-4">
        We do not sell, rent, or share your personal information with third
        parties, except in the following cases:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>
          With trusted service providers who assist us in operating our website
          or providing services.
        </li>
        <li>When required by law or to protect our legal rights.</li>
        <li>
          In connection with a merger, acquisition, or sale of all or part of
          our business.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">5. Your Choices</h2>
      <p className="mb-4">You can:</p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>
          Opt out of receiving promotional emails by clicking the "unsubscribe"
          link in our emails.
        </li>
        <li>
          Request access to or deletion of your personal information by
          contacting us at <strong>privacy@example.com</strong>.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
      <p className="mb-4">
        We use cookies to enhance your experience on our website. Cookies are
        small text files stored on your device that help us remember your
        preferences and understand website usage. You can manage your cookie
        preferences through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        7. Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated effective date.
      </p>

      <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy, please
        contact us at:
      </p>
      <ul className="list-none pl-0 mb-4 space-y-2">
        <li>
          <strong>Email:</strong> rasheduzzamanreshad@gmail.com
        </li>
        <li>
          <strong>Phone:</strong> +880 1787170612
        </li>
        <li>
          <strong>Address:</strong> CNB ROAD KAZIPARA, BARISHAL, BANGLADESH
        </li>
      </ul>

      <p className="text-sm text-gray-500">
        Effective Date: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default PrivacyPolicy;
