# Production dependencies
FROM node:20-bookworm-slim AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Final image
FROM node:20-bookworm-slim
WORKDIR /app

RUN groupadd -r appgroup && useradd -r -g appgroup -s /sbin/nologin appuser

COPY --from=prod-deps --chown=appuser:appgroup /app/node_modules/ ./node_modules
COPY --chown=appuser:appgroup ./backend ./

RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

USER appuser
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD curl -f http://127.0.0.1:3000/health || exit 1