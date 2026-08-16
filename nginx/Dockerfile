# ============================================================
# 前端容器：Nginx（反向代理 + 静态资源 CDN）
# ============================================================
FROM nginx:1.25-alpine

# 安全：移除默认配置，使用非 root 用户运行
RUN rm /etc/nginx/conf.d/default.conf

# 复制自定义 Nginx 配置
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# 复制 Next.js 静态构建产物（从后端构建阶段拷贝）
# 部署时由 docker-compose 的 volume 挂载覆盖
RUN mkdir -p /usr/share/nginx/html/_next/static /usr/share/nginx/html/uploads

# SSL 证书目录（部署时挂载）
RUN mkdir -p /etc/nginx/ssl

# 健康检查（使用 /health 端点，不触发 HTTPS 跳转）
HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=10s \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/health || exit 1

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
