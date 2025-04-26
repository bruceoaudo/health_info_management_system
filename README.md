# Health Information Management System (HIMS)

A comprehensive system for managing patient health records, programs, and external API integrations.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Docker Setup](#docker-setup)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [License](#license)

## Prerequisites

- Node.js v16+
- npm v8+
- MongoDB 5.0+
- Docker 20.10+ (optional)
- Docker Compose 2.0+ (optional)

## Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bruceoaudo/health_info_management_system.git
   cd health_info_management_system
   ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Set up environment variables**  
   Create a `.env` file in the root directory and configure the following environment variables:

   ```env
    PORT=5000
    MONGO_URI_DEV=mongodb://localhost:27017/health-info-system-db
    MONGO_URI_PROD=mongodb://health-info-system-mongo:27017/health-info-system-db
    JWT_SECRET=yoursecret
    NODE_ENV=development
    ```
4. **Run this command to start the mongo docker image in detached mode**
    ```bash
    docker-compose up -d
    ```
5. **Start the development server**
    ```bash
    npm run dev
    ```
    The application will be available at http://localhost:5000

## Alternative approach(using Docker)

1. **Start the whole app using docker.Run:**
    ```bash
    docker-compose --profile app up -d
    ```
    The application will be available at http://localhost:5000

## API Documentation

