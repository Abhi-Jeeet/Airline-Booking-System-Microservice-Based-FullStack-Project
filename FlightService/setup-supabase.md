# FlightService Supabase Migration Guide

## Prerequisites
1. Supabase account (sign up at https://supabase.com)
2. Node.js and npm installed
3. Git repository cloned

## Step 1: Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `airline-booking-system`
   - Database Password: Create a strong password
   - Region: Choose closest to you
5. Click "Create new project"
6. Wait for project to be created (2-3 minutes)

## Step 2: Get Database Connection Details

1. In your Supabase project dashboard, go to **Settings** → **Database**
2. Copy the following details:
   - Host: `db.your-project-ref.supabase.co`
   - Database name: `postgres`
   - Port: `5432`
   - User: `postgres`
   - Password: (the one you created)

## Step 3: Update Configuration

1. Update `FlightService/src/config/config.json`:
   - Replace `your_supabase_password` with your actual password
   - Replace `your-project-ref` with your actual project reference

2. Create `.env` file in FlightService directory:
```env
DB_HOST=db.your-project-ref.supabase.co
DB_USER=postgres
DB_PASSWORD=your_supabase_password
DB_NAME=postgres
DB_PORT=5432
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Step 4: Install Dependencies

```bash
cd FlightService

# Remove MySQL dependencies
npm uninstall mysql2

# Install PostgreSQL dependencies
npm install pg pg-hstore

# Install all dependencies
npm install
```

## Step 5: Run Database Migrations

```bash
# Create all tables in Supabase
npx sequelize-cli db:migrate --env development

# Verify migrations
npx sequelize-cli db:migrate:status
```

## Step 6: Seed Data (Optional)

```bash
# Add sample data
npx sequelize-cli db:seed:all --env development
```

## Step 7: Test the Service

```bash
# Start the service
npm run dev

# Test health endpoint
curl http://localhost:3001/health

# Test flights endpoint
curl http://localhost:3001/api/v1/flights
```

## Step 8: Frontend Integration

1. Create `.env.local` in frontend directory:
```env
NEXT_PUBLIC_FLIGHT_SERVICE_URL=http://localhost:3001/api/v1
```

2. Start frontend:
```bash
cd frontend
npm run dev
```

## Troubleshooting

### Connection Issues
- Verify Supabase credentials in config.json
- Check if SSL is properly configured
- Ensure firewall allows outbound connections to port 5432

### Migration Issues
- Check if all migration files are present
- Verify database permissions
- Check Supabase project status

### Frontend Connection Issues
- Verify FlightService is running on port 3001
- Check CORS configuration
- Verify environment variables

## Environment Variables Reference

### FlightService (.env)
```env
DB_HOST=db.your-project-ref.supabase.co
DB_USER=postgres
DB_PASSWORD=your_supabase_password
DB_NAME=postgres
DB_PORT=5432
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_FLIGHT_SERVICE_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_BOOKING_SERVICE_URL=http://localhost:3002/api/v1
NODE_ENV=development
```

## API Endpoints

After setup, these endpoints will be available:

- `GET /health` - Service health check
- `GET /api/v1/flights` - Get all flights
- `GET /api/v1/flights/:id` - Get specific flight
- `POST /api/v1/flights` - Create flight
- `PUT /api/v1/flights/:id` - Update flight
- `DELETE /api/v1/flights/:id` - Delete flight
- `GET /api/v1/airports` - Get all airports
- `GET /api/v1/cities` - Get all cities
- `PATCH /api/v1/flights/:id/seats` - Update flight seats 