#!/bin/bash

# PPOB Enterprise - Docker Deploy Script
# Gunakan script ini untuk deploy dengan Docker

echo "🐳 PPOB Enterprise - Docker Production Setup"
echo "============================================\n"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker not installed${NC}"
    echo "Download from: https://www.docker.com"
    exit 1
fi

echo -e "${GREEN}✓ Docker $(docker --version)${NC}"

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker Compose $(docker-compose --version)${NC}\n"

# Check environment file
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env not found${NC}"
    cp .env.example .env
    echo -e "${YELLOW}📝 Created .env from .env.example${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env with your configuration${NC}\n"
    exit 1
fi

echo -e "${GREEN}✓ Environment file found${NC}\n"

# Build images
echo -e "${YELLOW}🔨 Building Docker images...${NC}"
docker-compose build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Images built${NC}\n"

# Start services
echo -e "${YELLOW}🚀 Starting services...${NC}"
docker-compose up -d

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to start services${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Services started${NC}\n"

# Wait for database
echo -e "${YELLOW}⏳ Waiting for database to be ready...${NC}"
sleep 10

# Run migrations
echo -e "${YELLOW}🗄️  Running database migrations...${NC}"
docker-compose exec -T app npm run prisma:migrate

echo -e "${GREEN}✓ Database ready${NC}\n"

# Show services
echo -e "${GREEN}✅ Services are running:\n"
echo -e "${YELLOW}App:${NC} http://localhost:3000"
echo -e "${YELLOW}PostgreSQL:${NC} localhost:5432"
echo -e "${YELLOW}Redis:${NC} localhost:6379\n"

echo -e "${YELLOW}View logs:${NC}"
echo -e "${GREEN}docker-compose logs -f app${NC}\n"

echo -e "${YELLOW}Stop services:${NC}"
echo -e "${GREEN}docker-compose down${NC}\n"
