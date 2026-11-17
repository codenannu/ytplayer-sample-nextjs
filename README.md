# YouTube Player — Next.js sample

Public playground with **Next.js App Router** + full React control chrome. Focus: **Referrer-Policy / CSP** for YouTube embeds (Error **153**). **No** DRM BFF.

| | |
|--|--|
| Port | **3001** |
| Sample version | **1.0.0** |
| Repo | [ytplayer-sample-nextjs](https://github.com/codenannu/ytplayer-sample-nextjs) |
| SDK | `@codenkay/video-ytplayer-ui` · `react` · `core` (**^1.0.0**) |

## Runtime stack

| Layer | Version |
|-------|---------|
| Node.js | **>=20.9.0** |
| Next.js | **16.4.6** (Active LTS) |
| React / react-dom | **19.3.1** |
| SDK | `@codenkay/video-ytplayer-*@^1.0.0` |

> This sample is **standalone**. It does **not** require cloning a private SDK monorepo. Prefer **npm** packages (`^1.0.0`). There is **no** `/api/playback` or `/api/drm/*` — YouTube public IDs only.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## SDK packages

| Package | Role | Used here |
|---------|------|-----------|
| [`@codenkay/video-ytplayer-core`](https://www.npmjs.com/package/@codenkay/video-ytplayer-core) | YouTube IFrame API engine | Yes |
| [`@codenkay/video-ytplayer-react`](https://www.npmjs.com/package/@codenkay/video-ytplayer-react) | Headless React player | Yes |
| [`@codenkay/video-ytplayer-ui`](https://www.npmjs.com/package/@codenkay/video-ytplayer-ui) | Control chrome | **Primary UI** |
| [`@codenkay/video-ytplayer-angular`](https://www.npmjs.com/package/@codenkay/video-ytplayer-angular) | Angular headless | No — see [Angular sample](https://github.com/codenannu/ytplayer-sample-angular) |

## Related samples

| Sample | Repository | Port | Purpose |
|--------|------------|------|---------|
| React | [ytplayer-sample-react](https://github.com/codenannu/ytplayer-sample-react) | **5173** | Vite UI playground |
| **This repo** | [ytplayer-sample-nextjs](https://github.com/codenannu/ytplayer-sample-nextjs) | **3001** | Next + CSP / Referrer-Policy |
| Angular | [ytplayer-sample-angular](https://github.com/codenannu/ytplayer-sample-angular) | **4200** | Headless Angular |

## Quick start

```bash
git clone https://github.com/codenannu/ytplayer-sample-nextjs.git
cd ytplayer-sample-nextjs
cp .env.example .env.local   # NODE_ENV / PORT / HOSTNAME
npm install
npm run dev
```

Requires Node.js **>=20.9.0**. Open http://localhost:3001

## Host headers (required)

- `Referrer-Policy: strict-origin-when-cross-origin` — **never** `no-referrer`
- CSP `frame-src` / `script-src` allow `youtube.com` and `youtube-nocookie.com`

## Install peers (into your own app)

```bash
npm install @codenkay/video-ytplayer-ui@^1.0.0 @codenkay/video-ytplayer-react@^1.0.0 @codenkay/video-ytplayer-core@^1.0.0 react@19.3.1 react-dom@19.3.1 next@16.4.6
```

## Features demonstrated

- App Router client player with UI chrome
- Error 153–safe Referrer-Policy + CSP
- Muted autoplay, observe-only quality, interaction shield
- No catalog / DRM APIs
