# Flight Alert Hub

Build a SaaS landing page and authenticated app shell for Flight Price Notifier (機票降價通知).

Requirements:
1. Public landing page (/)
- Hero section: "Flight Price Notifier" prominently displayed, value proposition 「設定航線與目標價，機票降價就通知你」 (subtitle: "Set a route and a target price — we email you when the fare drops."), top-right header CTA "Sign in / 登入".
- Features section with exactly 3 cards:
  * 「盯緊熱門航線 (Always-on route watching)」: 持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。
  * 「達標自動通知 (Target-price email alerts)」: 低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。
  * 「隨時取消 (Cancel anytime)」: 月訂閱制，不想用隨時停，沒有綁約。
- Footer: 「© 2026 Flight Price Notifier」.

2. Authentication
- Email + password Sign Up and Sign In pages.
- Sign out functionality.
- Disable email confirmation if applicable for easy testing.
- IMPORTANT: Auth only. Do NOT create custom tables like subscriptions or profiles. Only use standard auth.users.

3. Authenticated App Shell (/app)
- Protected route accessible after sign in.
- Header with greeting 「Hi {user.email}」 and a "Sign Out" button.
- Placeholder content: 「你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。」 ("Your dashboard is coming soon. Route-subscription will be added in the next milestone.")

4. Design & Polish
- Modern, clean dark theme with purple/violet accents on near-black background.
- Inter or clean sans-serif typography.
- Mobile responsive layout with subtle fade-in animations on scroll.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0bc1ae92-638b-439f-b923-95a34e3e57c5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
