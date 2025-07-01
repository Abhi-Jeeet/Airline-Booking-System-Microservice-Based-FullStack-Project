# SkyBook - Airline Booking Frontend

A modern Next.js frontend for the microservice-based airline booking system.

## Features

- 🛫 Flight search and booking
- 💳 Payment processing
- 📱 Responsive design
- 🔄 Real-time state management with Redux
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Validation**: Zod

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── booking/           # Booking flow pages
│   │   ├── create/        # Create booking
│   │   ├── payment/       # Payment processing
│   │   └── success/       # Booking confirmation
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── flight/            # Flight-related components
│   │   ├── FlightSearch.tsx
│   │   ├── FlightCard.tsx
│   │   └── FlightList.tsx
│   └── layout/            # Layout components
│       └── Header.tsx
├── lib/
│   ├── api/               # API service layers
│   │   ├── flightService.ts
│   │   └── bookingService.ts
│   └── store/             # Redux store
│       ├── slices/
│       │   ├── flightSlice.ts
│       │   ├── bookingSlice.ts
│       │   └── authSlice.ts
│       ├── store.ts
│       └── Providers.tsx
└── types/                 # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Running microservices (FlightService and BookingService)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
# Create .env.local file with the following content:
NEXT_PUBLIC_FLIGHT_SERVICE_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_BOOKING_SERVICE_URL=http://localhost:3002/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Integration

### Flight Service
- **Base URL**: `http://localhost:3001/api/v1`
- **Endpoints**:
  - `GET /flights` - Search flights
  - `GET /flights/:id` - Get specific flight
  - `GET /airports` - Get airports
  - `GET /cities` - Get cities
  - `PATCH /flights/:id/seats` - Update seats

### Booking Service
- **Base URL**: `http://localhost:3002/api/v1`
- **Endpoints**:
  - `POST /bookings` - Create booking
  - `POST /bookings/payments` - Process payment

## Usage

1. **Search Flights**: Use the search form on the home page
2. **Select Flight**: Click on a flight card to proceed to booking
3. **Enter Details**: Fill in passenger information
4. **Payment**: Complete payment to confirm booking
5. **Confirmation**: View booking confirmation and details

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create components in `src/components/`
2. Add API services in `src/lib/api/`
3. Update Redux slices in `src/lib/store/slices/`
4. Create pages in `src/app/`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
