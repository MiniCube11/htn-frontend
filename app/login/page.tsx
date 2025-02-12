"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { authenticateUser } from "@/lib/utils";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("username")) {
      router.push("/");
    }
  }, []);

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (authenticateUser(username, password)) {
      Cookies.set("username", username, {expires: 1});
      router.push("/");
    } else {
      setError("Invalid username or password. Try using 'htn2025' as the password.");
    } 
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen lg:bg-[#F3F5FC]">
      <form className="w-screen lg:w-[600px] py-16 bg-white lg:border lg:border-gray-300 rounded-lg flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold w-[90%] lg:w-[80%]">Log into your account</h2>
        <p className="w-[90%] lg:w-[80%] mt-2">Join 1000+ other hackers at Canada's largest hackathon</p>
        <h2 className="w-[90%] lg:w-[80%] mt-12 text-gray-800">Username</h2>
        <input
          type="text"
          placeholder="hacker"
          className="w-[90%] lg:w-[80%] py-2 px-4 border border-gray-500 focus:border-gray-800 rounded-md outline-none mt-2"
          onChange={(e) => setUsername(e.target.value)}
        />
        <h2 className="mt-6 text-gray-800 w-[90%] lg:w-[80%]">Password</h2>
        <input
          type="password"
          placeholder="•••••••••••"
          className="w-[90%] lg:w-[80%] py-2 px-4 border border-gray-500 focus:border-gray-800 rounded-md outline-none mt-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between items-center mt-6 w-[90%] lg:w-[80%]">
          <div className="flex items-center">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-gray-800">Remember me</label>
          </div>
          <a href="#" className="text-gray-800 hover:text-gray-600 transition block underline">Forgot password?</a>
        </div>
        {error && <p className="text-red-500 text-sm mt-4 w-[90%] lg:w-[80%]">{error}</p>}
        <button
          onClick={handleLogin}
          className="bg-[#7790F3] hover:bg-[#8FA3F5] transition block w-[90%] lg:w-[80%] rounded-md py-2 mt-12 text-white font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}