# Nginx 

## nginx.conf
The main config file for backend application, focused on performance, security and reliability. Main features: Automatic worker scaling, keepalive connections, gzip and brotli compression, upstream with primary and backup servers, failover, proxy cache with size, rate limiting, security and modular structure.


## sites

### sites/user.conf
In this case only logging level(just for example).

### sites/admin.conf
This file defines access control and caching rules for the admin panel. Predefined whitelist of IP addresses and networks. Block all other traffic by default. Disable proxy caching to ensure sensitive data is never stored.

## snippets

### snippets/api.conf
This file defines basic proxy timeout and cacheable request methods. Ensures stable proxy behaviour and safe caching defaults.

### snippets/cache.conf
This file defines proxy caching behaviour for upstream responses. Cache only safe requests, use deterministic cache key per request, different TTLs for successful and error responses, protect backend from overload with cache locking and minimum usage threshold(at least 2 request), serve stale content on upstream failures, bypasses caching for authenticated users and cookie-based responses and add a responce header to expose cache status for debugging and monitoring.

### snippets/compression.conf
This file enables gzip and brotli compression for HTTP responses. Reduces responce size to improve load times and bandwidth usage. Compression only to relevant MIME types. Supports both gzip(widely compatible) and brotli(better compression ratio). Optimized for efficient content delivery without overloading the server.

### snippets/health.conf
This file defines access control and caching rules for the database health check endpoint. Predefined whitelist of IP addresses and networks. Block all other traffic by default.
Disable proxy caching to ensure sensitive data is never stored.

### snippets/proxy.conf
This file defines core proxy behaviour for communication with backend servers. Enable buffering to improve performance and reduce backend load. Uses HTTP/1.1 with keepalive for efficient connections. Configured timeouts to prevent hanging requests. Implements retry logic for upstream failover. Forwards essential client and request metadata via headers.