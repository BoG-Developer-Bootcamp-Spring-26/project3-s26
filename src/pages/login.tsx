import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import Image from "next/image";
import appLogo from "../../public/images/appLogo.png";
import quarterCircle from "../../public/images/quarterCircle.png";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const { login } = useUser()!;
    const router = useRouter();
    
    //login logic
    const handleLogin = async () => {
        try {
            const res = await fetch("/api/user/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
        });

            const data = await res.json();

            if (res.ok) {
                login({ id: data.id, fullName: data.fullName, admin: data.admin });
                router.push("/dashboard"); //redirect to dashboard after successful login
            } else {
                setError(data.message);
            }
        } catch (e) {
            setError("Something went wrong. Please try again.");
        }
    };
    
    //design
    return (
        <div className="flex flex-col min-h-screen">

        {/* Header */}
        <div className="flex items-center gap-2 border-b p-4 pl-8">
            <Image src={appLogo} alt="App Logo" width={60} height={60} />
            <span className="font-bold font-bold text-3xl" style={{ fontFamily: "Oswald, sans-serif" }}>Progress</span>
        </div>

        {/*login div*/}
        <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: "Heebo, sans-serif" }}>Login</h1>

            <input
            className="border-b border-red-700 outline-none mb-6 w-96 pb-2"
            type="email"
            placeholder="Email" style={{ fontFamily: "Heebo, sans-serif" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            className="border-b border-red-700 outline-none mb-6 w-96 pb-2"
            type="password"
            placeholder="Password" style={{ fontFamily: "Heebo, sans-serif" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
                className="bg-red-700 text-white w-96 py-2 rounded-2xl mb-4 font-semibold text-2xl" style={{ fontFamily: "Heebo, sans-serif" }}
                onClick={handleLogin}
                >
                Log in
            </button>

            <p style={{ fontFamily: "Heebo, sans-serif" }}>
                Don't have an account?{" "} 
                <Link href="/register" className="font-bold" style={{ fontFamily: "Heebo, sans-serif" }}>
                    Sign up
                </Link>
            </p>
        </div>

        <div className="fixed bottom-0 left-0">
            <Image src={quarterCircle} alt="Quarter Circle" width={200} height={200} />
        </div>

        <div className="text-center text-sm text-gray-500 py-4">
            <p>Made with ♡ by Long Lam</p>
            <p>© 2023 BOG Developer Bootcamp. All rights reserved.</p>
        </div>

        </div>
    );
}