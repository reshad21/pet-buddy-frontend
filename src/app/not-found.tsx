import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-lg mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
