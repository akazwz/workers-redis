# Workers Redis TCP Test

This project tests TCP Redis connectivity in Cloudflare Workers using the `ioredis` client library.

## Overview

Cloudflare Workers have limited support for TCP connections. This project serves as a test to verify whether Redis connections work properly in the Workers environment using the Node.js compatibility layer.

## Features

- Simple Redis connectivity test
- Built with [Hono](https://hono.dev/) web framework
- Uses [ioredis](https://github.com/redis/ioredis) client
- TypeScript support
- Cloudflare Workers deployment ready

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Cloudflare account with Workers access
- Redis instance (with TCP/TLS support)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd workers-redis
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .dev.example.vars .dev.vars
```

4. Edit `.dev.vars` and add your Redis URL:
```
REDIS_URL=rediss://your-redis-url
```

## Development

Start the development server:
```bash
pnpm dev
```

The worker will be available at `http://localhost:8787`

## API Endpoints

### GET /redis

Tests Redis connectivity by setting and getting a test value.

**Response:**
- Success: `{ "value": "test" }`
- Error: `{ "error": "error message" }`

**Example:**
```bash
curl http://localhost:8787/redis
```

## Deployment

1. Configure your Redis URL as a secret in Cloudflare Workers:
```bash
wrangler secret put REDIS_URL
```

2. Deploy to Cloudflare Workers:
```bash
pnpm deploy
```

## Configuration

The project uses `wrangler.jsonc` for Cloudflare Workers configuration:

- **Node.js Compatibility**: Enabled via `nodejs_compat` flag
- **Observability**: Enabled for monitoring
- **Compatibility Date**: Set to ensure stable API behavior

## Redis Requirements

Your Redis instance must support:
- TCP connections (port 6379) or TLS connections (port 6380)
- External connections from Cloudflare Workers
- Authentication if required

### Recommended Redis Providers

- **Upstash Redis** - Serverless Redis with HTTP API (recommended)
- **Redis Cloud** - Managed Redis service
- **AWS ElastiCache** - With proper VPC configuration

## Testing

The `/redis` endpoint performs a simple connectivity test:

1. Connects to Redis using the provided URL
2. Sets a key `test` with value `test`
3. Retrieves the key value
4. Returns the result

## Redis URL Format

```
# Standard Redis
redis://username:password@host:port

# Redis with TLS
rediss://username:password@host:port

# With database selection
redis://username:password@host:port/db
```

## Test Results

✅ **TCP Redis connections work in Cloudflare Workers!**

This project successfully demonstrates that Cloudflare Workers can connect to Redis using TCP with the Node.js compatibility layer enabled.

## Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Hono Documentation](https://hono.dev/)
- [ioredis Documentation](https://github.com/redis/ioredis)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) 