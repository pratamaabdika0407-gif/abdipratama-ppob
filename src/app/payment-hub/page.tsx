'use client';

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

const PaymentHubPage = () => {
  const QRIS_IMAGE = 'https://i.imgur.com/IvVcoBz.png';

  const paymentOptions = [
    {
      icon: '💰',
      title: 'Topup Saldo',
      description: 'Tambahkan saldo ke akun Anda dengan berbagai metode pembayaran',
      link: '/deposit',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '💳',
      title: 'Payment Methods',
      description: 'Kelola metode pembayaran dan lihat detail transaksi',
      link: '/payment',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '📊',
      title: 'Transaction History',
      description: 'Lihat riwayat semua transaksi Anda',
      link: '/dashboard/transactions',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">💳 Payment Hub</h1>
          <p className="text-xl text-gray-300">Metode pembayaran lengkap dengan QRIS, Bank Transfer, dan E-Wallet</p>
        </div>

        {/* QRIS Preview */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">📱 Pembayaran dengan QRIS</h2>
              <p className="text-gray-300 mb-6 text-lg">
                Bayar dengan mudah menggunakan QRIS yang dapat di-scan oleh berbagai aplikasi e-wallet populer.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  'Cepat & Aman',
                  'Support semua e-wallet major',
                  'Konfirmasi otomatis',
                  'Tidak ada biaya admin',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-green-200">
                    <span className="text-2xl">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/deposit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
              >
                Topup Sekarang
                <FiArrowRight />
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/10 rounded-2xl p-8">
                <div className="relative w-72 h-72">
                  <Image
                    src={QRIS_IMAGE}
                    alt="QRIS Code"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {paymentOptions.map((option, idx) => (
            <Link key={idx} href={option.link}>
              <div className={`backdrop-blur-xl bg-gradient-to-br ${option.color} bg-opacity-10 border-2 border-white/20 rounded-2xl p-8 h-full hover:border-white/40 hover:scale-105 transition-all cursor-pointer group`}>
                <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform">
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{option.title}</h3>
                <p className="text-gray-300 mb-4">{option.description}</p>
                <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-4 transition-all">
                  <span>Explore</span>
                  <span className="text-xl">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">🎯 Fitur Pembayaran</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: 'Keamanan Enterprise', desc: 'Enkripsi end-to-end untuk semua transaksi' },
              { icon: '⚡', title: 'Instant Processing', desc: 'Konfirmasi pembayaran dalam hitungan detik' },
              { icon: '📱', title: 'Multi-Channel', desc: 'QRIS, Bank Transfer, E-Wallet tersedia' },
              { icon: '📊', title: 'Tracking Real-time', desc: 'Monitor status pembayaran kapan saja' },
              { icon: '💾', title: 'Auto-Save Receipt', desc: 'Bukti pembayaran otomatis tersimpan' },
              { icon: '🌍', title: 'Global Support', desc: 'Mendukung berbagai mata uang internasional' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:border-white/40 transition">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHubPage;
