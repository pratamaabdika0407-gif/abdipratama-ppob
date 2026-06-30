'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiDownload, FiPrinter } from 'react-icons/fi';

const mockTransactions = [
  { id: '1', number: 'TRX202406301', type: 'PURCHASE', amount: 50000, status: 'SUCCESS', date: '2026-06-30' },
  { id: '2', number: 'TRX202406302', type: 'WITHDRAWAL', amount: 100000, status: 'PENDING', date: '2026-06-30' },
  { id: '3', number: 'TRX202406303', type: 'PURCHASE', amount: 75000, status: 'SUCCESS', date: '2026-06-29' },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(mockTransactions);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg">
            <FiArrowLeft className="text-2xl" />
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Riwayat Transaksi</h1>
        </div>

        <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">No. Transaksi</th>
                  <th className="px-6 py-4 text-left font-semibold">Tipe</th>
                  <th className="px-6 py-4 text-left font-semibold">Jumlah</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Tanggal</th>
                  <th className="px-6 py-4 text-left font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                    <td className="px-6 py-4 font-mono text-sm">{tx.number}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tx.type === 'PURCHASE' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">Rp {tx.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tx.status === 'SUCCESS' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{tx.date}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition">
                        <FiDownload className="text-lg" />
                      </button>
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition">
                        <FiPrinter className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}