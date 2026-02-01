'use client';

import { useEffect, useState } from "react";
import FormBarang from "../../components/FormBarang";
//import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [barang, setBarang] = useState<any[]>([]);
  
  const fetchBarang = (token: string) => {
    fetch('http://localhost:3001/barang', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setBarang(data))
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchBarang(token);
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Data Barang</h1>

      <FormBarang onSuccess={() => fetchBarang(localStorage.getItem('token') || '')} />
      
      <button 
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>

      <table className="w-full bg-white border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2 text-left">Kode</th>
            <th className="border px-3 py-2 text-left">Nama</th>
            <th className="border px-3 py-2 text-left">Harga</th>
            <th className="border px-3 py-2 text-left" colSpan={2}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {barang.map((item) => (
            <tr key={item.kode_barang}>
              <td className="border px-3 py-2">{item.kode_barang}</td>
              <td className="border px-3 py-2">{item.nama_barang}</td>
              <td className="border px-3 py-2">{item.harga}</td>
              <td className="border px-3 py-2">
                <button 
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" 
                onClick={() => {
                  const newNama = prompt("Nama Barang baru", item.nama_barang);
                  const newHarga = prompt("Harga Barang baru", item.harga);

                  if (newNama && newHarga) {
                    const token = localStorage.getItem('token');
                    fetch(`http://localhost:3001/barang/${item.kode_barang}`, {
                      method: 'PUT',
                      headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify({ nama_barang: newNama, harga: newHarga }),
                    })
                    .then(response => {
                      if (response.ok) {
                        fetchBarang(localStorage.getItem('token') || '');
                      } else {
                        alert('Gagal update barang');
                      }
                    })
                    .catch(error => console.error('Error:', error));
                  }
                }}
                >
                  Edit
                </button>
              </td>
              <td className="border px-3 py-2">
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={async () => {
                    if (!confirm('Yakin hapus barang ini?')) return;
                    try {
                      const token = localStorage.getItem('token');
                      const response = await fetch(`http://localhost:3001/barang/${item.kode_barang}`, {
                        method: 'DELETE', 
                        headers: { 'Authorization': `Bearer ${token}`}
                      });
                      if (response.ok) {
                        fetchBarang(localStorage.getItem('token') || '');
                      } else {
                        alert('Gagal hapus barang');
                      }
                    } catch (error) {
                      console.error('Error:', error);
                    }
                  }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}