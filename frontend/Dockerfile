
# ==========================================
# Stage 1: Build Vite application
# ==========================================
FROM node:26-alpine AS build

WORKDIR /usr/src/app

# Update npm to latest release
RUN npm install -g npm@latest

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install clean, reproducible dependencies
RUN npm ci

# Copy application source
COPY . .

# Build production frontend
RUN npm run build


# ==========================================
# Stage 2: Production Nginx server
# ==========================================
FROM nginx:stable-alpine AS production

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy complete Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy Vite production build
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html/

# Expose HTTP port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
