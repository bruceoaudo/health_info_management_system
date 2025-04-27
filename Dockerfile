# Stage 1: Build the application
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine
WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

RUN npm ci --omit=dev

EXPOSE 5000
CMD ["node", "dist/server.js"]
