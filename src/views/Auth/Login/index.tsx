import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginFormViews = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error Response:", errorData);
        setError(errorData.message || "Login failed");
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      const userResponse = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      const userData = await userResponse.json();
      localStorage.setItem("user_email", userData.email);
      localStorage.setItem("user_name", userData.name);

      router.push("/product");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Login failed:", err.message);
        setError("An error occurred while logging in. Please check your credentials.");
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50">
        <form onSubmit={handleLogin} className="space-y-6 bg-white px-6 pb-4 pt-5 sm:mx-auto sm:w-full sm:max-w-sm">

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">  
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Login
        </button>

        <div className="mt-10 text-center text-sm/6 text-gray-500">
          <p> Don't have an account?{" "} 
          <Link href="/auth/register" className="font-semibold text-blue-500 hover:text-indigo-600">Register</Link>
          </p>                   
        </div>

        </form>
    </div>
  );
};

export default LoginFormViews;
