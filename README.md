# Water Quality Index (WQI) Application

A full-stack web application built with **Next.js 16**, **React 19**, and **PostgreSQL** to monitor and calculate water quality metrics. The application features secure user authentication, JWT-based token rotation, and a modular architecture following industry best practices.

## 🎯 Project Overview

The Water Quality Index application is designed to:
- Provide user authentication with secure refresh token rotation
- Store and manage water quality measurements and tests
- Calculate water quality indices based on multiple parameters
- Display real-time WQI data with visual indicators and color coding
- Ensure data security through JWT tokens and bcrypt password hashing

**Current Status:** MVP (Authentication module complete, WQI calculation module in development)

## 🏗️ Architecture Overview

### Project Structure

```
water_quality_index/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API Routes
│   │   │   └── auth/         # Authentication endpoints
│   │   ├── login/            # Login page
│   │   ├── signup/           # Signup page
│   │   └── layout.tsx        # Root layout
│   ├── components/           # React components
│   │   ├── login.jsx         # Login form
│   │   ├── signup.jsx        # Signup form
│   │   └── navbar.jsx        # Navigation
│   ├── modules/              # Business logic (MVC)
│   │   ├── auth/            # Authentication module
│   │   │   ├── auth.controller.js      # Route handlers
│   │   │   ├── auth.services.js        # Business logic
│   │   │   ├── auth.repositories.js    # Database queries
│   │   │   ├── auth.utils.js           # Crypto utilities
│   │   │   ├── auth.middleware.js      # Auth middleware
│   │   │   └── auth.validator.js       # Input validation
│   │   └── wqi/             # Water Quality Index module
│   │       └── wai.controller.js       # WQI calculations
│   ├── services/             # External service integrations
│   ├── lib/                  # Utilities & configurations
│   │   ├── db.js             # PostgreSQL connection pool
│   │   ├── error-handler.js  # Global error handler
│   │   └── validators/       # Input validation schemas
│   └── errors/               # Custom error classes
│       ├── appError.js       # Base error class
│       ├── authError.js      # Auth-specific errors
│       ├── badRequest.js     # 400 errors
│       ├── forbidden.js      # 403 errors
│       ├── notFound.js       # 404 errors
│       └── serverError.js    # 500 errors
├── public/                   # Static assets
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies
└── postcss.config.mjs        # Tailwind CSS config
```

### Architecture Pattern: MVC + Layered Architecture

```
        Frontend (React Components)
                   ↓
            Next.js API Routes
                   ↓
        Controllers (Route Handlers)
                   ↓
    Services (Business Logic)
                   ↓
    Repositories (Data Access)
                   ↓
        PostgreSQL Database
```

