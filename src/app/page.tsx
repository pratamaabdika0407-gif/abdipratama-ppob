import React from 'react';
import Link from 'next/link';
import GlassmorphicCard from '@/components/GlassmorphicCard';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Platform PPOB Enterprise
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Solusi pembayaran otomatis dengan UI premium seperti DANA. Lengkap dengan fitur
              reseller, affiliate, dan admin dashboard.
            </p>
            <div className="flex gap-4">
              <Link
                href="/register"
                className="px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Mulai Sekarang
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
          <div className="relative h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl shadow-2xl" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Fitur Unggulan
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '💳', title: 'Pembayaran Otomatis', desc: 'Proses pembayaran yang cepat dan aman' },
            { icon: '📊', title: 'Dashboard Lengkap', desc: 'Analitik real-time untuk admin dan reseller' },
            { icon: '🤝', title: 'Program Affiliate', desc: 'Dapatkan komisi dari setiap referral' },
            { icon: '🔐', title: 'Keamanan Tingkat Enterprise', desc: 'Enkripsi dan proteksi data maksimal' },
            { icon: '📱', title: 'Mobile Responsive', desc: 'Akses dari smartphone, tablet, atau desktop' },
            { icon: '⚡', title: 'Real-time Updates', desc: 'Status transaksi update secara real-time' },
          ].map((feature, idx) => (
            <GlassmorphicCard key={idx}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">{feature.desc}</p>
            </GlassmorphicCard>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <GlassmorphicCard className="text-center py-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Siap untuk memulai?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Bergabunglah dengan ribuan reseller dan affiliate yang telah menggunakan platform kami
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Daftar Sekarang
          </Link>
        </GlassmorphicCard>
      </section>
    </div>
  );
};

export default HomePage;
