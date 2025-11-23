# Hotel Booking Platform - Deployment Guide

## 🚀 Quick Deployment to Vercel

### Prerequisites
- Node.js 18+ installed
- Git repository
- Vercel account (free tier available)

### Step 1: Environment Setup

1. **Clone and Install**
```bash
git clone <your-repo>
cd hotel-booking-platform
chmod +x setup.sh
./setup.sh
```

2. **Configure Environment Variables**
Edit `.env.local` with your credentials:

```bash
# Database
DATABASE_URL=postgresql://username:password@host:5432/database

# Authentication
JWT_SECRET=your-32-character-secret-key
JWT_REFRESH_SECRET=your-32-character-refresh-secret

# Stripe Payment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Hotel APIs (Optional - will use demo data if not provided)
RATEHAWK_API_KEY=your-ratehawk-key
AMADEUS_API_KEY=your-amadeus-key
EXPEDIA_API_KEY=your-expedia-key

# Email Service
SENDGRID_API_KEY=SG.your-sendgrid-key
FROM_EMAIL=noreply@yourdomain.com

# SMS Service
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token

# Other Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

### Step 2: Database Setup

**Option A: Supabase (Recommended for production)**
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string and update `DATABASE_URL`

**Option B: Railway**
1. Create account at [railway.app](https://railway.app)
2. Add PostgreSQL service
3. Use provided connection string

**Option C: Local PostgreSQL**
```bash
# Using Docker
docker run --name postgres-hotel -e POSTGRES_PASSWORD=password -e POSTGRES_DB=hotel_booking -p 5432:5432 -d postgres:15

# Update DATABASE_URL to:
DATABASE_URL=postgresql://postgres:password@localhost:5432/hotel_booking
```

### Step 3: Deploy to Vercel

**Method 1: Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Method 2: Vercel Dashboard**
1. Visit [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables in Vercel dashboard
5. Deploy

### Step 4: Configure Vercel Environment Variables

Add these in Vercel Project Settings > Environment Variables:

```
DATABASE_URL=your-database-connection-string
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-key
STRIPE_SECRET_KEY=your-stripe-secret
SENDGRID_API_KEY=your-sendgrid-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Step 5: Database Migration

After deployment, run database setup:

```bash
# If using Vercel CLI
vercel env pull .env.local
npx prisma db push
npm run db:seed
```

### Step 6: Test Deployment

Visit your Vercel URL and test:
- Homepage loads correctly
- Search functionality works
- Booking flow is functional
- User registration/login works

## 🐳 Docker Deployment

### Development
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production
```bash
# Create .env.prod file
cp .env.example .env.prod

# Edit production environment variables
nano .env.prod

# Deploy production stack
docker-compose -f docker-compose.prod.yml up -d
```

## 🔧 Manual Deployment (AWS/DigitalOcean)

### AWS EC2 Deployment

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t3.medium or larger
   - Security group: HTTP (80), HTTPS (443), SSH (22)

2. **Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y
```

3. **Application Deployment**
```bash
# Clone repository
git clone <your-repo>
cd hotel-booking-platform

# Install dependencies
npm install

# Build application
npm run build

# Setup database
npx prisma db push
npm run db:seed

# Start with PM2
pm2 start npm --name "hotel-booking" -- start
pm2 startup
pm2 save
```

4. **Nginx Configuration**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### DigitalOcean Droplet Deployment

1. **Create Droplet**
   - Ubuntu 22.04 LTS
   - 2GB RAM minimum
   - Add SSH key

2. **Setup Server**
Follow the same steps as AWS EC2 deployment above.

3. **Domain Configuration**
   - Point domain to Droplet IP
   - Setup SSL with Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

## 📊 Monitoring & Maintenance

### Application Monitoring
- **Sentry**: Error tracking
- **LogRocket**: User session recording
- **Vercel Analytics**: Performance monitoring

### Database Maintenance
```bash
# Backup database
docker exec hotel-booking-db pg_dump -U postgres hotel_booking_db > backup.sql

# Restore database
docker exec -i hotel-booking-db psql -U postgres hotel_booking_db < backup.sql

# Check database health
docker exec hotel-booking-db pg_isready -U postgres
```

### Performance Optimization
- Enable CDN for static assets
- Setup Redis for caching
- Configure database connection pooling
- Enable compression (gzip/brotli)

## 🔒 Security Checklist

- [ ] All API keys are secure (no hardcoded secrets)
- [ ] Database connections use SSL
- [ ] Environment variables are encrypted
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] SSL certificate is installed
- [ ] Security headers are configured
- [ ] Regular security updates are applied

## 📈 Scaling Considerations

### Database Scaling
- **Read Replicas**: For read-heavy workloads
- **Connection Pooling**: Use PgBouncer
- **Caching Layer**: Redis for sessions and API cache

### Application Scaling
- **Load Balancer**: Multiple app instances
- **Horizontal Scaling**: Multiple servers
- **CDN**: Static asset delivery
- **Microservices**: Split API services if needed

### Monitoring
- **Uptime**: UptimeRobot, Pingdom
- **Performance**: New Relic, DataDog
- **Logs**: ELK Stack, LogRocket
- **Metrics**: Prometheus + Grafana

## 🆘 Troubleshooting

### Common Issues

**Build Fails**
```bash
# Check TypeScript errors
npm run type-check

# Clear Next.js cache
rm -rf .next
npm run build
```

**Database Connection Issues**
```bash
# Test database connection
npx prisma db execute

# Check connection string
echo $DATABASE_URL
```

**API Errors**
```bash
# Check API logs
docker-compose logs app

# Test API health
curl http://localhost:3000/api/health
```

### Getting Help

- Check application logs
- Review Vercel function logs
- Check database status
- Verify environment variables
- Test API endpoints individually

## 🎯 Go-Live Checklist

- [ ] Environment variables configured
- [ ] Database is set up and seeded
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Email service configured
- [ ] Payment providers configured
- [ ] API keys are valid
- [ ] Test booking flow end-to-end
- [ ] Performance testing completed
- [ ] Security audit passed
- [ ] Monitoring tools configured
- [ ] Backup strategy implemented
- [ ] Documentation updated
- [ ] Team training completed

---

**Congratulations! Your Hotel Booking Platform is now live!** 🚀

For ongoing maintenance and updates, refer to the main README.md file.