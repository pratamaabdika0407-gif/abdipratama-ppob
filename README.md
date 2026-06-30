# PPOB Enterprise - Platform Pembayaran Otomatis

Website PPOB Enterprise full otomatis dengan UI premium seperti DANA. Platform lengkap untuk reseller, affiliate, dan admin.

## 🎯 Fitur Utama

✅ Website PPOB Enterprise Full Otomatis
✅ UI premium seperti DANA
✅ Pembelian tanpa login
✅ Reseller & Affiliate wajib daftar dan login
✅ Dashboard Admin lengkap
✅ Dashboard Reseller
✅ Dashboard Affiliate
✅ Integrasi API Provider PPOB
✅ Halaman pengaturan API Key
✅ Harga realtime
✅ Sinkronisasi otomatis
✅ QRIS (gambar yang Anda berikan)
✅ Upload bukti pembayaran wajib
✅ Status transaksi realtime
✅ Live Chat AI seperti sales profesional
✅ Pusat bantuan (email & WhatsApp)
✅ Laporan pemasukan & pengeluaran
✅ Grafik modern
✅ Voucher & Promo
✅ Flash Sale
✅ Riwayat transaksi
✅ Cetak struk thermal 58 mm & 80 mm
✅ Download PDF
✅ QR Code invoice
✅ Barcode invoice
✅ Loading screen premium
✅ Dark Mode
✅ Glassmorphism
✅ PWA
✅ Docker
✅ Firebase
✅ PostgreSQL
✅ Prisma
✅ WebSocket
✅ Backup otomatis
✅ Audit Log
✅ SEO
✅ Responsive Android/iPhone/Desktop
✅ Clean Architecture
✅ Siap deploy
✅ Dokumentasi lengkap

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: NextAuth.js
- **Real-time**: WebSocket, Socket.io
- **Payment Gateway**: QRIS, Bank Transfer, E-Wallet
- **Storage**: Firebase Storage / AWS S3
- **Deployment**: Docker, Docker Compose
- **Styling**: Tailwind CSS, Glassmorphism
- **State Management**: Zustand
- **Charts**: Recharts
- **PWA**: Next PWA

## 📦 Project Structure

```
ppob-enterprise/
├── src/
│   ├── app/                 # Next.js 14 app directory
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utility functions & configurations
│   ├── store/               # Zustand state management
│   ├── types/               # TypeScript type definitions
│   ├── styles/              # Global styles
│   └── pages/               # Legacy pages (if needed)
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── public/                  # Static assets
├── docker-compose.yml       # Docker services configuration
├── Dockerfile               # Docker build configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Docker (optional)

### Installation

1. **Clone repository**
```bash
git clone https://github.com/pratamaabdika0407-gif/abdipratama-ppob.git
cd abdipratama-ppob
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
# Edit .env.local dengan konfigurasi Anda
```

4. **Setup database**
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

5. **Run development server**
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Setup

### Build dan Run dengan Docker Compose

```bash
# Build services
docker-compose build

# Run services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

Services yang tersedia:
- App: http://localhost:3000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## 📚 Dokumentasi API

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/:id` - Get transaction detail
- `GET /api/transactions/:id/receipt` - Get receipt

### Deposits
- `GET /api/deposits` - Get all deposits
- `POST /api/deposits` - Create deposit
- `GET /api/deposits/:id` - Get deposit detail

### Dashboard
- `GET /api/dashboard/admin/overview` - Admin overview
- `GET /api/dashboard/reseller/overview` - Reseller overview
- `GET /api/dashboard/affiliate/overview` - Affiliate overview

## 🔐 Security

- Password hashing dengan bcrypt
- JWT token authentication
- CSRF protection
- SQL injection prevention (Prisma)
- XSS protection
- Rate limiting
- Input validation
- CORS configuration

## 📈 Performance

- Image optimization dengan Next.js Image
- Code splitting dan lazy loading
- Database query optimization
- Caching strategy
- CDN integration ready
- PWA for offline access

## 🔧 Development

### Useful Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## 📝 Database Schema

Database mencakup table-table berikut:
- Users (Admin, Reseller, Affiliate, Customer)
- Transactions
- Deposits
- Commissions
- Categories
- Products
- Notifications
- AuditLogs
- Vouchers
- FlashSales
- Pages

## 🚢 Deployment

### Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy ke Railway / Heroku

```bash
# Push ke GitHub
git push origin main

# Connect repository di Railway/Heroku dashboard
```

## 📞 Support

- Email: support@ppobenterprise.com
- WhatsApp: +62-xxx-xxx-xxxx
- Live Chat: https://ppobenterprise.com/chat

## 📄 License

MIT License - Lihat LICENSE file untuk detail

## 👨‍💻 Author

Dibuat dengan ❤️ oleh [Abdika Pratama](https://github.com/pratamaabdika0407-gif)

## 🤝 Contributing

Kontribusi sangat diterima! Silahkan fork repository ini dan submit pull request.

---

**Last Updated**: June 30, 2026
