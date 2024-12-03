import { FaCheckCircle, FaGem } from "react-icons/fa";

const SubscriptionPage = () => {
  const plans = [
    {
      id: 1,
      title: "Daily Plan",
      price: "$2/day",
      description: "Access all premium content for 24 hours.",
      benefits: [
        "Unlimited content access",
        "24-hour exclusive tips",
        "Support for a single pet",
      ],
    },
    {
      id: 2,
      title: "Weekly Plan",
      price: "$10/week",
      description: "Enjoy premium content for a full week.",
      benefits: [
        "Unlimited content access",
        "Exclusive weekly pet care advice",
        "Priority support",
      ],
    },
    {
      id: 3,
      title: "Yearly Plan",
      price: "$100/year",
      description: "Best value! Get unlimited access all year round.",
      benefits: [
        "Unlimited content access",
        "Monthly webinars with pet experts",
        "Dedicated customer support",
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white my-8 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-8">
        <FaGem className="text-4xl mr-3 text-yellow-400" />
        <h2 className="text-2xl font-extrabold">Choose Your Premium Plan</h2>
        <FaGem className="text-4xl ml-3 text-yellow-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-5">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-black text-white rounded-lg shadow-lg p-5 hover:scale-105 transition-transform"
          >
            <h3 className="text-center text-xl font-semibold mb-4">
              {plan.title}
            </h3>
            <p className="text-center text-2xl font-bold text-blue-600 mb-4">
              {plan.price}
            </p>
            <p className="text-center text-gray-300 text-base mb-6">
              {plan.description}
            </p>
            <ul className="text-gray-300 text-base space-y-3 mb-6">
              {plan.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 text-lg" />
                  {benefit}
                </li>
              ))}
            </ul>
            <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-lg py-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition">
              Purchase Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
