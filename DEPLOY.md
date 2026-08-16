# 部署手册 — 中跨数字贸易产业学院官网 v1.0.0

## 一、服务器采购建议

### 1.1 项目技术概况

| 维度 | 说明 |
|------|------|
| 框架 | Next.js 14（App Router，SSR + API Routes 一体化） |
| 运行时 | Node.js 20 |
| 存储 | JSON 文件存储（无外部数据库，`content/content.json`） |
| 图片上传 | 本地文件存储（`public/uploads/`） |
| 容器 | Docker（前端 Nginx + 后端 Next.js，双容器） |
| 预估并发 | 教育机构官网，日均 PV 500-2000，峰值并发 < 50 |

### 1.2 服务器配置推荐

#### 方案 A：入门级（预算敏感，推荐）

| 项目 | 规格 | 参考价格 |
|------|------|----------|
| CPU | 2 vCPU（x86_64） | — |
| 内存 | 4 GB | — |
| 系统盘 | 50 GB SSD | — |
| 带宽 | 5 Mbps（按量计费更优） | — |
| 系统 | Ubuntu 22.04 LTS | — |
| 参考云商 | 阿里云 ECS / 腾讯云 CVM / 华为云 ECS | ¥80-150/月 |

> 适用场景：日均 PV < 2000，无突发大流量。Docker 双容器合计占用约 1.5GB 内存，剩余 2.5GB 供系统缓冲。

#### 方案 B：标准级（推荐生产环境）

| 项目 | 规格 | 参考价格 |
|------|------|----------|
| CPU | 2 vCPU | — |
| 内存 | 8 GB | — |
| 系统盘 | 50 GB SSD | — |
| 数据盘 | 100 GB SSD（挂载 Docker 数据卷） | — |
| 带宽 | 10 Mbps | — |
| 系统 | Ubuntu 22.04 LTS | — |
| 参考云商 | 阿里云 ECS / 腾讯云 CVM | ¥150-300/月 |

> 适用场景：日均 PV 2000-10000，图片上传频繁，需要更大缓存空间。

#### 方案 C：高可用级（多节点负载均衡，可选）

| 项目 | 规格 |
|------|------|
| 架构 | 负载均衡（SLB）+ 2 台 ECS + 对象存储（OSS） + CDN |
| ECS 规格 | 2 vCPU / 4GB × 2 台 |
| 图片存储 | 迁移到阿里云 OSS / 腾讯云 COS（替代本地 uploads） |
| 静态资源 | CDN 加速（`_next/static/` + `uploads/`） |
| 数据库 | 如需多节点同步，引入 PostgreSQL 替代 JSON 文件存储 |

### 1.3 域名与 SSL

| 项目 | 说明 |
|------|------|
| 域名 | 需备案（.cn / .com 均可），如 `college.example.com` |
| SSL 证书 | 免费：Let's Encrypt（自动续期）；付费：阿里云/腾讯云免费 DV 证书 |
| DNS 解析 | A 记录指向服务器公网 IP |

### 1.4 安全组 / 防火墙规则

| 端口 | 协议 | 来源 | 用途 |
|------|------|------|------|
| 22 | TCP | 你的 IP only | SSH（建议改为非标准端口） |
| 80 | TCP | 0.0.0.0/0 | HTTP（Let's Encrypt + 重定向） |
| 443 | TCP | 0.0.0.0/0 | HTTPS |
| 3000 | — | **不开放** | Next.js 内部端口（仅容器内网） |
| 3306 | — | **不开放** | 无数据库，如未来引入则仅内网 |

---

## 二、架构总览

