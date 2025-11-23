#!/bin/bash

# Hotel Booking Platform - Quick Setup Script
# This script helps you set up the project quickly

echo "🏨 Hotel Booking Platform - Quick Setup"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "npm $(npm -v) detected"

# Install dependencies
print_info "Installing dependencies..."
if npm install; then
    print_status "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    print_warning ".env.local not found. Creating from template..."
    cp .env.example .env.local
    print_status "Created .env.local from .env.example"
    print_warning "Please edit .env.local with your actual API keys and database URL"
else
    print_status ".env.local already exists"
fi

# Check for required environment variables
print_info "Checking environment configuration..."

REQUIRED_VARS=("DATABASE_URL" "JWT_SECRET")
MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
    if ! grep -q "^${var}=" .env.local || grep -q "^${var}=$" .env.local; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    print_warning "The following required environment variables need to be configured:"
    for var in "${MISSING_VARS[@]}"; do
        echo "  - $var"
    done
    print_info "Please update .env.local before running the application"
else
    print_status "Required environment variables are configured"
fi

# Generate Prisma client
print_info "Generating Prisma client..."
if npx prisma generate; then
    print_status "Prisma client generated successfully"
else
    print_warning "Failed to generate Prisma client. You may need to configure DATABASE_URL first."
fi

# Optional: Setup database
read -p "Do you want to setup the database now? (y/N): " setup_db
if [[ $setup_db =~ ^[Yy]$ ]]; then
    print_info "Setting up database..."
    if npx prisma db push; then
        print_status "Database schema pushed successfully"
        
        # Seed database
        read -p "Do you want to seed the database with sample data? (y/N): " seed_db
        if [[ $seed_db =~ ^[Yy]$ ]]; then
            print_info "Seeding database..."
            if npm run db:seed; then
                print_status "Database seeded successfully"
            else
                print_warning "Failed to seed database. You can run 'npm run db:seed' later."
            fi
        fi
    else
        print_warning "Failed to setup database. Please check your DATABASE_URL configuration."
    fi
fi

# Check for development tools
print_info "Installing development tools..."

# Install global packages if not present
if ! command -v vercel &> /dev/null; then
    print_info "Installing Vercel CLI..."
    npm install -g vercel
    print_status "Vercel CLI installed"
fi

if ! command -v prisma &> /dev/null; then
    print_info "Installing Prisma CLI globally..."
    npm install -g prisma
    print_status "Prisma CLI installed"
fi

# Create useful scripts
print_info "Creating useful scripts..."

cat > setup-db.sh << 'EOF'
#!/bin/bash
echo "Setting up database..."
npx prisma db push
npm run db:seed
echo "Database setup complete!"
EOF

cat > reset-db.sh << 'EOF'
#!/bin/bash
echo "Resetting database..."
npx prisma migrate reset --force
npm run db:seed
echo "Database reset complete!"
EOF

cat > deploy.sh << 'EOF'
#!/bin/bash
echo "Deploying to Vercel..."
vercel --prod
echo "Deployment complete!"
EOF

chmod +x setup-db.sh reset-db.sh deploy.sh
print_status "Created setup scripts: setup-db.sh, reset-db.sh, deploy.sh"

# Final instructions
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
print_info "Next steps:"
echo "1. Edit .env.local with your API keys and database URL"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000 to see your application"
echo ""
print_info "Useful commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run start        - Start production server"
echo "  npm run db:studio    - Open Prisma Studio"
echo "  npm run test         - Run tests"
echo ""
print_info "Scripts:"
echo "  ./setup-db.sh        - Setup and seed database"
echo "  ./reset-db.sh        - Reset and seed database"
echo "  ./deploy.sh          - Deploy to Vercel"
echo ""
print_info "Documentation:"
echo "  README.md            - Project documentation"
echo "  .env.example         - Environment variables template"
echo ""
print_warning "Don't forget to:"
echo "  - Configure your database connection"
echo "  - Add API keys (Stripe, Google Maps, etc.)"
echo "  - Set up email/SMS services"
echo ""
print_status "Happy coding! 🚀"