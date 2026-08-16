#!/usr/bin/env bash
set -e
cd /opt/hrnet

echo "[1/4] 停止旧容器（若存在）"
docker compose down 2>/dev/null || true

echo "[2/4] 启动 docker compose up -d"
docker compose up -d backend
sleep 5
echo "   backend 启动后，启动 frontend（依赖 healthy）"
docker compose up -d frontend
echo ""

echo "[3/4] 等待服务健康..."
for i in 1 2 3 4 5 6 7 8 9 10; do
  sleep 3
  B_OK=""; F_OK=""
  if docker compose ps backend | grep -q "healthy"; then B_OK=1; fi
  if docker compose ps frontend | grep -q "healthy"; then F_OK=1; fi
  echo "   Attempt $i: backend=${B_OK:-UNHEALTHY}, frontend=${F_OK:-UNHEALTHY}"
  if [ -n "$B_OK" ] && [ -n "$F_OK" ]; then
    echo "   双容器健康！"
    break
  fi
done
echo ""
docker compose ps
echo ""

echo "[4/4] 健康检查 —— 对服务器自身 HTTP 接口做 curl"
echo "   ─ 前端 Nginx HTTP 80 首页:"
curl -sSf -o /dev/null -w "HTTP %{http_code} size=%{size_download}\n" http://localhost:80/ 2>&1 || true

echo "   ─ 前端 Nginx HTTPS 443 首页（自签名证书用 -k）:"
curl -sSf -k -o /dev/null -w "HTTP %{http_code} size=%{size_download}\n" https://localhost:443/ 2>&1 || true

echo "   ─ 后端 Next.js 3000 健康（内网）:"
docker compose exec -T backend sh -c 'wget --no-verbose -q -O /dev/null http://localhost:3000/ && echo OK_200' 2>&1 | tail -3

echo ""
echo "--- 6 个二级页面访问测试（HTTP/80）---"
for p in /about /programs /industry /faculty /news /contact; do
  code=$(curl -sSo /dev/null -w "%{http_code}" "http://localhost:80$p")
  echo "   HTTP 80 $p  → $code"
done
echo ""
echo "--- 后台管理登录页 + 编辑器（HTTP/80，受保护路径返回 307 跳登录，OK）---"
for p in /admin /admin/login /admin/page-editor/about; do
  code=$(curl -sSo /dev/null -w "%{http_code}" "http://localhost:80$p")
  echo "   HTTP 80 $p  → $code"
done
echo ""
echo "--- Docker 日志最近 15 行 ---"
docker compose logs --tail=15 backend frontend 2>&1 | tail -40
echo ""
echo "DEPLOY_COMPLETE"