```
                    ┌─────────────────────────────────────┐
                    │          云服务器 (ECS)              │
                    │     Ubuntu 22.04 LTS               │
                    │                                     │
   用户 ────443───► │  ┌─────────────────────────────┐    │
   (HTTPS)          │  │  前端容器: Nginx            │    │
                    │  │  :80/:443                   │    │
                    │  │  - 反向代理 → backend:3000   │    │
                    │  │  - 静态资源 CDN (_next/static)│   │
                    │  │  - 上传图片服务 (/uploads/)  │    │
                    │  │  - SSL 终止                  │    │
                    │  │  - 安全头 / 限流 / Gzip      │    │
                    │  └──────────┬──────────────────┘    │
                    │             │ internal network       │
                    │  ┌──────────▼──────────────────┐    │
                    │  │  后端容器: Next.js          │    │
                    │  │  :3000 (不对外暴露)          │    │
                    │  │  - SSR 页面渲染             │    │
                    │  │  - API Routes               │    │
                    │  │  - Admin 后台管理           │    │
                    │  │  - JWT 认证 (middleware)     │    │
                    │  └──────────┬──────────────────┘    │
                    │             │                       │
                    │  ┌──────────▼──────────────────┐    │
                    │  │  Docker Volume (持久化)      │    │
                    │  │  - content/ (JSON 数据)     │    │
                    │  │  - public/uploads/ (图片)   │    │
                    │  └─────────────────────────────┘    │
                    └─────────────────────────────────────┘
```

### 容器职责

| 容器 | 镜像 | 职责 | 端口 |
|------|------|------|------|
| **frontend** | nginx:1.25-alpine | SSL 终止、反向代理、静态资源 CDN、安全头、限流、Gzip | 80, 443 |
| **backend** | node:20-alpine (standalone) | SSR 渲染、API Routes、Admin 管理、JWT 认证、文件上传处理 | 3000 (仅内网) |

---

## 三、部署步骤

### 3.1 前置准备

```bash
# 1. SSH 登录服务器
ssh root@your_server_ip

# 2. 创建非 root 部署用户
adduser deploy
usermod -aG sudo deploy
su - deploy

# 3. 安装 Docker + Docker Compose
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker deploy
sudo systemctl enable --now docker

# 4. 安装 Git
sudo apt update && sudo apt install -y git

# 5. 安装 Certbot（Let's Encrypt SSL）
sudo apt install -y certbot
```

### 3.2 拉取代码

```bash
cd /home/deploy
git clone https://github.com/2019andy/industry-college-website.git hrnet
cd hrnet
git checkout v1.0.0
```

### 3.3 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env，填写真实值
nano .env
```

`.env` 文件内容：
```ini
# JWT 密钥（生成随机字符串）
JWT_SECRET=$(openssl rand -base64 32)

# 或手动填写，确保 32+ 位随机字符
JWT_SECRET=your_random_secret_key_here_at_least_32_chars
```

```bash
# 自动生成密钥并写入
echo "JWT_SECRET=$(openssl rand -base64 32)" > .env
```

### 3.4 配置 SSL 证书

#### 方式 A：Let's Encrypt 免费证书（推荐）

```bash
# 1. 先临时启动 Nginx 仅 HTTP 模式（用于 ACME 验证）
# 创建临时配置
sudo mkdir -p nginx/ssl nginx/certbot

# 2. 申请证书（替换 yourdomain.com）
sudo certbot certonly --webroot -w /home/deploy/hrnet/nginx/certbot \
    -d yourdomain.com -d www.yourdomain.com

# 3. 复制证书到 Nginx 目录
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/
sudo chown -R deploy:deploy nginx/ssl

# 4. 设置自动续期（crontab）
echo "0 3 * * * certbot renew --quiet && cp /etc/letsencrypt/live/yourdomain.com/*.pem /home/deploy/hrnet/nginx/ssl/ && docker exec hrnet-frontend nginx -s reload" | sudo crontab -
```

#### 方式 B：自签名证书（仅测试环境）

```bash
mkdir -p nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout nginx/ssl/privkey.pem \
    -out nginx/ssl/fullchain.pem \
    -subj "/C=CN/ST=Province/L=City/O=Org/CN=yourdomain.com"
```

#### 方式 C：云商免费 SSL 证书

从阿里云/腾讯云控制台下载 Nginx 格式证书，放置到 `nginx/ssl/` 目录：
- `fullchain.pem`（证书链）
- `privkey.pem`（私钥）

### 3.5 构建与启动

```bash
# 构建镜像（首次约 3-5 分钟）
docker compose build

# 启动容器
docker compose up -d

# 查看运行状态
docker compose ps

# 查看日志
docker compose logs -f backend
docker compose logs -f frontend
```

### 3.6 验证部署

```bash
# 检查后端健康
curl -f http://localhost:3000/ && echo "Backend OK"

