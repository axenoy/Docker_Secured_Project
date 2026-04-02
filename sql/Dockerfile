FROM postgres:16-alpine

COPY ./schema.sql /docker-entrypoint-initdb.d/

RUN chmod 755 /docker-entrypoint-initdb.d/*

EXPOSE 5432