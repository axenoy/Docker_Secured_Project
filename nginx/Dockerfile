FROM nginx:1.25-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/cache/nginx && chown -R nginx:nginx /var/cache/nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY ./frontend/admin /var/www/html/admin
COPY ./frontend/user /var/www/html/user

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/snippets/ /etc/nginx/snippets/
COPY ./nginx/sites/ /etc/nginx/sites/

RUN chown -R nginx:nginx /var/www/html

USER nginx

EXPOSE 80 443

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD curl -f http://localhost/health || exit 1
