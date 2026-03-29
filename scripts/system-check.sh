#!/bin/bash

# SSH root login
if grep -q "^PermitRootLogin yes" /etc/ssh/sshd_config; then
    echo "SSH root login is enabled, need to disable."
else
    echo "SSH root login is disabled."
fi

# Firewall checking
if command -v ufw >/dev/null; then
    if sudo ufw status | grep -q "Status: active"; then
        echo "UFW is active."
    else
        echo "UFW is inactive."
    fi
else
    echo "UFW firewall not found."
fi

# Sensitive file permissions check
files_to_check=("/etc/shadow" "/etc/sudoers" "/etc/ssh/sshd_config")
  
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        PERMISSIONS=$(stat -c "%a" "$file")
        OWNER=$(stat -c "%U" "$file")
        if [ "$PERMISSIONS" -gt 640 ]; then
            echo "Insecure permissions on $file: $PERMISSIONS (Owner: $OWNER)"
        else
            echo "File $file permissions are safe: $PERMISSIONS"
        fi
    fi
done

# Show listening ports
echo "Currently listening ports:"
ss -tuln | grep LISTEN | awk '{print $5}' | awk -F: '{print $NF}' | sort -u | xargs echo " Ports:"