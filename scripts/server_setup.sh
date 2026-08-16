#!/usr/bin/env bash
# 在服务器上执行：配置环境、生成 SSL、执行构建
set -e
cd /opt/hrnet

echo "[1/5] 生成 JWT 密钥到 .env"
if [ ! -f .env ] || ! grep -q "^JWT_SECRET=" .env; then
  echo "JWT_SECRET=$(openssl rand -base64 32)" > .env
  echo "   新 .env 已生成"
else
  echo "   .env 已存在，跳过"
fi
echo "   .env 内容："
cat .env || true
echo ""

echo "[2/5] 创建 nginx/ssl + nginx/certbot 目录，生成自签名 SSL"
mkdir -p nginx/ssl nginx/certbot
if [ ! -f nginx/ssl/fullchain.pem ] || [ ! -f nginx/ssl/privkey.pem ]; then
  openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
    -keyout nginx/ssl/privkey.pem \
    -out nginx/ssl/fullchain.pem \
    -subj "/C=CN/ST=Beijing/L=Beijing/O=HRNet/CN=106.55.2.112" 2>&1 | tail -3
  echo "   自签名证书生成（有效期 10 年）"
else
  echo "   SSL 证书已存在，跳过"
fi
ls -la nginx/ssl
echo ""

echo "[3/5] 检查必要文件"
missing=0
for f in Dockerfile nginx/Dockerfile nginx/nginx.conf docker-compose.yml .env package.json package-lock.json; do
  if [ ! -f "$f" ]; then echo "   MISSING: $f"; missing=1; fi
done
[ "$missing" -eq 1 ] && exit 1
echo "   必要文件检查通过"

echo "[4/5] 清理旧 Docker 构建缓存（可选）"
# docker builder prune -f 2>/dev/null || true

echo "[5/5] 构建容器镜像（首次 5-10 分钟）"
echo "   开始: $(date '+%H:%M:%S')"
set +e
docker compose build backend frontend 2>&1 | tail -80
RC=$?
set -e
echo "   结束: $(date '+%H:%M:%S')"
echo "   BUILD_EXIT_CODE=$RC"
if [ "$RC" -eq 0 ]; then
  echo "BUILD_SUCCESS"
else
  echo "BUILD_FAILED_$RC"
fi
