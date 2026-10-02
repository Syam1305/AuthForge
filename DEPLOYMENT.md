# AuthForge — Production Deployment & Operations Guide

This guide provides operational standards, infrastructure requirements, configuration instructions, and security best practices for deploying AuthForge to production environments.

---

## 1. System Requirements & Infrastructure

* **Runtime:** Node.js v18 LTS or higher (tested on Node.js v24)
* **Process Manager:** PM2, systemd, or standard container runners (OCI/Docker)
* **Database:** PostgreSQL 14+ (PostgreSQL 18 recommended) with connection pooling enabled
* **Memory & CPU:** Minimum 512MB RAM / 1 vCPU; recommended 1GB RAM / 2 vCPU for high-traffic instances

---

## 2. Environment Configuration

In production, create a `.env` file with secure, non-default configuration:

```env
# Database Connection (Ensure SSL mode is enabled in production)
DATABASE_URL="postgresql://authforge_user:SECURE_PASSWORD@postgres-host:5432/authforge?sslmode=require&schema=public"

# Server Settings
PORT=4000
NODE_ENV=production

# Trust Proxy Configuration (Set '1' for single-hop proxy like Nginx/ALB; 'false' for direct exposure)
TRUST_PROXY=1

# Security / CORS (Set explicit trusted origins; NEVER use wildcard "*" in production)
CORS_ORIGIN=https://loginlab.yourdomain.com,https://dairykhata.yourdomain.com

# Cryptographic Secrets (Minimum 32 random characters)
OTP_SECRET=replace_with_a_cryptographically_random_64_character_hex_secret!
JWT_ACCESS_SECRET=replace_with_a_cryptographically_random_64_character_jwt_secret!

# Token Configuration
ACCESS_TOKEN_ISSUER=authforge
ACCESS_TOKEN_AUDIENCE=authforge-api
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL_DAYS=7

# Brute-Force & Lockout Policy
LOGIN_MAX_FAILED_ATTEMPTS=5
LOGIN_LOCKOUT_MINUTES=15
SECURITY_EVENT_RETENTION_DAYS=90

# SMTP Email Delivery (Gmail / Custom SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-service-account@gmail.com
SMTP_PASSWORD=your-16-char-google-app-password
SMTP_FROM="AuthForge <your-service-account@gmail.com>"

# SMS Delivery Gateway (MSG91 / Twilio)
# Options: msg91 | twilio | development
SMS_PROVIDER=msg91

# MSG91 Production Settings (SendOTP V5 API)
MSG91_AUTH_KEY=your_msg91_auth_key_here
MSG91_TEMPLATE_ID=your_dlt_approved_template_id
# Optional purpose-specific template overrides:
MSG91_VERIFY_TEMPLATE_ID=your_verify_template_id
MSG91_LOGIN_TEMPLATE_ID=your_login_template_id
MSG91_RESET_TEMPLATE_ID=your_reset_template_id

# Alternative: Twilio Production Settings
# SMS_PROVIDER=twilio
# SMS_API_KEY=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# SMS_API_SECRET=your_twilio_auth_token
# SMS_FROM=+12055550199

# Google Authentication (Phase 10)
GOOGLE_AUTH_ENABLED=true
GOOGLE_CLIENT_ID=your-google-web-client-id.apps.googleusercontent.com
```

---

## 2.1. Google Cloud / Identity Services Setup

To configure "Continue with Google" for your applications:

