'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

const PaymentMethodsPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('qris');
  const [formData, setFormData] = useState({
    amount: '',
    phoneNumber: '',
    notes: '',
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const QRIS_IMAGE = 'https://i.imgur.com/IvVcoBz.png';

  const paymentMethods = [
    {
      id: 'qris',
      name: 'QRIS',
      icon: '📱',
      description: 'Scan QRIS code dengan aplikasi e-wallet Anda',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: '🏦',
      description: 'Transfer ke rekening bank yang tersedia',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'e_wallet',
      name: 'E-Wallet',
      icon: '💳',
      description: 'Bayar menggunakan GCash, OVO, Dana, atau LinkAja',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'manual_transfer',
      name: 'Manual Transfer',
      icon: '💰',
      description: 'Transfer manual dan upload bukti pembayaran',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const bankAccounts = [
    { bank: 'BCA', account: '1234567890', name: 'PT PPOB Enterprise' },
    { bank: 'Mandiri', account: '0987654321', name: 'PT PPOB Enterprise' },
    { bank: 'BNI', account: '5555666677', name: 'PT PPOB Enterprise' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 5MB');
        return;
      }
      setUploadedFile(file);
      toast.success('File bukti pembayaran berhasil diupload');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount) {
      toast.error('Silakan isi jumlah pembayaran');
      return;
    }

    if (selectedMethod === 'manual_transfer' && !uploadedFile) {
      toast.error('Silakan upload bukti pembayaran');
      return;
    }

    setLoading(true);
    try {
      // Simulasi upload
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Pembayaran berhasil diproses!');
      setFormData({ amount: '', phoneNumber: '', notes: '' });
      setUploadedFile(null);
    } catch (error) {
      toast.error('Terjadi kesalahan saat memproses pembayaran');
    } finally {
      setLoading(false);
    }
  };

  const currentMethod = paymentMethods.find((m) => m.id === selectedMethod);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-5xl font-bold text-white mb-2">💳 Payment Methods</h1>
          <p className="text-gray-300 text-lg">Pilih metode pembayaran yang paling nyaman untuk Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods List */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 space-y-3">
              <h2 className="text-xl font-bold text-white mb-4">Metode Pembayaran</h2>
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-lg transition-all text-left ${
                    selectedMethod === method.id
                      ? 'bg-gradient-to-r ' + method.color + ' text-white scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <div className="text-2xl mb-2">{method.icon}</div>
                  <div className="font-bold">{method.name}</div>
                  <div className="text-xs opacity-75">{method.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* QRIS Section */}
              {selectedMethod === 'qris' && (
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Pembayaran QRIS</h2>
                  <div className="bg-white/10 rounded-xl p-8 mb-6 flex justify-center">
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
                  <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4 mb-6">
                    <p className="text-blue-100 text-sm">
                      ✓ Scan QR code di atas dengan aplikasi e-wallet Anda (GoPay, OVO, Dana, LinkAja, dll)
                    </p>
                  </div>
                </div>
              )}

              {/* Bank Transfer Section */}
              {selectedMethod === 'bank_transfer' && (
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Rekening Bank Tujuan</h2>
                  <div className="space-y-4">
                    {bankAccounts.map((bank, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-white">{bank.bank}</p>
                            <p className="text-gray-400 font-mono text-sm">{bank.account}</p>
                            <p className="text-gray-500 text-xs">{bank.name}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(bank.account);
                              toast.success('Nomor rekening disalin!');
                            }}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual Transfer Section */}
              {selectedMethod === 'manual_transfer' && (
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Upload Bukti Pembayaran</h2>
                  <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-white/50 transition">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer block">
                      <div className="text-4xl mb-3">📸</div>
                      <p className="text-white font-semibold mb-1">
                        {uploadedFile ? uploadedFile.name : 'Upload Bukti Pembayaran'}
                      </p>
                      <p className="text-gray-400 text-sm">Klik untuk memilih file (PNG, JPG, PDF max 5MB)</p>
                    </label>
                  </div>
                </div>
              )}

              {/* E-Wallet Section */}
              {selectedMethod === 'e_wallet' && (
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">E-Wallet Payment</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {['GCash', 'OVO', 'Dana', 'LinkAja'].map((wallet) => (
                      <button
                        key={wallet}
                        type="button"
                        className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
                      >
                        <div className="font-semibold text-white">{wallet}</div>
                        <div className="text-xs text-gray-400">Tap untuk lanjutkan</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Amount & Notes */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Jumlah Pembayaran</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-white">Rp</span>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="Masukkan jumlah"
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Catatan (Opsional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Catatan atau referensi pembayaran"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-bold text-lg transition ${
                  loading
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : `bg-gradient-to-r ${currentMethod?.color} text-white hover:shadow-lg hover:shadow-blue-500/50`
                }`}
              >
                {loading ? 'Processing...' : `Pay with ${currentMethod?.name}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
