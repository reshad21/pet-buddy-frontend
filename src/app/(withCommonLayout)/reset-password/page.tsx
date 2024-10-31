"use client";

import { useUserResetPassword } from "@/hooks/auth.hook";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react"; // Adjust the import path as needed

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Use the mutation hook
  const { mutate: resetPassword } = useUserResetPassword();

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Prepare the user data including the token
    const userData = { email, newPassword, token }; // Include token in the user data

    try {
      // Use the resetPassword mutation function to perform the reset
      await resetPassword(userData); // Ensure to await the resetPassword call
      setSuccess(true);
      setError(null); // Clear any previous error message
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reset Password
        </h2>
        {success ? (
          <p className="text-center text-green-600">
            Password reset successful! You can now log in with your new
            password.
          </p>
        ) : (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <p className="text-red-600 text-center text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
