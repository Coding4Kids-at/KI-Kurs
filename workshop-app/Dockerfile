# Stage 1 — Frontend Build
FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2 — Backend + Frontend served together
FROM node:22-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --production
COPY backend/ ./
COPY --from=frontend-build /app/frontend/dist ./public

RUN mkdir -p /data
VOLUME /data
ENV DB_PATH=/data/kilab.db
ENV PORT=3000

EXPOSE 3000
CMD ["node", "src/server.js"]
