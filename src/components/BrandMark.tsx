import { Plane } from "lucide-react";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-md border border-primary/35 bg-primary/10 text-primary">
        <Plane className="size-4 -rotate-12" aria-hidden="true" />
      </span>
      {!compact && (
        <span className="text-sm font-semibold text-foreground">
          Flight Price Notifier
        </span>
      )}
    </div>
  );
}