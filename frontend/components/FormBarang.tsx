'use client';

import { useState } from "react";

type Props = {
  onSuccess: () => void;
};

export default function FormBarang({ onSuccess }: Props) {
  const [kode_barang, setKodeBarang] = useState('');
  const [nama_barang, setNamaBarang] = useState('');
  const [harga, setHarga] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3001/barang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ kode_barang: kode_barang, nama_barang: nama_barang, harga: harga }),
      });
      if (response.ok) {
        setKodeBarang('');
        setNamaBarang('');
        setHarga('');
        onSuccess();
      } else {
        alert('Gagal tambah barang');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input 
            type="text" 
            placeholder="Kode Barang" 
            value={kode_barang} 
            onChange={(e) => setKodeBarang(e.target.value)} 
            className="w-full border px-2 py-1 rounded"
            required
        />
        <input 
            type="text" 
            placeholder="Nama Barang" 
            value={nama_barang} 
            onChange={(e) => setNamaBarang(e.target.value)} 
            className="w-full border px-2 py-1 rounded"
            required
        />
        <input 
            type="number" 
            placeholder="Harga" 
            value={harga} 
            onChange={(e) => setHarga(e.target.value)} 
            className="w-full border px-2 py-1 rounded"
            required
        />
        <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
            Tambah Barang
        </button>
    </form>
  );
}