1. **Google Cloud Console:** Navigate to [Google Cloud Console](https://console.cloud.google.com/) -> **APIs & Services** -> **Credentials**.
2. **OAuth Consent Screen:**
   * Configure User Type (External).
   * App name: `AuthForge` / `YourAppName`.
   * User support email & Developer contact info.
   * Scopes requested: Minimum scopes only (`openid`, `profile`, `email`). **Do not request sensitive scopes (Gmail, Drive, Contacts).**
   * If in "Testing" mode, add test user Google accounts to the test user list.
3. **Create Web OAuth Client ID:**
   * Application type: **Web application**.
   * Name: `AuthForge Web Client`.
   * **Authorized JavaScript origins:**
     * Local Development: `http://localhost:3000` (LoginLab), `http://localhost:4000`
     * Production: `https://loginlab.yourdomain.com` (Must use HTTPS in production).
   * **Authorized redirect URIs:** Google Identity Services (GIS) button operates via direct popups/one-tap callbacks and does not require server redirect URIs unless standard OAuth code flow is used.
4. **Copy Client ID:** Set `GOOGLE_CLIENT_ID` in backend `.env` and client configurations. **Never expose the Google Client Secret.**

---

## 2.2. Indian DLT Compliance & MSG91 Setup

For production SMS delivery to Indian mobile numbers (+91), the Telecom Regulatory Authority of India (TRAI) mandates DLT (Distributed Ledger Technology) registration:

1. **Entity Registration:** Register your organization on an approved DLT portal (e.g., Vilpower / Jio / Airtel / Vodafone DLT).
2. **Sender ID / Header Approval:** Register a 6-character alphabetic header (e.g., `AUTHFR`) under Service Implicit category for transactional OTP messages.
3. **Content Template Registration:** Register SMS content templates with dynamic variables (e.g., `Your AuthForge verification code is {#var#}. Valid for 10 minutes.`).
4. **MSG91 Dashboard Mapping:** Add the approved DLT Entity ID, Sender ID, and Template ID into the MSG91 portal to obtain the MSG91 `template_id`.
5. **AuthForge Configuration:** Set `SMS_PROVIDER=msg91`, `MSG91_AUTH_KEY=<your_key>`, and `MSG91_TEMPLATE_ID=<template_id>` in AuthForge backend `.env`.



---

## 3. Reverse Proxy, Client IP Resolution & HTTPS

AuthForge must run behind an HTTPS-terminating reverse proxy in production.

### Trust Proxy Security Model
* **`TRUST_PROXY=1` (Default):** Instructs Express to trust exactly 1 upstream proxy hop (e.g., Nginx, AWS ALB, Cloudflare). Express reads the client IP from the last entry in `X-Forwarded-For`, preventing untrusted clients from spoofing upstream IP addresses.
* **`TRUST_PROXY=false` or `0`:** Disables proxy header parsing entirely. Used when AuthForge directly accepts connections from clients.
* **Custom Subnets:** You may provide specific trusted subnet ranges (e.g., `10.0.0.0/8,172.16.0.0/12`) if running behind complex internal routing.

### Example Nginx Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name auth.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/auth.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/auth.yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Request-ID $request_id;
        proxy_cache_bypass $http_upgrade;
        
        # Max request body limit matching AuthForge (100kb)
        client_max_body_size 100k;
    }
}
```

---

## 4. Health & Readiness Monitoring

Load balancers, container orchestrators, and monitoring services should use the following endpoints:

| Endpoint | Probe Type | Expected Status | Description |
| :--- | :--- | :---: | :--- |
| `GET /health` | **Liveness Probe** | `200 OK` | Verifies the Node.js process is alive and responsive. |
| `GET /ready` | **Readiness Probe** | `200 OK` | Verifies database connectivity and readiness to serve traffic. Returns `503 Service Unavailable` if database is disconnected. |
| `GET /health/db` | **Database Probe** | `200 OK` | Runs `SELECT 1` against PostgreSQL to verify connectivity. |

---

## 5. Database Migrations & Lifecycle

To apply database schema changes in production:

```bash
# 1. Inspect migration status
npx prisma migrate status

# 2. Apply pending migrations safely
npx prisma migrate deploy

# 3. Generate Prisma client
npx prisma generate
```

> [!CAUTION]
> NEVER execute `npx prisma migrate reset` in production environments as this will destroy existing data.

---

## 6. Automated Maintenance & Data Retention

AuthForge includes a built-in maintenance cleanup routine ([`src/services/maintenance.service.ts`](file:///c:/Users/nsyam/OneDrive/Desktop/AuthForge/src/services/maintenance.service.ts)) to purge obsolete data safely:

* **Expired OTP Challenges:** Consumed or expired OTPs older than 7 days are deleted.
* **Expired Reset Authorizations:** Consumed or expired reset tokens older than 7 days are deleted.
* **Security Audit Events:** Audit logs older than `SECURITY_EVENT_RETENTION_DAYS` (default 90 days) are purged.
* **Expired Sessions & Cascade Tokens:** Sessions revoked/expired more than 30 days ago are permanently purged. Active sessions (`revokedAt = null AND expiresAt > now`) and recently revoked sessions (< 30 days) are **NEVER deleted** to preserve refresh-token replay detection and token family security.
* **Old Revoked Refresh Tokens:** Replaced/revoked refresh tokens older than 30 days are purged, leaving active tokens intact.

### Executing Maintenance Manually:
```bash
npm run maintenance:cleanup
```

### Scheduled Cron Job (Daily at 02:00 AM):
```cron
0 2 * * * cd /var/www/authforge && npm run maintenance:cleanup >> /var/log/authforge-cleanup.log 2>&1
```

---

## 7. Scaling & Rate Limiting Considerations

* **Current Architecture:** AuthForge uses an in-memory sliding window rate limiter.
* **Single-Instance Deployment:** Perfectly suitable for single VM / container deployments.
* **Horizontal Multi-Instance Scaling:** When scaling to multiple load-balanced instances, migrate the rate limiter store to a shared Redis instance to maintain synchronized rate limits across cluster nodes.

---

## 8. Backup & Disaster Recovery Strategy

1. **PostgreSQL Automated Backups:**
   - Daily `pg_dump` snapshots stored in secure, encrypted cloud object storage (e.g. S3 / GCS with lifecycle retention).
   - Enable PostgreSQL Write-Ahead Logging (WAL) archiving for point-in-time recovery (PITR).
2. **Secrets Vault:**
   - Store `JWT_ACCESS_SECRET`, `OTP_SECRET`, and `DATABASE_URL` in a secret management service (AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager).

---

## 9. Operational Security Checklist

- [x] HTTPS enforced via reverse proxy with TLS 1.2+
- [x] `TRUST_PROXY` configured accurately for deployment topology
- [x] Explicit `CORS_ORIGIN` allowlist configured (no `*` wildcard)
- [x] Strong, unique cryptographic secrets generated (64+ hex characters)
- [x] Automated PostgreSQL backups scheduled and tested
- [x] Liveness (`/health`) and Readiness (`/ready`) probes configured in load balancer
- [x] Production error handler active (`NODE_ENV=production`) suppressing stack traces
- [x] Periodic maintenance cleanup scheduled via cron
- [x] Zero credential logging verified in production structured logs
