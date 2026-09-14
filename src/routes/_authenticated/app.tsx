import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BellRing, LogOut, Plane, Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({ meta: [
    { title: "Dashboard｜Flight Price Notifier" },
    { name: "description", content: "Your Flight Price Notifier route tracking dashboard." },
    { property: "og:title", content: "Dashboard｜Flight Price Notifier" },
    { property: "og:description", content: "Manage your watched routes and fare alerts." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AppPage,
});

function AppPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <BrandMark />
          <div className="flex items-center gap-3">
            <p className="hidden max-w-72 truncate text-sm text-muted-foreground sm:block">Hi {user.email}</p>
            <Button variant="outline" size="sm" onClick={handleSignOut}><LogOut /> Sign Out</Button>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Dashboard / 儀表板</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">Hi {user.email}</h1>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
          <div className="border border-border bg-card p-7 sm:p-10">
            <div className="grid size-12 place-items-center rounded-md bg-primary/10 text-primary"><Plane className="size-6 -rotate-12" /></div>
            <h2 className="mt-10 max-w-xl text-2xl font-semibold leading-snug">你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。</h2>
            <p className="mt-4 max-w-lg leading-7 text-muted-foreground">Your dashboard is coming soon. Route-subscription will be added in the next milestone.</p>
            <Button disabled className="mt-8"><Plus /> Add a route <ArrowRight /></Button>
          </div>
          <aside className="border border-border bg-surface p-7">
            <BellRing className="size-5 text-primary" />
            <p className="mt-6 text-sm font-medium">Alerts are ready</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">新增航線功能上線後，降價通知會寄到：</p>
            <p className="mt-4 break-all font-mono text-sm text-foreground">{user.email}</p>
          </aside>
        </div>
      </section>
    </main>
  );
}