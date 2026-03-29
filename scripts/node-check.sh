#!/bin/bash

# Check process permissions.
USER=$(ps -C node -o user= | head -n 1)
if [ "$USER" == "root" ]; then
    echo "Node.js is running as root!"
elif [ -z "$USER" ]; then
    echo "No active Node.js processes found."
else
    echo "Node.js runs as '$USER'."
fi

# Check .env permissions and data.
if [ -f ".env" ]; then
    PERMISSIONS=$(stat -c "%a" .env)
    if [ "$PERMISSIONS" -gt 600 ]; then
        echo ".env file has ($PERMISSIONS). Better change to 600."
    else
        echo ".env permissons are secure(600)."
    fi

    if grep -qE "PASSWORD=password|KEY=12345|SECRET=secret" .env; then
          echo "Secrets detected in .env file!"
    fi
else
      echo "No .env file found in current directory."
fi

# nmp audit
if [ -f "package.json" ]; then
    echo "Start npm audit"
    npm audit --production --audit-level=high | grep "vulnerabilities" || echo "No high-risk vulnerabilities."
fi