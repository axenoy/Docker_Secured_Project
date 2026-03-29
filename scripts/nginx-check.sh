#!/bin/bash

# Configuration directory.
CFG_DIR="/etc/nginx"

# Check if server_tokens is disabled.
if grep -rq "server_tokens off;" "$CFG_DIR"; then
    echo "Tokens are hidden."
else
    echo "Tokens are visible."
fi

# SSL protocols security audit.
OLD_TLS=$(grep -r "ssl_protocols" "$CFG_DIR" | grep -E "TLSv1|TLSv1.1")
if [ -z "$OLD_TLS" ]; then
    echo "No outdated TLS found."
else
    echo "Outdated TLS versions detected in config!"
fi

# Verify mandatory security headers.
for header in "X-Frame-Options" "Content-Security-Policy" "X-Content-Type-Options"; do
    if grep -rq "$header" "$CFG_DIR"; then
        echo "Success, $header is present."
    else
        echo "Missing security header: $header"
    fi
done

# Check if zones defined
if grep -rqE "limit_req_zone|limit_conn_zone" "$CFG_DIR"; then
    echo "Limit zones are defined."
else
    echo "No limit_req_zone or limit_conn_zone found in config."
fi

# Validate 'return 444' IP-drop policies.
DROPS_COUNT=$(grep -r "return 444;" "$CFG_DIR" | wc -l)

if [ "$DROPS_COUNT" -ge 2 ]; then
    echo "Found $DROPS_COUNT drop policies."
elif [ "$DROPS_COUNT" -eq 1 ]; then
    echo "Found only 1 drop policy."
else
    echo "No IP-drop rules found."
fi