# 检查前端 Nginx
curl -f http://localhost:80/ && echo "Frontend OK"

# 检查 HTTPS（替换域名）
curl -f https://yourdomain.com/ && echo "HTTPS OK"

# 检查后台登录页
curl -f https://yourdomain.com/admin/login && echo "Admin OK"
```

浏览器访问 `https://yourdomain.com`，确认：
- [x] 首页正常显示
- [x] 6 个二级页面正常（/about, /programs, /industry, /faculty, /news, /contact）
- [x] 后台管理可登录 `https://yourdomain.com/admin/login`（admin/admin123）
- [x] 后台保存内容后前端刷新可见
- [x] 图片上传功能正常
- [x] 移动端布局正常

### 3.7 首次登录后立即修改密码

> **安全警告**：默认密码 admin/admin123 必须修改！

1. 访问 `https://yourdomain.com/admin/login`
2. 使用 admin / admin123 登录
3. 进入「修改密码」功能，设置强密码

---

## 四、安全防范措施

### 4.1 网络层安全

| 措施 | 实现 |
|------|------|
| **端口隔离** | backend 容器不暴露端口，仅通过 Docker 内网与 Nginx 通信 |
| **防火墙** | `ufw` 仅开放 22/80/443，3000 端口不对外 |
| **SSH 加固** | 禁止 root 登录、禁止密码登录、改用密钥认证、改端口 |
| **安全组** | 云商控制台配置，仅允许必要端口 |

```bash
# 配置 UFW 防火墙
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp          # SSH
sudo ufw allow 80/tcp          # HTTP
sudo ufw allow 443/tcp         # HTTPS
sudo ufw enable
```

### 4.2 应用层安全

| 措施 | 实现 |
|------|------|
| **JWT 认证** | httpOnly Cookie + HS256 签名，7 天过期 |
| **中间件保护** | `/admin/*` 和 `/api/admin/*` 路由强制 JWT 校验 |
| **bcrypt 密码** | 密码使用 bcryptjs 10 轮哈希存储，不明文 |
| **XSS 防护** | 富文本内容通过 DOMPurify 清洗后渲染（SafeHtml 组件） |
| **CSP 头** | Nginx 配置 Content-Security-Policy 限制脚本来源 |
| **HSTS** | Strict-Transport-Security 强制 HTTPS |
| **X-Frame-Options** | SAMEORIGIN 防止点击劫持 |
| **X-Content-Type-Options** | nosniff 防止 MIME 嗅探 |

### 4.3 API 限流（Nginx 层）

| 接口 | 限流策略 | 目的 |
|------|----------|------|
| `/api/auth/login` | 5 次/分钟/IP | 防暴力破解密码 |
| `/api/upload` | 3 次/分钟/IP | 防恶意上传 |
| `/api/*`（其余） | 10 次/秒/IP | 防爬虫/DDoS |

### 4.4 文件上传安全

| 措施 | 说明 |
|------|------|
| 类型白名单 | 仅 jpg/png/webp/gif/svg（前后端双重校验） |
| 大小限制 | 5MB（前端 + Nginx `client_max_body_size 6m` + 后端 API） |
| 文件名随机化 | `时间戳-UUID.扩展名`，防覆盖与路径穿越 |
| 存储隔离 | 上传文件存至 `public/uploads/`，与代码分离 |
| 图片防盗链 | Nginx `valid_referers` 校验 Referer |

### 4.5 容器安全

| 措施 | 说明 |
|------|------|
| 非 root 用户 | backend 使用 `nextjs:1001` 用户运行 |
| 最小化镜像 | 使用 `node:20-alpine` + standalone 产物 |
| 资源限制 | `deploy.resources.limits.memory` 防内存泄漏耗尽 |
| 只读挂载 | Nginx 挂载 static/uploads 为 `:ro` 只读 |
| 健康检查 | `HEALTHCHECK` 自动检测容器状态 |

### 4.6 数据安全

| 措施 | 说明 |
|------|------|
| 数据卷持久化 | `content/` + `uploads/` 使用 Docker Volume，容器重建不丢数据 |
| 定期备份 | crontab 定时备份 content/ + uploads/ 到异地 |
| 密钥管理 | JWT_SECRET 通过 `.env` 注入，不硬编码在镜像中 |

