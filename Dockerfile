# ============================================================
# 后端容器：Next.js Standalone Server（SSR + API Routes + Admin）
# ============================================================
FROM node:20-alpine AS base

# ---- Stage 1: 安装依赖 ----
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 仅复制 package.json + lockfile，利用 Docker 层缓存
COPY package.json package-lock.json* ./
RUN npm ci --only=production && \
    # 保留完整 node_modules 用于构建
    cp -R node_modules /tmp/node_modules_prod && \
    npm ci

# ---- Stage 2: 构建 ----
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建时环境变量（不含敏感信息）
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Next.js standalone 构建
RUN npm run build

# ---- Stage 3: 生产运行 ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 安全：使用非 root 用户运行
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 复制 standalone 构建产物（含最小化 node_modules）
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# 复制 content 目录（含 content.json 初始数据）
COPY --from=builder --chown=nextjs:nodejs /app/content ./content

# 创建 uploads 目录（挂载点）
RUN mkdir -p /app/public/uploads && chown nextjs:nodejs /app/public/uploads

# 健康检查（显式 127.0.0.1：alpine wget 默认 IPv6 first 会误判）
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
