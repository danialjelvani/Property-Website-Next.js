"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const errorText = await res.text(); // use text(), not json()
        throw new Error(errorText || "Something went wrong");
      }
      const data = await res.json();
      // Redirect to login after successful signup
      router.push("/login");
    } catch (err: any) {
      console.error("Signup error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center mt-15 lg:mt-25 px-1 items-center text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-orange-500/85 px-4 md:px-5 py-8 shadow-[0_0_10px] shadow-amber-300 m-4 p-8 rounded-2xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold mb-7 text-center text-teal-200 text-shadow-[0_0_6px] text-shadow-white/40">
          Sign Up
        </h2>
        <div className="mb-5">Join us — it’s fast, easy, and free!</div>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-800 mb-4 text-sm h-15 w-60">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full linkbuttonamber text-white py-3 mt-3 rounded-xl transition disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