```bash
# 设置每日备份（凌晨 2 点）
echo "0 2 * * * tar czf /home/deploy/backup/hrnet-$(date +\%Y\%m\%d).tar.gz /home/deploy/hrnet/content /home/deploy/hrnet/public/uploads" | crontab -

# 保留最近 30 天备份
echo "0 3 * * * find /home/deploy/backup/ -name 'hrnet-*.tar.gz' -mtime +30 -delete" | crontab -
```

---

## 五、运维操作手册

### 5.1 常用命令

```bash
# 查看容器状态
docker compose ps

# 查看实时日志
docker compose logs -f
docker compose logs -f backend --tail=100

# 重启容器
docker compose restart backend
docker compose restart frontend

# 停止所有容器
docker compose down

# 重新构建并启动（代码更新后）
git pull origin main
docker compose build --no-cache backend
docker compose up -d

# 进入容器调试
docker compose exec backend sh
docker compose exec frontend sh
```

### 5.2 更新版本

```bash
cd /home/deploy/hrnet

# 拉取最新代码
git fetch --tags
git checkout v1.1.0  # 替换为目标版本

# 重新构建后端
docker compose build backend

# 滚动重启
docker compose up -d backend
```

### 5.3 数据备份与恢复

```bash
# 备份
docker run --rm -v hrnet_content_data:/data -v $(pwd):/backup \
    alpine tar czf /backup/content-$(date +%Y%m%d).tar.gz -C /data .

docker run --rm -v hrnet_uploads_data:/data -v $(pwd):/backup \
    alpine tar czf /backup/uploads-$(date +%Y%m%d).tar.gz -C /data .

# 恢复
docker run --rm -v hrnet_content_data:/data -v $(pwd):/backup \
    alpine sh -c "cd /data && tar xzf /backup/content-20260816.tar.gz"
```

### 5.4 监控

```bash
# 容器资源使用
docker stats

# 磁盘空间
df -h

# Nginx 访问日志分析
docker compose exec frontend cat /var/log/nginx/access.log | tail -100

# 后端错误日志
docker compose logs backend --tail=200 | grep -i error
```

---

## 六、故障排查

| 症状 | 排查方向 |
|------|----------|
| 502 Bad Gateway | `docker compose logs backend` — 后端未启动或崩溃 |
| SSL 证书过期 | `sudo certbot renew`，检查 crontab |
| 图片上传 413 | Nginx `client_max_body_size` 太小 |
| 后台登录跳转循环 | JWT_SECRET 变更导致旧 Cookie 失效，清除浏览器 Cookie |
| content.json 丢失 | 检查 Volume 挂载 `docker volume inspect hrnet_content_data` |
| 容器无法启动 | `docker compose logs` 查看错误，检查端口冲突 |
| 移动端样式异常 | 清除浏览器缓存，检查 CDN 缓存 |

---

## 七、文件清单

| 文件 | 用途 |
|------|------|
| `Dockerfile` | 后端容器构建（Next.js standalone） |
| `nginx/Dockerfile` | 前端容器构建（Nginx） |
| `nginx/nginx.conf` | Nginx 配置（反代 + 安全 + 限流） |
| `docker-compose.yml` | 容器编排（前后端 + 网络 + 卷） |
| `.dockerignore` | Docker 构建排除规则 |
| `.env.example` | 环境变量模板 |
| `next.config.js` | Next.js 配置（`output: 'standalone'`） |

---

## 八、升级路径（未来扩展）

| 需求 | 方案 |
|------|------|
| 多节点部署 | 引入 PostgreSQL 替代 JSON 文件存储；uploads 迁移到 OSS |
| CDN 加速 | `_next/static/` 和 `uploads/` 接入阿里云 CDN |
| 全文搜索 | 引入 Meilisearch 或 Elasticsearch 容器 |
| 邮件通知 | 引入 SMTP 服务（如阿里云邮件推送） |
| 日志收集 | 引入 ELK / Loki + Grafana |
| CI/CD | GitHub Actions 自动构建推送镜像到 ACR |
