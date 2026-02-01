'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();

    const [id_user, setID_user] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_user: id_user, password: password })
            });
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                router.push("/dashboard");
            } else {
                alert(data.message || 'Login failed');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Login gagal');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded shadow">
                <h1 className="text-xl font-bold mb-4 text-center">
                    Login
                </h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm mb-1 text-gray-700">
                            Nama User
                        </label>
                        <input
                        type="text"
                        className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900"
                        value={id_user} onChange={(e) => setID_user(e.target.value)} />
                    </div>

                <div>
                    <label className="block text-sm mb-1 text-gray-700">
                        Password
                    </label>
                    <input
                    type="password"
                    className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
                </form>
            </div>
        </div>
    );
}
