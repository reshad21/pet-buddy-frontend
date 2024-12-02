const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-gray-50 to-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-4xl font-extrabold text-green-800 mb-6 text-center">
        About PetBuddy
      </h1>

      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
        Welcome to PetBuddy! Our platform is dedicated to pet lovers who enjoy
        sharing their unique experiences and travel adventures with their furry
        friends. At PetBuddy, we’re passionate about building a vibrant
        community where users can post stories, tips, and memories, making pet
        ownership and travel more enjoyable for everyone.
      </p>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to create a friendly, supportive space for pet owners
            to connect and share. We believe that pets are family, and our goal
            is to provide resources, encouragement, and community to help pet
            lovers enjoy life’s adventures together, both at home and on the
            road.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We envision a world where pets and their owners can easily connect,
            discover pet-friendly destinations, and support each other in the
            joys and challenges of pet life. Our vision is to grow PetBuddy into
            a global hub for pet enthusiasts who share a love for animals,
            travel, and community.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">
            Our Team
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The PetBuddy team is made up of pet owners and animal lovers who are
            dedicated to providing a welcoming space for our community. With a
            mix of experience in pet care, travel, and technology, we’re here to
            support you and make PetBuddy a valuable part of your pet journey.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Have questions or suggestions? We would love to hear from you! Reach
            out to us for any assistance or to share your feedback. Let’s make
            PetBuddy even better together.
          </p>
        </div>
      </section>

      <div className="mt-10 text-center">
        <h3 className="text-xl font-semibold text-green-700">Get in Touch:</h3>
        <p className="text-gray-600">Email: rasheduzzamanreshad@gmail.com</p>
        <p className="text-gray-600">Phone: +880 1787170612</p>
      </div>
    </div>
  );
};

export default AboutPage;
