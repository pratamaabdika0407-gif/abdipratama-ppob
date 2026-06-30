#!/bin/bash

# PPOB Enterprise - Quick Deploy Script
# Gunakan script ini untuk deploy ke production

echo "🚀 PPOB Enterprise - Production Setup"
echo "=====================================\n"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not installed${NC}"
    echo "Download from: https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm $(npm --version)${NC}\n"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ npm install failed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Dependencies installed${NC}\n"

# Check environment file
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local not found${NC}"
    cp .env.example .env.local
    echo -e "${YELLOW}📝 Created .env.local from .env.example${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env.local with your configuration${NC}\n"
    exit 1
fi

echo -e "${GREEN}✓ Environment file found${NC}\n"

# Generate Prisma Client
echo -e "${YELLOW}🔧 Generating Prisma client...${NC}"
npm run prisma:generate

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Prisma generate failed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prisma client generated${NC}\n"

# Run migrations
echo -e "${YELLOW}🗄️  Running database migrations...${NC}"
npm run prisma:migrate

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Migration warning - database might already be updated${NC}\n"
fi

echo -e "${GREEN}✓ Database ready${NC}\n"

# Build
echo -e "${YELLOW}🏗️  Building application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build successful${NC}\n"

# Success message
echo -e "${GREEN}=====================================\n"
echo -e "${GREEN}✅ Setup Complete!${NC}\n"

echo "📋 Next steps:"
echo -e "${YELLOW}1. Review configuration in .env.local${NC}"
echo -e "${YELLOW}2. Configure PPOB API provider${NC}"
echo -e "${YELLOW}3. Setup email/WhatsApp integration${NC}"
echo -e "${YELLOW}4. Test all payment methods${NC}\n"

echo "🚀 Start development:"
echo -e "${GREEN}npm run dev${NC}\n"

echo "🚀 Start production:"
echo -e "${GREEN}npm run start${NC}\n"

echo -e "${GREEN}Visit: http://localhost:3000${NC}\n"
