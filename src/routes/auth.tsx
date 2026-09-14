import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Sign in｜Flight Price Notifier" },
    { name: "description", content: "Sign in or create your Flight Price Notifier account." },
    { property: "og:title", content: "Sign in｜Flight Price Notifier" },
    { property: "og:description", content: "Sign in to manage your flight fare alerts." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AuthForm,
});