import { cn } from "@/lib/utils";

function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "border-border bg-muted text-foreground",
    strong: "border-emerald-200 bg-emerald-50 text-emerald-800",
    good: "border-sky-200 bg-sky-50 text-sky-800",
    potential: "border-amber-200 bg-amber-50 text-amber-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[11px] font-medium",
        variants[variant] ?? variants.default,
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
