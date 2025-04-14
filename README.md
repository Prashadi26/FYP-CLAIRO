# Clairo - Client Case Management System

A modern, responsive legal case management system with WhatsApp integration for attorney-client communication.

## Features

- **Authentication System**
  - Secure login and registration
  - Password reset functionality
  - Session persistence

- **Dashboard Overview**
  - Case statistics
  - Recent cases view
  - Upcoming tasks
  - Case status visualization

- **Case Management**
  - Case listing and details
  - Document management
  - Task tracking
  - Court hearing scheduling

- **Client Management**
  - Client profiles
  - Case history
  - Contact information

- **WhatsApp Integration**
  - Direct client messaging
  - Real-time notifications
  - Automated reminders for tasks and hearings

- **Multilingual Support**
  - English and Tamil languages
  - Easy language switching

## Tech Stack

- **Frontend**
  - React.js with React Router
  - Modern responsive UI
  - Recharts for data visualization

- **Backend Integration**
  - Supabase for authentication and database
  - Express.js server for WhatsApp API integration
  - Real-time subscription for messages

- **External APIs**
  - Twilio WhatsApp API for messaging

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account
- Twilio account with WhatsApp API access

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_KEY=your_supabase_anon_key
```

For the Express server, create a `.env` file with:

```
PORT=5000
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key
```

### Installation

#### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm start
```

#### Backend (Express Server)
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start server
npm start
```

## Database Structure

The application uses the following Supabase tables:

- `users`: Authentication data and lawyer_id reference
- `attorney_at_law`: Attorney profiles and details
- `clients`: Client information and attorney relationships
- `cases`: Legal cases with status and details
- `client_case_task`: Tasks associated with cases
- `hearings`: Court hearing schedules
- `messages`: Communication between attorneys and clients

## Usage

1. Register as an attorney
2. Add clients with their WhatsApp numbers
3. Create cases and associate them with clients
4. Manage tasks and court hearings
5. Communicate with clients via WhatsApp integration
6. View dashboard analytics for your practice

## Deployment

The frontend can be deployed to Netlify, Vercel, or any static hosting service. The Express server should be deployed to a Node.js hosting service like Heroku, Railway, or DigitalOcean.

## License

This project is licensed under the MIT License.