**Design Principles:**
- **Separation of Concerns** - Each layer has a single responsibility
- **Modularity** - Features organized as independent modules
- **Reusability** - Services and utilities can be used across controllers
- **Testability** - Layers can be tested independently
- **Error Handling** - Centralized error management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm 8+ (or npm/yarn)
- PostgreSQL 12+
- Git

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   cd water_quality_index
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root:
   ```env
   # Database Configuration
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=water_quality_db
   DB_PORT=5432
   DB_PASSWORD=your_password

   # JWT Secrets
   ACCESSTOKENSECRET=your_jwt_secret_key_min_32_chars
   REFRESHTOKENSECRET=your_refresh_token_secret_min_32_chars

   # Application
   NODE_ENV=development
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Set up PostgreSQL Database**

   Connect to PostgreSQL and create the database:
   ```sql
   CREATE DATABASE water_quality_db;
   ```

   Run migrations (schema setup):
   ```sql
   -- Users table
   CREATE TABLE gov_users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(255) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Refresh tokens table
   CREATE TABLE refresh_tokens (
     id SERIAL PRIMARY KEY,
     user_id INTEGER NOT NULL REFERENCES gov_users(id) ON DELETE CASCADE,
     token_hash VARCHAR(255) NOT NULL,
     revoked BOOLEAN DEFAULT FALSE,
     replaced_with VARCHAR(255),
     expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '7 days',
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Indexes
   CREATE INDEX idx_users_username ON gov_users(username);
   CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
   CREATE INDEX idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Key Features

### ✅ Authentication System (Implemented)

- **User Registration** - Secure signup with password hashing
- **Login** - JWT-based user authentication
- **Token Rotation** - Refresh token rotation with automatic revocation
- **Password Security** - bcrypt hashing with salt rounds of 10
- **Session Management** - 15-minute access token expiry, 7-day refresh token expiry
- **Token Revocation** - Prevents token reuse through revocation tracking

### 🚧 WQI Module (In Development)

- Water quality parameter calculations
- Index generation based on multiple metrics
- Real-time data visualization
- Historical trending

## 🔑 Core Modules

### Authentication Module (`src/modules/auth/`)

**Responsibilities:**
- User registration and login
- JWT token generation and validation
- Refresh token rotation and revocation
- Password hashing and comparison
- Token expiry verification

**Key Files:**
- `auth.controller.js` - Express-like handlers for auth routes
- `auth.services.js` - Business logic for auth operations
- `auth.repositories.js` - Database queries and transactions
- `auth.utils.js` - Cryptographic utilities (bcrypt, JWT, crypto)
- `auth.validator.js` - Input validation schemas
- `auth.middleware.js` - Route protection middleware

**API Endpoints:**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/auth/signup` | Register new user | ❌ No |
| POST | `/api/auth/login` | Authenticate user | ❌ No |
| POST | `/api/auth/refresh` | Rotate refresh token | ✅ Yes |
| POST | `/api/auth/logout` | Invalidate session | ✅ Yes |
| GET | `/api/auth/verify` | Verify user session | ✅ Yes |

### Error Handling

Custom error classes provide consistent error responses:

```javascript
// Usage example
throw new AppError('User not found', 404);
throw new AuthError(); // 401 Unauthorized
throw new Forbidden(); // 403 Forbidden
throw new BadRequest('Invalid email'); // 400 Bad Request
```

Error responses follow a standard format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [],
  "statusCode": 400
}
```

## 🔐 Security Features

| Feature | Implementation |
|---------|-----------------|
| Password Hashing | bcrypt (10 rounds) |
| Access Tokens | JWT signed with HS256 |
| Refresh Tokens | SHA-256 hashed crypto tokens |
| Token Expiry | 15 min (access), 7 days (refresh) |
| Token Revocation | Tracked in database |
| SQL Injection Protection | Parameterized queries |
| Database Transactions | For atomic token rotation |
| HTTPS Ready | Production deployment compatible |

## 🛠️ Technologies & Dependencies

### Core Framework
- **Next.js 16.2.1** - React framework with API routes
- **React 19.2.4** - UI library
- **TypeScript** - Type safety for configs

### Database
- **PostgreSQL 8.20.0** (pg driver) - Relational database
- **Connection Pooling** - Efficient query management

### Security & Utilities
- **bcrypt** - Password hashing (via auth.utils)
- **jsonwebtoken** - JWT token generation
- **crypto** - Built-in Node.js for hashing

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS 4** - CSS transformation

### Development
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **npm/pnpm** - Package management

## 📖 Development Workflow

### Running the Application

**Development Mode** (with hot reload):
```bash
pnpm dev
```

**Production Build & Start:**
```bash
pnpm build
pnpm start
```

**Linting:**
```bash
pnpm lint
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: description"

# Push and create pull request
git push origin feature/feature-name
```

## 🐛 Known Issues & TODOs

### Bugs
- [ ] Typo in `auth.controller.js`: "ture" should be "true" in `rotateRefreshTokenController`
- [ ] Undefined function `ServiceWorker` called in `loginController` (should be `loginService`)
- [ ] Undefined function `revokealluserrepo` in `auth.services.js`
- [ ] Missing error handling in `verifyUserController`

### Features to Complete
- [ ] Implement logout endpoint
- [ ] Complete WQI calculation module
- [ ] Add form submission handlers in frontend components
- [ ] Implement authentication middleware for route protection
- [ ] Add input validation middleware
- [ ] Create signup API endpoint
- [ ] Implement email verification (future)
- [ ] Add 2FA support (future)

### Improvements Needed
- [ ] Add comprehensive error handling to all endpoints
- [ ] Implement request logging system
- [ ] Add unit and integration tests
- [ ] Create API documentation (Swagger/OpenAPI)
- [ ] Implement rate limiting
- [ ] Add CORS configuration
- [ ] Create .env.example file
- [ ] Add database migration scripts
- [ ] Implement request validation middleware
- [ ] Add proper TypeScript types throughout

## 📋 API Usage Examples

### Sign Up Request
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "password": "SecurePassword123!",
  "confirmPassword": "SecurePassword123!"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "username": "john_doe",
  "createdAt": "2024-04-11T10:30:00Z"
}
```

### Login Request
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "SecurePassword123!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "a1b2c3d4e5f6g7h8...",
  "createdAt": "2024-04-11T10:30:00Z"
}
```

## 🔄 Token Rotation Flow

```
1. User logs in → receives access_token + refresh_token
2. Access token expires (15 min)
3. Client sends refresh_token to /api/auth/refresh
4. Server validates, revokes old token, returns new tokens
5. If suspicious activity detected (token reused), revoke ALL user tokens
```

## 📊 Database Schema Overview

**Users Table:**
```sql
gov_users
├── id (PK)
├── username (UNIQUE)
├── password_hash
├── created_at
└── updated_at
```

**Refresh Tokens Table:**
```sql
refresh_tokens
├── id (PK)
├── user_id (FK → gov_users)
├── token_hash
├── revoked
├── replaced_with
├── expires_at
└── created_at
```

## 🎨 UI/UX Features

### Design System
- **Color Scheme** - Dark mode optimized theme
  - Background: `#0B0F19`
  - Surface: `#111827`
  - Primary: `#8B5CF6` (Purple)
  - Accent: `#06B6D4` (Cyan)
  - Text: `#E5E7EB` (Light gray)

### Implemented Components
- Login form with validation UI
- Signup page (WIP)
- Responsive navigation bar
- Error message display

## 🚀 Deployment

### Environment Setup for Production

1. Update `.env.production` with production values
2. Ensure PostgreSQL is running on production server
3. Set `NODE_ENV=production`
4. Update `NEXT_PUBLIC_API_URL` to production domain

### Build & Deploy
```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Recommended Platforms
- **Vercel** - Optimized for Next.js
- **AWS/Heroku** - Traditional hosting
- **Docker** - Containerized deployment

## 📝 Contributing

1. Create a feature branch from `main`
2. Make changes following code style guidelines
3. Test thoroughly before committing
4. Submit pull request with description
5. Address review comments

## 📄 License

[Add your license here]

## 👨‍💻 Author

[Your name/organization]

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Last Updated:** April 2026 | **Status:** Under Development (MVP Phase)
