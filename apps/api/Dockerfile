FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy prisma
COPY prisma ./prisma/

# Copy source code
COPY src ./src/
COPY tsconfig.json ./

# Build TypeScript
RUN npm run build

# Generate Prisma Client
RUN npm run prisma:generate

# Expose port
EXPOSE 3001

# Start application
CMD ["npm", "start"]
