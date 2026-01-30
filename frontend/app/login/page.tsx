'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();

    const[userid, setUserId] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('UserID:', userid);
        console.log('Password:', password);

        // simulasi login berhasil
        router.push('/dashboard')
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded shadow">
                <h1 className="text-xl font-bold mb-4 text-center text-gray-700">
                    Login
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm mb-1 text-gray-700">
                            User ID
                        </label>
                        <input 
                            type="text" 
                            value={userid} 
                            onChange={(e) => setUserId(e.target.value)} 
                            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-gray-700">
                            Password
                        </label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900" 
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}