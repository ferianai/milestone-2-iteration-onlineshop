import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const RegisterFormViews = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("https://placekittens.com/200/200"); // Default avatar URL
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    if (!name || !email || !password) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar, // Include avatar in the request
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        setError(errorData.message.join(", ") || "Registration failed");
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Registration failed:", err.message);
        setError("An error occurred during registration. Please try again.");
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href={"/"}>
          <h1 className="text-center text-4xl/9 font-bold tracking-tight text-blue-500 hover:text-indigo-600">SmartShop</h1>
        </Link>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create your account</h2>
      </div>
      <div className="flex justify-center items-center  bg-gray-50">
        <form onSubmit={handleRegister} className="bg-white p-8 shadow-md rounded-md max-w-sm w-full">
          <h1 className="text-xl font-bold mb-6">Register</h1>

          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">Registration successful! Redirecting...</div>}

          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Your full name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Your email address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Create a password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Avatar URL</label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="https://example.com/avatar.jpg"
            />
            <small className="text-gray-500">Optional. Leave blank to use the default avatar.</small>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="font-semibold text-blue-500 hover:text-indigo-600">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterFormViews;
