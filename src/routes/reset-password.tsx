import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, KeyRound, LoaderCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [
    { title: "Reset password｜Flight Price Notifier" },
    { name: "description", content: "Choose a new password for your Flight Price Notifier account." },
    { property: "og:title", content: "Reset password｜Flight Price Notifier" },
    { property: "og:description", content: "Securely reset your account password." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isRecovery = window.location.hash.includes("type=recovery") || window.location.search.includes("type=recovery");
    void supabase.auth.getSession().then(({ data }) => setReady(isRecovery || Boolean(data.session)));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) setError(updateError.message);
    else await navigate({ to: "/app", replace: true });
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-12">
      <section className="w-full max-w-md border border-border bg-card p-7 sm:p-9">
        <Link to="/auth" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Sign in</Link>
        <KeyRound className="size-7 text-primary" />
        <h1 className="mt-5 text-3xl font-semibold">Choose a new password</h1>
        <p className="mt-2 text-sm text-muted-foreground">設定新的登入密碼。</p>
        {ready ? (
          <form onSubmit={submit} className="mt-8 space-y-5">
            <div className="space-y-2"><Label htmlFor="password">New password</Label><Input id="password" type="password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} className="h-11" /></div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="h-11 w-full" disabled={loading}>{loading && <LoaderCircle className="animate-spin" />} Update password</Button>
          </form>
        ) : <p className="mt-8 border-l-2 border-destructive bg-destructive/10 p-3 text-sm text-destructive">This reset link is invalid or has expired.</p>}
      </section>
    </main>
  );
}