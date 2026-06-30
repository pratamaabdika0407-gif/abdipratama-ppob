'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

const DepositPage = () => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('qris');
  const [loading, setLoading] = useState(false);
  const [showQRIS, setShowQRIS] = useState(false);

  const QRIS_IMAGE = 'https://i.imgur.com/IvVcoBz.png';

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseInt(amount) < 10000) {
      toast.error('Minimum deposit Rp 10.000');
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (selectedMethod === 'qris') {
        setShowQRIS(true);
        toast.success('Siap untuk scan QRIS!');
      } else {
        toast.success('Deposit request created!');
      }
    } catch (error) {
      toast.error('Gagal membuat deposit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white">💰 Topup Saldo</h1>
          <p className="text-gray-300 mt-2">Tambahkan saldo ke akun Anda dengan berbagai metode pembayaran</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Pilih Jumlah & Metode</h2>

            <form onSubmit={handleDeposit} className="space-y-6">
              {/* Quick Amount Selection */}
              <div>
                <label className="block text-white font-semibold mb-3">Pilihan Cepat</label>
                <div className="grid grid-cols-2 gap-3">
                  {[50000, 100000, 250000, 500000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val.toString())}
                      className={`p-3 rounded-lg transition ${
                        amount === val.toString()
                          ? 'bg-green-600 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      Rp {(val / 1000).toLocaleString('id-ID')}K
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-white font-semibold mb-2">Jumlah Custom</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-white font-semibold">Rp</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Masukkan jumlah"
                    min="10000"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-white font-semibold mb-3">Metode Pembayaran</label>
                <div className="space-y-2">
                  {[
                    { id: 'qris', name: 'QRIS (Scan & Bayar)', icon: '📱' },
                    { id: 'transfer', name: 'Transfer Bank', icon: '🏦' },
                    { id: 'ewallet', name: 'E-Wallet', icon: '💳' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full p-3 rounded-lg text-left transition ${
                        selectedMethod === method.id
                          ? 'bg-green-600 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xl mr-2">{method.icon}</span>
                      {method.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !amount}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-3 rounded-lg transition"
              >
                {loading ? 'Processing...' : `Lanjutkan - Rp ${parseInt(amount || 0).toLocaleString('id-ID')}`}
              </button>
            </form>
          </div>

          {/* Info Section / QRIS Display */}
          <div className="space-y-6">
            {!showQRIS ? (
              <>
                {/* Payment Information */}
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">💡 Informasi Pembayaran</h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex gap-3">
                      <span className="text-green-400">✓</span>
                      <span>Proses cepat, saldo langsung masuk dalam 1-5 menit</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400">✓</span>
                      <span>Aman dan terpercaya dengan enkripsi end-to-end</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400">✓</span>
                      <span>Tidak ada biaya admin untuk metode tertentu</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400">✓</span>
                      <span>Supported oleh berbagai e-wallet dan bank lokal</span>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">❓ FAQ</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-semibold text-white mb-1">Berapa minimum deposit?</p>
                      <p className="text-gray-400">Minimum deposit adalah Rp 10.000</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Kapan saldo masuk?</p>
                      <p className="text-gray-400">Biasanya 1-5 menit, maksimal 1 jam</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Ada biaya tambahan?</p>
                      <p className="text-gray-400">Tidak ada biaya admin untuk QRIS dan e-wallet</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* QRIS Section */
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-6">📱 Scan QRIS Code</h3>
                <div className="bg-white/10 rounded-xl p-6 mb-6 flex justify-center">
                  <div className="relative w-64 h-64">
                    <Image
                      src={QRIS_IMAGE}
                      alt="QRIS Code"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-4 mb-6">
                  <p className="text-green-100 text-sm font-semibold">
                    Scan QR code dengan aplikasi e-wallet Anda
                  </p>
                  <p className="text-green-200 text-xs mt-2">
                    Supported: GoPay, OVO, Dana, LinkAja, dan lainnya
                  </p>
                </div>
                <p className="text-gray-400 text-sm mb-4">Jumlah: <span className="font-bold text-white">Rp {parseInt(amount || 0).toLocaleString('id-ID')}</span></p>
                <button
                  onClick={() => setShowQRIS(false)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition"
                >
                  Kembali
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
