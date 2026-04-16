import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";

export default function Sidebar() {
    const userContext = useUser();
    const user = userContext?.user;
    const logout = userContext?.logout;
    const router = useRouter();

    const handleLogout = () => {
        logout?.();
        router.push("/login");
    };

    const isActive = (path: string) => router.pathname === path;

    return (
        <div className="flex flex-col justify-between h-screen w-56 bg-white p-4 border-r">

            {/* Top nav links */}
            <div className="flex flex-col gap-2">

            {/* Training Logs tab */}
            <Link
                href="/dashboard" // link to user-specific training logs
                className={`flex items-center gap-2 rounded-lg p-3 font-semibold ${
                    isActive("/dashboard") ? "bg-red-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
            >
                <Image
                    src={isActive("/dashboard")
                    ? "/images/activeTrainingLogo.png"
                    : "/images/inactiveTrainingLogs.png"}
                    alt="Training Logs"
                    width={20}
                    height={20}
                />
            Training logs
            </Link>

        {/* Animals tab */}
        <Link
            href="/animals"
            className={`flex items-center gap-2 rounded-lg p-3 ${
                isActive("/animals") ? "bg-red-600 text-white font-semibold" : "text-gray-700 hover:bg-gray-100"
            }`}
        >
            <Image
                src={isActive("/animals")
                ? "/images/activeAnimalsLogo.png"
                : "/images/inactiveAnimalLogo.png"}
                alt="Animals"
                width={20}
                height={20}
            />
            Animals
        </Link>

        {/* Admin section */}
        {user?.admin && (
            <div className="mt-4">
                <p className="font-bold text-sm mb-2">Admin access</p>
                <div className="flex flex-col gap-2">

                    <Link
                        href="/admin/training"
                        className={`flex items-center gap-2 rounded-lg p-3 ${
                        isActive("/admin/training") ? "bg-red-600 text-white font-semibold" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    >
                        <Image
                            src={isActive("/admin/training")
                                ? "/images/activeAllTrainingLogo.png"
                                : "/images/inactiveAllTrainingLogo.png"}
                            alt="All Training"
                            width={20}
                            height={20}
                        />
                        All training
                    </Link>

                    <Link
                        href="/admin/animals"
                        className={`flex items-center gap-2 rounded-lg p-3 ${
                        isActive("/admin/animals") ? "bg-red-600 text-white font-semibold" : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        <Image
                            src={isActive("/admin/animals")
                                ? "/images/activeAllAnimalsLogo.png"
                                : "/images/inactiveAllAnimalsLogo.png"}
                            alt="All Animals"
                            width={20}
                            height={20}
                        />
                        All animals
                    </Link>

                    <Link
                        href="/admin/users"
                        className={`flex items-center gap-2 rounded-lg p-3 ${
                        isActive("/admin/users") ? "bg-red-600 text-white font-semibold" : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                    <Image
                        src={isActive("/admin/users")
                            ? "/images/activeAllUsersLogo.png"
                            : "/images/inactiveAllUsersLogo.png"}
                        alt="All Users"
                        width={20}
                        height={20}
                    />
                    All users
                    </Link>

                </div>
            </div>
        )}
        </div>

        {/* Bottom user info + logout */}
        <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
                <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {user?.fullName?.charAt(0)}
                </div>
                <div>
                    <p className="font-bold text-sm">{user?.fullName}</p>
                    <p className="text-xs text-gray-500">{user?.admin ? "Admin" : "User"}</p>
                </div>
            </div>

            <button onClick={handleLogout}>
            <Image
                src="/images/logoutLogo.png"
                alt="Logout"
                width={24}
                height={24}
            />
            </button>
      </div>

    </div>
  );
}