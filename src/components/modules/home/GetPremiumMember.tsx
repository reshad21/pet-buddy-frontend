import Link from "next/link";
import { FaGem } from "react-icons/fa";

const GetPremiumMember = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-md mt-12">
      <div className="flex items-center mb-2 justify-center">
        <FaGem className="text-xl mr-1" />
        <h3 className="text-md font-semibold">Membership</h3>
        <FaGem className="text-xl ml-1" />
      </div>
      <p className="text-sm mb-4 text-center">
        Unlock exclusive benefits like personalized pet care advice, special
        discounts, and early access to premium content. Make your pet parenting
        journey extraordinary!
      </p>
      <Link
        href="/subscription"
        className="w-full block text-center bg-yellow-400 text-indigo-900 font-medium py-2 px-4 rounded-lg hover:bg-yellow-500 hover:text-indigo-700 transition"
      >
        Become a Member
      </Link>
    </div>
  );
};

export default GetPremiumMember;
