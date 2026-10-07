import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function JobDescription({ value, onChange, disabled }) {
  return (
    <section className="rounded-md border border-border bg-card p-4">
      <Label htmlFor="job-description">Job Description</Label>
      <Textarea
        id="job-description"
        className="mt-3 min-h-64"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
  );
}
