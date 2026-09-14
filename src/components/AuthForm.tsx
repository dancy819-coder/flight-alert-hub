import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, LoaderCircle, Mail, Plane } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Mode = "signin" | "signup" | "forgot";

export function AuthForm() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) void navigate({ to: "/app", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (mode === "forgot") {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setLoading(false);
      if (resetError) setError(resetError.message);
      else setMessage("Password reset instructions are on the way. 請查看你的信箱。");
      return;
    }

    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });

    setLoading(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    if (mode === "signup" && !result.data.session) {
      setMessage("Check your email to confirm your account. 請查看你的信箱。");
      return;
    }
    await navigate({ to: "/app", replace: true });
  }

  function changeMode(next: Mode) {
    setMode(next);
    setError("");
    setMessage("");
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-12">
      <div className="auth-grid" aria-hidden="true" />
      <Link to="/" className="absolute left-5 top-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:left-8">
        <ArrowLeft className="size-4" aria-hidden="true" /> Back home
      </Link>

      <section className="relative z-10 w-full max-w-md border border-border bg-card/80 p-6 shadow-2xl shadow-primary/5 backdrop-blur-xl sm:p-9">
        <div className="mb-8">
          <span className="mb-5 grid size-11 place-items-center rounded-md bg-primary text-primary-foreground">
            <Plane className="size-5 -rotate-12" aria-hidden="true" />
          </span>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Flight Price Notifier</p>
          <h1 className="text-3xl font-semibold text-foreground">
            {mode === "signin" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset your password"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {mode === "signin" ? "登入並查看你的航線追蹤。" : mode === "signup" ? "開始追蹤你想去的下一座城市。" : "我們會寄送安全的重設連結給你。"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-11 bg-background/70" />
          </div>
          {mode !== "forgot" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {mode === "signin" && <button type="button" onClick={() => changeMode("forgot")} className="text-xs text-primary hover:underline">Forgot password?</button>}
              </div>
              <Input id="password" type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" className="h-11 bg-background/70" />
            </div>
          )}

          {error && <p role="alert" className="border-l-2 border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
          {message && <p role="status" className="border-l-2 border-success bg-success/10 px-3 py-2 text-sm text-success">{message}</p>}

          <Button type="submit" disabled={loading} className="h-11 w-full">
            {loading ? <LoaderCircle className="animate-spin" /> : mode === "forgot" ? <Mail /> : <ArrowRight />}
            {mode === "signin" ? "Sign in / 登入" : mode === "signup" ? "Sign up / 註冊" : "Send reset link"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "signin" ? (
            <>New here? <button type="button" onClick={() => changeMode("signup")} className="font-medium text-foreground hover:text-primary">Create an account</button></>
          ) : (
            <>Already have an account? <button type="button" onClick={() => changeMode("signin")} className="font-medium text-foreground hover:text-primary">Sign in</button></>
          )}
        </div>
      </section>
    </main>
  );
}