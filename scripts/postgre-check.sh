#!/bin/bash

# Listen addresses
LISTEN=$(sudo -u postgres psql -t -c "SHOW listen_addresses;" 2>/dev/null | xargs)
if [ "$LISTEN" == "*" ]; then
    echo "Postgres listens on all interfaces. Activate firewall."
elif [ -z "$LISTEN" ]; then
    echo "Error, could not connect to Postgres."
else
    echo "Postgres listens on: $LISTEN."
fi

# Search for trust(no password method).
HBA_CONF=$(sudo -u postgres psql -t -c "SHOW hba_file;" 2>/dev/null | xargs)
if [ -f "$HBA_CONF" ]; then
    if grep -qvE '^#' "$HBA_CONF" | grep -q "trust"; then
        echo "'trust' method found in pg_hba.conf, need to change!"
    else
        echo "Authentication methods look secure"
    fi
fi

# Postgress data directory permissions.
PG_DATA=$(sudo -u postgres psql -t -c "SHOW data_directory;" 2>/dev/null | xargs)
if [ -d "$PG_DATA" ]; then
    if [ "$(stat -c "%a" "$PG_DATA")" == "700" ]; then
        echo "Data directory permissions are 700."
    else
        echo "Change permissions to 700!"
    fi
fi