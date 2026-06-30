'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { FiLogOut, FiGrid, FiTrendingUp, FiUsers, FiSettings } from 'react-icons/fi';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const menuItems = [
    { icon: FiGrid, label: 'Overview', href: '/dashboard', role: ['ADMIN', 'RESELLER', 'AFFILIATE', 'CUSTOMER'] },
    { icon: FiTrendingUp, label: 'Transaksi', href: '/dashboard/transactions', role: ['ADMIN', 'RESELLER', 'AFFILIATE', 'CUSTOMER'] },
    { icon: FiUsers, label: 'Pengguna', href: '/dashboard/users', role: ['ADMIN'] },
    { icon: FiSettings, label: 'Pengaturan', href: '/dashboard/settings', role: ['ADMIN', 'RESELLER', 'AFFILIATE', 'CUSTOMER'] },
  ];

  const filteredMenu = menuItems.filter((item) => item.role.includes(session?.user?.role || 'CUSTOMER'));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-6 space-y-6">
          <div className="text-2xl font-bold text-blue-600">💰 PPOB</div>
          <div className="space-y-2">
            {filteredMenu.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition"
              >
                <item.icon className="text-xl" />
                <span className="font-semibold">{item.label}</span>
              </Link>
            ))}
          </div>
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40 transition"
          >
            <FiLogOut className="text-xl" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-300">Selamat datang, {session?.user?.name}! ({session?.user?.role})</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Transaksi', value: '1,234', icon: '📊' },
              { label: 'Total Deposit', value: 'Rp 5.000.000', icon: '💰' },
              { label: 'Komisi Pending', value: 'Rp 500.000', icon: '⏳' },
              { label: 'Komisi Withdrawn', value: 'Rp 2.000.000', icon: '✅' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Aksi Cepat</h2>
              <div className="space-y-3">
                <Link
                  href="/dashboard/transactions/new"
                  className="block px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                >
                  Buat Transaksi Baru
                </Link>
                <Link
                  href="/dashboard/deposit"
                  className="block px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
                >
                  Topup Saldo
                </Link>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Profil</h2>
              <div className="space-y-2 text-slate-600 dark:text-slate-400">
                <p><span className="font-semibold">Email:</span> {session?.user?.email}</p>
                <p><span className="font-semibold">Role:</span> {session?.user?.role}</p>
                <p><span className="font-semibold">Status:</span> Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}