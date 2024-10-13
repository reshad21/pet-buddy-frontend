export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-600 border-solid"></div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          Loading...
        </h1>
        <p className="mt-2 text-gray-600">
          Please wait while we fetch your data.
        </p>
      </div>
    </div>
  );
}
