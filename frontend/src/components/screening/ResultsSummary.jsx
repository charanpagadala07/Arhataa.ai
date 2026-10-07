import { formatCount, formatPercent } from "@/lib/utils";

export function ResultsSummary({
  stats,
  shortlistPercent,
}) {
  return (
    <section className="space-y-4">
      {/* =====================================================
          PRIMARY SUMMARY
      ====================================================== */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Applicants Analyzed"
          value={formatCount(stats.applicants)}
          description="Total applications processed"
        />

        <SummaryCard
          label="Selected"
          value={`Top ${shortlistPercent}%`}
          description="Based on screening results"
          highlighted
        />

        <SummaryCard
          label="Candidates Shortlisted"
          value={formatCount(stats.shortlisted)}
          description="Candidates ready for review"
        />
      </div>

      {/* =====================================================
          SECONDARY METRICS
      ====================================================== */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          compact
          label="Applicants"
          value={formatCount(stats.applicants)}
        />

        <SummaryCard
          compact
          label="Shortlisted"
          value={formatCount(stats.shortlisted)}
        />

        <SummaryCard
          compact
          label="Average Match"
          value={formatPercent(stats.averageMatch)}
          accent
        />

        <SummaryCard
          compact
          label="Strong Matches"
          value={formatCount(stats.strongMatches)}
          accent
        />
      </div>
    </section>
  );
}

function SummaryCard({
  label,
  value,
  description,
  compact = false,
  highlighted = false,
  accent = false,
}) {
  if (compact) {
    return (
      <div
        className="
          rounded-xl
          border border-slate-200
          bg-white
          px-4 py-4
          shadow-sm
          transition-all duration-200
          hover:border-blue-200
          hover:shadow-md
        "
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          {accent && (
            <span className="h-1.5 w-1.5 rounded-full bg-[#0A66C2]" />
          )}
        </div>

        <p
          className={`
            mt-2 text-xl font-bold tracking-tight
            ${accent ? "text-[#0A66C2]" : "text-[#0A2540]"}
          `}
        >
          {value}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`
        relative overflow-hidden
        rounded-xl
        border
        px-5 py-5
        shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        ${
          highlighted
            ? "border-blue-200 bg-blue-50/60"
            : "border-slate-200 bg-white"
        }
      `}
    >
      {/* Accent bar */}
      <div
        className={`
          absolute left-0 top-0 h-full w-1
          ${highlighted ? "bg-[#0A66C2]" : "bg-slate-200"}
        `}
      />

      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold tracking-tight text-[#0A2540]">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

