# Hotel Booking Platform - Makefile

.PHONY: help install setup dev build start test lint format clean db-setup db-reset db-seed docker-up docker-down docker-logs deploy

# Default target
help: ## Show this help message
	@echo "Hotel Booking Platform - Available Commands"
	@echo "==========================================="
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development
install: ## Install dependencies
	npm install

setup: install ## Setup project (install deps, copy env file)
	@if [ ! -f .env.local ]; then \
		cp .env.example .env.local; \
		echo "✅ Created .env.local from template"; \
		echo "⚠️  Please edit .env.local with your configuration"; \
	else \
		echo "✅ .env.local already exists"; \
	fi

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run build

start: ## Start production server
	npm run start

# Database
db-setup: ## Setup database schema and seed data
	npx prisma db push
	npm run db:seed

db-reset: ## Reset database and seed with fresh data
	npx prisma migrate reset --force
	npm run db:seed

db-seed: ## Seed database with sample data
	npm run db:seed

db-studio: ## Open Prisma Studio
	npx prisma studio

db-generate: ## Generate Prisma client
	npx prisma generate

db-migrate: ## Create and run database migration
	npx prisma migrate dev

db-migrate-prod: ## Deploy migrations to production
	npx prisma migrate deploy

# Testing
test: ## Run unit tests
	npm run test

test-watch: ## Run tests in watch mode
	npm run test:watch

test-e2e: ## Run end-to-end tests
	npm run test:e2e

test-coverage: ## Run tests with coverage report
	npm run test:coverage

# Code Quality
lint: ## Run ESLint
	npm run lint

lint-fix: ## Fix ESLint issues
	npm run lint:fix

format: ## Format code with Prettier
	npm run format

type-check: ## Run TypeScript type checking
	npm run type-check

# Security
security-audit: ## Run security audit
	npm audit

security-fix: ## Fix security vulnerabilities
	npm audit fix

# Docker
docker-up: ## Start all services with Docker Compose
	docker-compose up -d

docker-down: ## Stop all Docker services
	docker-compose down

docker-logs: ## View Docker logs
	docker-compose logs -f

docker-build: ## Build Docker image
	docker build -t hotel-booking-platform .

docker-clean: ## Clean up Docker resources
	docker-compose down -v
	docker system prune -f

# Docker Production
docker-prod-up: ## Start production services
	docker-compose -f docker-compose.prod.yml up -d

docker-prod-down: ## Stop production services
	docker-compose -f docker-compose.prod.yml down

docker-prod-logs: ## View production logs
	docker-compose -f docker-compose.prod.yml logs -f

# Deployment
deploy: build ## Deploy to Vercel
	npx vercel --prod

deploy-check: ## Check deployment status
	npx vercel ls

# Environment
env-check: ## Check environment configuration
	@echo "Checking required environment variables..."
	@bash -c 'source .env.local && echo "✅ Environment file loaded"'
	@if ! grep -q "^DATABASE_URL=" .env.local || grep -q "^DATABASE_URL=$$" .env.local; then \
		echo "❌ DATABASE_URL not configured"; \
		exit 1; \
	fi
	@if ! grep -q "^JWT_SECRET=" .env.local || grep -q "^JWT_SECRET=$$" .env.local; then \
		echo "❌ JWT_SECRET not configured"; \
		exit 1; \
	fi
	@echo "✅ Basic environment variables configured"

env-backup: ## Backup environment file
	cp .env.local .env.local.backup.$(shell date +%Y%m%d_%H%M%S)
	@echo "✅ Environment file backed up"

# Cleanup
clean: ## Clean build artifacts
	rm -rf .next
	rm -rf node_modules/.cache
	rm -rf coverage
	rm -rf dist

clean-all: clean ## Clean everything including node_modules
	rm -rf node_modules
	rm -rf .env.local

# Maintenance
backup: ## Backup database
	@read -p "Enter backup filename: " filename; \
	docker exec hotel-booking-db pg_dump -U postgres hotel_booking_db > backup_$${filename:-database_$(shell date +%Y%m%d)}.sql

restore: ## Restore database from backup
	@read -p "Enter backup filename to restore: " filename; \
	if [ -f "$$filename" ]; then \
		docker exec -i hotel-booking-db psql -U postgres hotel_booking_db < $$filename; \
		echo "✅ Database restored from $$filename"; \
	else \
		echo "❌ Backup file $$filename not found"; \
	fi

# Analytics
size-analysis: ## Analyze bundle size
	npm run build
	npx @next/bundle-analyzer .next/static/chunks/*.js

performance: ## Run performance analysis
	npm run build
	npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json

# Documentation
docs: ## Generate documentation
	npx typedoc src --out docs

docs-serve: ## Serve documentation locally
	cd docs && python3 -m http.server 8000

# Quick Commands
quick-start: setup env-check db-setup dev ## Complete quick setup and start dev server
	@echo "🚀 Quick start complete! Visit http://localhost:3000"

quick-deploy: lint type-check build deploy ## Quick deploy to production
	@echo "🚀 Deploying to production..."

# Health Checks
health: ## Check application health
	curl -f http://localhost:3000/api/health || exit 1
	@echo "✅ Application is healthy"

db-health: ## Check database connectivity
	npx prisma db execute --preview-feature && echo "✅ Database connection healthy"

redis-health: ## Check Redis connectivity
	docker exec hotel-booking-redis redis-cli ping | grep -q PONG && echo "✅ Redis connection healthy" || echo "❌ Redis connection failed"

# Development Tools
storybook: ## Start Storybook for component development
	npm run storybook

component-test: ## Test components with Storybook
	npm run test-storybook

# Monitoring
logs: ## View application logs
	tail -f logs/app.log 2>/dev/null || echo "No application logs found"

monitor: ## Monitor application performance
	@echo "Starting monitoring dashboard..."
	@echo "  - Application: http://localhost:3000"
	@echo "  - Database UI: http://localhost:8080"
	@echo "  - Redis UI: http://localhost:8081"
	@echo "  - API Docs: http://localhost:3000/api/docs"