"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="m-10 flex flex-col md:flex-row justify-center gap-4 text-white"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className="border-2 h-9 border-white/50 rounded-md p-2 bg-white/10"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="border-2 h-9 border-white/50 rounded-md p-2 bg-white/10"
        />
        <button
          type="submit"
          className="border-2 h-9 text-center border-white rounded-md min-w-3xs cursor-pointer bg-white/30"
        >
          Login
        </button>
      </form>

      <Link
        href="/login/signup"
        className="linkbuttonamber text-white font-bold py-4 px-6 rounded-md"
      >
        Sign Up
      </Link>
    </div>
  );
}
