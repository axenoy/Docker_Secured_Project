#!/bin/bash

# Set domain from argument (default: example.com) and define system paths.
DOMAIN=${1:-"example.com"}
NGINX_ROOT="/etc/nginx"
SCRIPT_DEST="/usr/local/bin"
CACHE_DIR="/var/cache/nginx"
SSL_DIR="/etc/nginx/ssl"

# Create necessary directories for snippets, site configs, and SSL.
echo "Creating Nginx directory structure."
mkdir -p "$NGINX_ROOT/snippets"
mkdir -p "$NGINX_ROOT/sites"
mkdir -p "$SSL_DIR"

# Initialize cache directory and set correct ownership for the web server user.
echo "Setting up proxy cache directory."
mkdir -p "$CACHE_DIR"
chown -R www-data:www-data "$CACHE_DIR"
chmod -R 755 "$CACHE_DIR"

# Generate a dummy self-signed certificate if it doesn't exist (required for IP-drop).
if [ ! -f "$SSL_DIR/dummy.crt" ]; then
    echo "Generating dummy SSL certificate."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout "$SSL_DIR/dummy.key" -out "$SSL_DIR/dummy.crt" \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
fi

# Deploy audit scripts to /usr/local/bin for global access.
# Note: Ensure you are running this from the directory containing the .sh files.
echo "Installing audit scripts to $SCRIPT_DEST"
scripts=("nginx-check.sh" "postgre-check.sh" "node-check.sh" "system-check.sh")

for script in "${scripts[@]}"; do
    if [ -f "$script" ]; then
        cp "$script" "$SCRIPT_DEST/"
        chmod +x "$SCRIPT_DEST/$script"
        echo "  + Installed $script"
    else
        echo "  - Source $script not found, skipping."
    fi
done

# Automatically replace placeholder domain with the actual one in nginx.conf.
if [ -f "$NGINX_ROOT/nginx.conf" ]; then
    echo "Updating Nginx configuration with domain: $DOMAIN"
    sed -i "s/example.com/$DOMAIN/g" "$NGINX_ROOT/nginx.conf"
    echo "  + Configuration updated."
fi

# Create log files for the specific domain and restrict permissions (640).
echo "Setting up log files for $DOMAIN."
touch "/var/log/nginx/${DOMAIN}.access.log"
touch "/var/log/nginx/${DOMAIN}.error.log"
chown www-data:adm "/var/log/nginx/${DOMAIN}".*.log
chmod 640 "/var/log/nginx/${DOMAIN}".*.log

echo "Setup completed."
echo "Next steps:"
echo "1. Ensure your nginx.conf is in $NGINX_ROOT/"
echo "2. Put your snippets (*.conf) into $NGINX_ROOT/snippets/"
echo "3. Run 'sudo nginx -t' and 'sudo systemctl reload nginx'"
