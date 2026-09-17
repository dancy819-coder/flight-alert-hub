import { useState } from "react";
import { LogOut, Plane, BellRing, CheckCircle2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { usePageMeta } from "@/lib/use-page-meta";

const API_URL = import.meta.env.VITE_FLIGHT_API_URL as string;

type Plan = {
  name: "tokyo" | "seoul";
  label: string;
  route: string;
  hint: number;
};

const PLANS: Plan[] = [
  { name: "tokyo", label: "台北 ✈ 東京", route: "TPE-TYO", hint: 9325 },
  { name: "seoul", label: "台北 ✈ 首爾", route: "TPE-SEL", hint: 5989 },
];

type SubscriptionRow = {
  email: string;
  route: string;
  plan_name: string;
  target_price: number;
  currency: string;
};

async function fetchSubscriptions(email: string): Promise<SubscriptionRow[]> {
  const res = await fetch(`${API_URL}/subscriptions?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error("無法讀取訂閱狀態");
  const data = await res.json();
  return data.items ?? [];
}

async function postSubscribe(payload: { email: string; plan_name: string; target_price: number }) {
  const res = await fetch(`${API_URL}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("訂閱失敗，請稍後再試");
  return res.json();
}

function PlanCard({
  plan,
  subscription,
  email,
}: {
  plan: Plan;
  subscription?: SubscriptionRow;
  email: string;
}) {
  const queryClient = useQueryClient();
  const [target, setTarget] = useState(subscription ? String(subscription.target_price) : "");
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: postSubscribe,
    onSuccess: () => {
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["subscriptions", email] });
    },
    onError: (e: Error) => setError(e.message),
  });

  function handleSubmit() {
    const value = Number(target);
    if (!Number.isFinite(value) || value <= 0) {
      setError("請輸入有效的 NT$ 目標價");
      return;
    }
    mutation.mutate({ email, plan_name: plan.name, target_price: value });
  }

  const isSubscribed = Boolean(subscription);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plane className="size-4 -rotate-12 text-primary" />
            {plan.label}
          </CardTitle>
          {isSubscribed && (
            <Badge className="gap-1">
              <CheckCircle2 className="size-3.5" /> 已訂閱
            </Badge>
          )}
        </div>
        <CardDescription>目前最低票價約 NT${plan.hint.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <label
          className="text-sm font-medium text-muted-foreground"
          htmlFor={`target-${plan.name}`}
        >
          NT$ 目標價（低於這個價格就寄信通知你）
        </label>
        <Input
          id={`target-${plan.name}`}
          type="number"
          min={1}
          inputMode="numeric"
          placeholder={`例如 ${plan.hint}`}
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit} disabled={mutation.isPending}>
          {mutation.isPending ? "處理中…" : isSubscribed ? "更新目標價" : "開始追蹤"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function AppDashboard() {
  usePageMeta(
    "Dashboard｜Flight Price Notifier",
    "Your Flight Price Notifier route tracking dashboard.",
  );

  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  }

  const { data: subscriptions, isLoading } = useQuery({
    queryKey: ["subscriptions", user?.email],
    queryFn: () => fetchSubscriptions(user!.email!),
    enabled: Boolean(user?.email),
  });

  // ProtectedRoute only renders this component once a user is present, but
  // guard anyway for type-safety and to survive a sign-out race.
  if (!user) return null;

  const byRoute = new Map((subscriptions ?? []).map((s) => [s.route, s]));

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <BrandMark />
          <div className="flex items-center gap-3">
            <p className="hidden max-w-72 truncate text-sm text-muted-foreground sm:block">
              Hi {user.email}
            </p>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut /> Sign Out
            </Button>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Dashboard / 儀表板
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">Hi {user.email}</h1>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">載入訂閱狀態中…</p>
          ) : (
            PLANS.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                subscription={byRoute.get(plan.route)}
                email={user.email!}
              />
            ))
          )}
        </div>

        <aside className="mt-8 border border-border bg-surface p-7">
          <BellRing className="size-5 text-primary" />
          <p className="mt-4 text-sm font-medium">降價通知會寄到：</p>
          <p className="mt-2 break-all font-mono text-sm text-foreground">{user.email}</p>
        </aside>
      </section>
    </main>
  );
}
