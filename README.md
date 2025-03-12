# Hono Application

A modern web application built with the [Hono](https://hono.dev/) framework, featuring a layered architecture with PostgreSQL and Sequelize ORM.

## Features

- RESTful API endpoints
- Layered architecture (Routes, Controllers, Services)
- PostgreSQL database with Sequelize ORM
- CORS support
- Organized src directory structure
- Docker-based development and deployment

## Architecture

The application follows a layered architecture:

- **Routes**: Define API endpoints and connect them to controllers
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and data operations
- **Adapters**: Provide interfaces to external systems and frameworks, decoupling core business logic
- **Models**: Define database schema using Sequelize ORM
- **Middleware**: Provide cross-cutting concerns like error handling and logging

## Getting Started

### Prerequisites

- Docker and Docker Compose (for local development and deployment)
- Node.js (v16 or later recommended) and npm (for non-Docker workflow only)

### Installation

1. Clone the repository
2. For Docker-based development (recommended), no additional installation is required
3. For non-Docker workflow only, install dependencies:

```bash
npm install
```

### Running the Application

#### Docker-based Development (Recommended)

The application is configured to use Docker for local development:

```bash
# Build and start the containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the containers
docker-compose down
```

The server will be available at http://localhost:3000

#### Non-Docker Alternative

If you prefer to run the application without Docker:

```bash
# Install dependencies first
npm install

# Start the development server with auto-reload
npm run dev

# Or run the standard server
npm start
```

The server will be available at http://localhost:3000

## Database

The application uses PostgreSQL with Sequelize ORM. When running with Docker Compose, the database is automatically set up and seeded with initial data.

## Project Structure

```
├── src/                # Source code directory
│   ├── adapters/       # Interface adapters for external systems
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Sequelize models
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic
│   ├── tests/          # Unit tests
│   └── index.js        # Main application file
├── index.js            # Entry point
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
├── package.json        # Project configuration
├── jest.config.js      # Jest configuration
└── README.md           # Documentation
```

## License

ISC 