FROM nginx:1.25-bookworm-slim

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
