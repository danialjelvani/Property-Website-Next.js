"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { myFont } from "@/components/fonts";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Login successful");
      router.push("/");
    }
  }

  return (
    <div className="container flex items-center justify-center mx-auto min-h-[75vh] max-w-xl">
      <div className="flex flex-col items-center linkbuttonsky4 px-1 md:px-5 py-7 shadow-[0_0_10px] shadow-sky-300 rounded-xl m-4">
        <div className={`p-2 self-start ml-10 ${myFont.className} text-3xl lg:text-4xl text-gray-800 text-shadow-[0_0_6px] text-shadow-white/50 mt-2`}>
          Welcome Back!
        </div>
        <div className="p-2 self-start mx-10 mt-1 text-white">
          Sign in to manage your listings, favorites, and more all in one place.
        </div>
        <form
          onSubmit={handleSubmit}
          className="m-4 flex flex-col justify-center max-w-xs gap-3 text-white"
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
        <div className="self-start mx-10 p-2 text-white mb-2">
          If you dont have an account, it only takes a minute to get started.
        </div>

        <Link
          href="/login/signup"
          className="linkbuttonslate text-white font-bold py-2 px-8 rounded-md"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
