# Stage 1: Build the application
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine
WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
# Don't copy .env in Dockerfile - use docker-compose for secrets

RUN npm ci --only=production    # Clean install for production

EXPOSE 5000
CMD ["node", "dist/server.js"]  # Fixed typo from CMO to CMD