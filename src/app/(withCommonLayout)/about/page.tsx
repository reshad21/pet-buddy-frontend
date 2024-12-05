import Image from "next/image";
import mission from "../../../../public/mission.png";
import teammember from "../../../../public/teammember.png";
import vision from "../../../../public/vision.png";
const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-10 bg-gradient-to-r from-green-50 via-white to-green-100 shadow-2xl rounded-lg border border-green-200">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-green-800 mb-4">
          About PetBuddy
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Welcome to PetBuddy! A community for pet enthusiasts who cherish
          exploring the world and sharing their lives with their furry
          companions. Let’s make every moment with your pet an adventure worth
          sharing.
        </p>
      </header>

      {/* Content Sections */}
      <section className="space-y-12">
        {/* Mission Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our mission is to foster a community that brings joy to pet
              ownership. By sharing tips, destinations, and experiences, we aim
              to strengthen the bond between pets and their humans.
            </p>
          </div>
          <Image
            src={mission}
            alt="Our Mission"
            width={300}
            height={300}
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
        </div>

        {/* Vision Section */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We dream of a world where pets and their owners can seamlessly
              explore pet-friendly destinations, build lasting memories, and
              enjoy every moment together. PetBuddy is your partner in this
              journey.
            </p>
          </div>
          <Image
            src={vision}
            width={300}
            height={300}
            alt="Our Vision"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
        </div>

        {/* Team Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Our Team</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At PetBuddy, we’re a team of passionate pet owners and animal
              lovers. Combining experience in pet care, travel, and technology,
              we’re committed to creating a platform that supports every aspect
              of your pet-loving life.
            </p>
          </div>
          <Image
            src={teammember}
            width={300}
            height={300}
            alt="Our Team"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Contact Us</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            We’d love to hear from you! Whether it’s feedback, suggestions, or
            just to say hi, we’re here for you.
          </p>
          <div className="space-y-2 text-lg text-gray-700">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:rasheduzzamanreshad@gmail.com"
                className="text-green-600 hover:underline"
              >
                rasheduzzamanreshad@gmail.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong> +880 1787170612
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
