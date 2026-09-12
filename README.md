# AegisNet - Professional Cybersecurity Monitoring & SOC Platform

**Protect Your Digital World with AegisNet**

A modern, full-stack cybersecurity monitoring and SOC (Security Operations Center) platform with real-time threat detection, network monitoring, device management, and AI-powered security assistance.

## 🎯 Features

- **Real-time Dashboard**: Comprehensive security overview with key metrics
- **Network Monitoring**: Track bandwidth, latency, and network traffic in real-time
- **Threat Detection**: Identify and manage security threats across all devices
- **Alert Management**: Intelligent alert system with severity levels
- **Device Management**: Monitor and control all connected devices
- **Analytics & Reports**: Visual analytics and comprehensive security reports
- **Aegis AI Assistant**: AI-powered security insights and recommendations
- **User Authentication**: Secure JWT-based authentication with bcrypt hashing
- **Responsive Design**: Full mobile, tablet, and desktop support
- **Professional UI**: Modern, professional cybersecurity platform design

## 🛠 Technology Stack

### Frontend
- React.js (Vite)
- JavaScript
- React Router
- Recharts (for analytics visualizations)
- Lucide React (icons)
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcrypt (password hashing)

## 📁 Project Structure

```
AegisNet/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── layouts/       # Layout components
│   │   ├── services/      # API services
│   │   ├── context/       # React Context
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   ├── assets/        # Images, icons
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend (Node + Express)
│   ├── controllers/       # Route handlers
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── services/         # Business logic
│   ├── config/           # Configuration files
│   ├── server.js
│   └── package.json
│
├── .env.example          # Example environment variables
├── .gitignore
├── README.md
└── package.json          # Root package.json for workspaces
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```bash
cp .env.example .env
```

4. Configure MongoDB URI and JWT secret in `.env`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```bash
cp .env.example .env
```

## 💻 Running the Application

### Development Mode (from root directory)

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run separately:

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

### Production Build

```bash
npm run build
```

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aegisnet
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Dashboard
- `GET /api/dashboard` - Get dashboard data

### Devices
- `GET /api/devices` - List all devices
- `POST /api/devices` - Create new device
- `PUT /api/devices/:id` - Update device
- `DELETE /api/devices/:id` - Delete device

### Threats
- `GET /api/threats` - List all threats
- `GET /api/threats/:id` - Get threat details
- `PUT /api/threats/:id` - Update threat

### Alerts
- `GET /api/alerts` - List all alerts
- `PUT /api/alerts/:id` - Update alert

### Analytics
- `GET /api/analytics` - Get analytics data

### Reports
- `GET /api/reports` - List reports
- `POST /api/reports` - Generate report

### AI
- `POST /api/ai/chat` - Chat with Aegis AI

## 🎨 Color Palette

```
Main Background:    #0B1120
Sidebar:            #111827
Cards:              #172033
Primary Cyan:       #00D9FF (Signature AegisNet color)
Secondary Blue:     #3B82F6
Success:            #22C55E
Warning:            #F59E0B
Critical:           #EF4444
Main Text:          #F8FAFC
Secondary Text:     #94A3B8
```

## 👤 Demo Account

**Note:** Create your own account via registration or use demo data.

## 🔒 Security Features

- JWT-based authentication
- bcrypt password hashing
- Protected API routes with middleware
- Secure environment variable handling
- Input validation and sanitization
- CORS configuration
- Session management
- Password reset functionality

## 📱 Responsive Design

- Desktop: Full sidebar navigation
- Tablet: Compact sidebar
- Mobile: Hamburger menu navigation

## 🤖 Aegis AI

AI-powered security assistant providing:
- Threat analysis and insights
- Security recommendations
- Device status queries
- Alert explanations

**Note:** Uses demo/mock responses for demonstration. Connect to real AI provider in production.

## 📊 Demo Data

The application comes with realistic demo data:
- Multiple devices (Laptop, Mobile, Desktop, Server, Router, IoT)
- Security threats with various severity levels
- Alerts and notifications
- Network analytics
- Security metrics

**Demo Environment Badge** is displayed to indicate demo data usage.

## ♿ Accessibility

- Keyboard navigation support
- ARIA labels and roles
- Focus states
- Semantic HTML
- Color contrast compliance
- Alt text for images

## 🛠 Development

To contribute or extend the project:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ for cybersecurity professionals and enthusiasts**
