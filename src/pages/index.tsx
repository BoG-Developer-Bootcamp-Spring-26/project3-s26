import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
        <header className="flex items-center gap-3 border-b border-gray-300 px-10 py-6 shadow-md">
            <img src="/images/appLogo.png"/>
            <h1 className="text-5xl font-medium text-black font-oswald">Progress</h1>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center px-6 font-heebo" >
            <h2 className="mb-12 text-5xl font-bold text-black">Login</h2>
            <div className="w-full max-w-xl">
                <form className= "flex flex-col gap-10">
                    <div>
                        <input id="email" type="email" placeholder="Email" className="w-full border-0 border-b-2 border-[#d13a2f] bg-transparent text-xl outline-none"/>
                    </div>
                    <div>
                        <input id="password" type="password" placeholder="Password" className="w-full border-0 border-b-2 border-[#d13a2f] bg-transparent text-xl outline-none"/>
                    </div>
                    <button type="submit" className="bg-[#D21312] border rounded-[20px] text-3xl py-2 m-4 text-white font-medium">Log in</button>
                </form>
            </div>
            <p className="mt-4 text-xl font-light text-gray-600">Don't have an account?
                <Link href="/signup" className="font-semibold text-black"> Sign up</Link>
            </p>
        
        </main>
        <div className ="absolute bottom-0 left-0">
            <img src="/images/quarterCircle.png" className =""/>
        </div>
        <footer className="flex flex-col items-center justify-content m-10 font-light">
            <p className="text-lg">Made with ♡ by Long Lam</p>
            <p className="text-lg">© 2023 BOG Developer Bootcamp. All rights reserved.</p>
        </footer>
    </div>
  );
}