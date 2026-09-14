import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BellRing, CircleDollarSign, Eye, MapPin, Plane, TicketCheck } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Flight Price Notifier｜機票降價通知" },
    { name: "description", content: "設定航線與目標價，機票降價就通知你。Track flights and get an email when fares drop." },
    { property: "og:title", content: "Flight Price Notifier｜機票降價通知" },
    { property: "og:description", content: "設定航線與目標價，機票降價就通知你。" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const features = [
    { icon: Eye, title: "盯緊熱門航線", english: "Always-on route watching", description: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。" },
    { icon: BellRing, title: "達標自動通知", english: "Target-price email alerts", description: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。" },
    { icon: CircleDollarSign, title: "隨時取消", english: "Cancel anytime", description: "月訂閱制，不想用隨時停，沒有綁約。" },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <BrandMark />
        <Button asChild variant="outline" className="border-primary/30 bg-primary/5 hover:bg-primary/10">
          <Link to="/auth">Sign in / 登入 <ArrowRight /></Link>
        </Button>
      </header>

      <section className="relative mx-auto grid min-h-[670px] max-w-7xl items-center gap-12 px-5 pb-24 pt-16 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:pb-28 lg:pt-20">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative z-10 animate-rise">
          <div className="mb-7 inline-flex items-center gap-2 border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            TPE fares, watched around the clock
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] text-foreground sm:text-6xl lg:text-7xl">
            Flight Price <span className="text-primary">Notifier</span>
          </h1>
          <p className="mt-7 text-xl font-medium leading-relaxed text-foreground sm:text-2xl">設定航線與目標價，機票降價就通知你</p>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Set a route and a target price — we email you when the fare drops.</p>
          <Button asChild size="lg" className="mt-9 h-12 px-6 shadow-lg shadow-primary/15">
            <Link to="/auth">Start watching fares <ArrowRight /></Link>
          </Button>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-lg animate-rise-delayed" aria-label="Flight price tracking preview">
          <div className="flight-panel">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-success" /> LIVE WATCH</div>
              <span className="font-mono text-xs text-muted-foreground">UPDATED 08:07</span>
            </div>
            <div className="p-5 sm:p-7">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div><p className="text-4xl font-semibold">TPE</p><p className="mt-1 text-xs text-muted-foreground">Taipei</p></div>
                <div className="flex items-center gap-2 text-primary"><span className="h-px w-8 bg-primary/40" /><Plane className="size-5" /><span className="h-px w-8 bg-primary/40" /></div>
                <div className="text-right"><p className="text-4xl font-semibold">NRT</p><p className="mt-1 text-xs text-muted-foreground">Tokyo</p></div>
              </div>
              <div className="my-7 h-28 border-y border-border py-4">
                <svg viewBox="0 0 400 90" className="h-full w-full" role="img" aria-label="Fare price dropping below target">
                  <path d="M4 19 C45 13,60 34,96 30 S148 53,181 43 S226 66,260 57 S317 77,396 68" fill="none" stroke="var(--primary)" strokeWidth="3" />
                  <path d="M4 55 H396" fill="none" stroke="var(--muted-foreground)" strokeDasharray="5 5" opacity=".45" />
                  <circle cx="396" cy="68" r="5" fill="var(--success)" />
                </svg>
              </div>
              <div className="flex items-end justify-between">
                <div><p className="text-xs text-muted-foreground">CURRENT LOWEST</p><p className="mt-1 text-3xl font-semibold">NT$ 8,420</p></div>
                <div className="text-right"><p className="text-xs text-muted-foreground">YOUR TARGET</p><p className="mt-1 font-mono text-sm text-success">NT$ 9,000 ✓</p></div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -right-2 flex items-center gap-3 border border-success/25 bg-card px-4 py-3 shadow-xl sm:-right-6">
            <TicketCheck className="size-5 text-success" /><div><p className="text-xs font-medium">Price target reached</p><p className="text-[11px] text-muted-foreground">Email alert sent</p></div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Built for better timing</p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold sm:text-4xl">少一點搜尋，多一點期待。</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {features.map((feature, index) => (
              <Reveal key={feature.title} className="h-full" >
                <article className="h-full bg-card p-7 transition-colors hover:bg-accent/50 sm:p-8">
                  <div className="mb-8 flex items-start justify-between"><feature.icon className="size-6 text-primary" /><span className="font-mono text-xs text-muted-foreground">0{index + 1}</span></div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{feature.english}</p>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">{feature.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-center lg:px-12">
        <div><p className="text-2xl font-semibold">下一次降價，不要再錯過。</p><p className="mt-2 text-muted-foreground">Your next trip starts with the right fare.</p></div>
        <Button asChild size="lg"><Link to="/auth">Create free account <ArrowRight /></Link></Button>
      </section>

      <footer className="border-t border-border px-5 py-8 text-center text-sm text-muted-foreground">© 2026 Flight Price Notifier</footer>
    </main>
  );
}
