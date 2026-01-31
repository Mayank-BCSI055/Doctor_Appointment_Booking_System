
# Doctor Appointment Frontend (skeleton)

This repo contains a minimal React frontend scaffold matching the structure provided in the project diagram and report.
Files are intentionally lightweight skeletons so you can plug in your backend quickly.

How to run:

1. Install deps: `npm install`
2. Run: `npm run dev`
Backend: The api endpoints referenced (e.g. /api/auth/login) are expected from your backend. For quick testing, either run a mock server or modify the api calls to return mocked responses.

Files created mirror the requested structure and include:

- src/main.jsx, src/App.jsx
- src/api/* (axiosInstance, auth.api, admin.api, patient.api)
- src/auth/* (AuthContext, useAuth, ProtectedRoute)
- src/routes/* (AdminRoutes, PatientRoutes)
- src/pages/admin/* and src/pages/patient/*
- src/components/*
- src/utils/*
- src/styles/global.css

See the project report you uploaded for detailed requirements.

# Doctor Appointment Booking System - Frontend

A React-based frontend application for the Doctor Appointment Booking System.

## Features

### Admin Dashboard

- Manage doctor profiles (Create, Update, Activate/Deactivate)
- Manage availability slots
- View all appointments
- Cancel any appointment
- Complete appointments

### Patient Dashboard

- Browse active doctors
- View doctor profiles and specializations
- Book appointments from available slots
- View upcoming and past appointments
- Cancel own appointments

## Technology Stack

- **React 18** - Frontend framework
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **JWT** - Authentication

## Project Structure

```
src/
├── components/          # Reusable components
│   └── common/         # Common components
├── pages/              # Page components
│   ├── admin/         # Admin pages
│   └── patient/       # Patient pages
├── routes/            # Route configurations
├── services/          # API service layers
├── utils/             # Utility functions
├── App.jsx            # Main app component
├── api.jsx            # Axios configuration
└── index.js           # Entry point
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (default: http://localhost:5000)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd doctor-appointment-frontend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start development server
```bash
npm start
```

The application will open at http://localhost:3000

### Build for Production

```bash
npm run build
```

## User Roles

### ADMIN

- **Login**: Use the pre-configured admin credentials from backend
- **Capabilities**: 
  - Full doctor management
  - Slot management
  - View all appointments
  - Cancel/Complete any appointment

### PATIENT

- **Registration**: Self-registration available
- **Capabilities**:
  - Browse doctors
  - Book appointments
  - View own appointments
  - Cancel own appointments

## API Integration

The frontend communicates with the backend through RESTful APIs:

### Authentication

- `POST /api/auth/register` - Patient registration
- `POST /api/auth/login` - User login

### Doctors (Patient: Read-only, Admin: Full access)

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/active` - Get active doctors
- `POST /api/doctors` - Create doctor (Admin)
- `PUT /api/doctors/:id` - Update doctor (Admin)
- `PATCH /api/doctors/:id/toggle-status` - Toggle status (Admin)
- `DELETE /api/doctors/:id` - Delete doctor (Admin)

### Slots (Patient: Read-only, Admin: Full access)

- `GET /api/slots/doctor/:doctorId` - Get doctor slots
- `GET /api/slots/doctor/:doctorId/available` - Get available slots
- `POST /api/slots` - Create slot (Admin)
- `DELETE /api/slots/:id` - Delete slot (Admin)

### Appointments

- `POST /api/appointments` - Book appointment (Patient)
- `GET /api/appointments/my-appointments` - Get user's appointments (Patient)
- `GET /api/appointments` - Get all appointments (Admin)
- `PATCH /api/appointments/:id/cancel` - Cancel appointment
- `PATCH /api/appointments/:id/complete` - Complete appointment (Admin)

## Key Features Implementation

### Authentication & Authorization

- JWT-based authentication
- Token stored in localStorage
- Automatic token injection in API requests
- Role-based route protection
- Auto-redirect on authentication failure

### Transaction Safety

- Optimistic UI updates
- Error handling and rollback
- Loading states for all async operations
- Confirmation dialogs for destructive actions

### User Experience

- Responsive design (mobile, tablet, desktop)
- Loading indicators
- Success/Error notifications
- Form validation
- Intuitive navigation

### Security

- Protected routes
- Role-based access control
- Token expiration handling
- XSS prevention through React

## Development Guidelines

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use Tailwind utility classes
- Keep components modular and reusable

### State Management

- Local state with useState
- API calls with useEffect
- Form handling with controlled components

### Error Handling

- Try-catch blocks for async operations
- User-friendly error messages
- Graceful degradation

## Testing

Run tests:
```bash
npm test
```

## Deployment

### Build

```bash
npm run build
```

### Deploy to Static Hosting

The `build` folder can be deployed to:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

### Environment Configuration

Ensure production environment variables are set:
```
REACT_APP_API_URL=https://your-production-api.com/api
```

## Troubleshooting

### CORS Issues

Ensure backend CORS configuration allows frontend origin.

### 401 Unauthorized

Check if token is valid and not expired. Try logging out and logging in again.

### API Connection Failed

Verify backend is running and API_URL is correct in `.env`.

## License

MIT License

## Contributors

Your Team Name

[ Intern Python Team ]

( Mayank Baranwal )
