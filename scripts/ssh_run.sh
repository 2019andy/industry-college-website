#!/usr/bin/env bash
# 便捷：SSH + rsync 包装器，统一使用 hrnet-deploy 密钥
HOST="root@106.55.2.112"
KEY="$HOME/.ssh/hrnet-deploy"
exec ssh -i "$KEY" \
    -o StrictHostKeyChecking=no \
    -o UserKnownHostsFile="$HOME/.ssh/known_hosts" \
    -o ConnectTimeout=10 \
    "$HOST" "$@"
