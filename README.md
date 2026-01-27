# Short Text Sharing App

## Description
A modern text sharing platform that enables users to share thoughts, connect with others, and build communities through short-form content. Built with React and Node.js, it provides real-time interactions, user authentication, and media sharing capabilities in a clean, responsive interface.

## Architecture

### Tech Stack

**Frontend:**
- React 18 with TypeScript
- Zustand for state management
- TanStack Query for server state
- React Router for navigation
- Tailwind CSS for styling
- Vite for build tooling

**Backend:**
- Node.js with Express
- Prisma ORM with MongoDB
- JWT authentication with refresh tokens
- AWS S3 for image storage
- Express Validator for input validation

## Key Features

- **User Authentication**: Secure JWT-based auth with automatic token refresh
- **Posts & Comments**: Create, edit, and delete posts with nested commenting
- **Social Interactions**: Like posts and follow/unfollow users
- **Media Upload**: Profile pictures, cover images, and post images via AWS S3
- **User Profiles**: Customizable profiles with bio and follower counts
- **Notifications**: Real-time notification system for user interactions
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Optimistic UI updates with TanStack Query caching

## Live Demo
*Coming Soon*

## How to Run Locally

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- AWS S3 bucket for images

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd twitter-full-stack
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
DATABASE_URL="mongodb://localhost:27017/twitter-clone"
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket"
PORT=3001

# Setup database
npx prisma generate
npx prisma db push

# Start backend
npm run dev
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Create .env file
VITE_API_URL="http://localhost:3001"

# Start frontend
npm run dev
```

4. **Access the app**
- Frontend: http://localhost:5173
- Backend: http://localhost:3001