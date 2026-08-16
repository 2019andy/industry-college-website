#!/usr/bin/env bash
# 在服务器上执行：构建镜像
set -e
cd /opt/hrnet

echo "[1/3] 拉取 base 镜像（node:20-alpine + nginx:1.25-alpine）— 验证是否可拉"
set +e
docker pull node:20-alpine 2>&1 | tail -3
echo "   node pull RC=$?"
docker pull nginx:1.25-alpine 2>&1 | tail -3
echo "   nginx pull RC=$?"
set -e

echo "[2/3] docker compose build backend frontend"
echo "   开始: $(date '+%H:%M:%S')"
set +e
docker compose build backend frontend 2>&1 | tail -40
RC=$?
set -e
echo "   结束: $(date '+%H:%M:%S')"
echo "BUILD_RC=$RC"
if [ "$RC" -eq 0 ]; then
  echo "镜像列表:"
  docker images | grep -E "hrnet|REPOSITORY" | head -10
  echo "BUILD_SUCCESS"
fi
