'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();

    const [id_user, setIDUser] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_user: id_user, password: password })
            });
            const data = await response.json();
            
            if(!response.ok) {
                setError(data.message || "Login gagal");
                // alert(data.message || "Login gagal");
                return;
            }
            
            localStorage.setItem('token', data.token);
            router.push("/dashboard");
        }
        catch (error) {
            setError("Login gagal");
            console.error('Error:', error);
            // alert('Login gagal');
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
            <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-xl p-8">
                <h1 className="text-2xl font-semibold text-white mb-2">
                    Login
                </h1>

                <p className="text-sm text-gray-400 mb-6">
                    Masukkan username dan password
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        UserID
                    </label>
                    <input type="text" value={id_user} 
                        onChange={
                            (e) => setIDUser(e.target.value)
                        } 
                        placeholder="Masukkan username" className="w-full px-4 py-2 border rounded-lg text-sm border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-700 text-white" required/>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Password
                    </label>

                    <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={password}
                        onChange={
                            (e) => setPassword(e.target.value)
                        }
                        placeholder="Masukkan password" className="w-full px-4 py-2 border rounded-lg text-sm border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-700 text-white" required/>

                    {/* ICON INLINE */}
                    <span
                        onClick={
                            () => setShowPassword(!showPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500">
                        {showPassword ? (
                        // Eye Open
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5
                                c4.477 0 8.268 2.943 9.542 7
                                -1.274 4.057-5.065 7-9.542 7
                                -4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        ) : (
                        // Eye Closed
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19
                                c-4.477 0-8.268-2.943-9.542-7
                                a9.956 9.956 0 012.223-3.592M6.7 6.7
                                A9.953 9.953 0 0112 5
                                c4.477 0 8.268 2.943 9.542 7
                                a9.956 9.956 0 01-4.043 5.568M6.7 6.7L3 3m3.7 3.7l10.6 10.6"/>
                        </svg>
                        )}
                    </span>
                    </div>
                </div>

                {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg
                            hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    Login
                </button>

                </form>
            </div>
        </div>
    );
}
