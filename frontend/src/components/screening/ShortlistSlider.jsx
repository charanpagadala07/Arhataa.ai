import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  MAX_SHORTLIST_PERCENT,
  MIN_SHORTLIST_PERCENT,
} from "@/lib/constants";

export function ShortlistSlider({
  percent,
  onChange,
  disabled,
}) {
  return (
    <section
      className="
        rounded-xl
        border border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Label className="text-sm font-semibold text-[#0A2540]">
            Shortlist Percentage
          </Label>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Choose how much of the applicant pool should be
            prioritized for review.
          </p>
        </div>

        {/* Current percentage */}
        <div
          className="
            flex h-12 min-w-[64px]
            items-center justify-center
            rounded-lg
            bg-blue-50
            px-3
            text-lg font-bold
            text-[#0A66C2]
          "
        >
          {percent}%
        </div>
      </div>

      {/* Slider */}
      <div className="mt-7">
        <Slider
          min={MIN_SHORTLIST_PERCENT}
          max={MAX_SHORTLIST_PERCENT}
          step={1}
          value={[percent]}
          disabled={disabled}
          onValueChange={(value) => onChange(value[0])}
          className="
            [&_[data-orientation=horizontal]]:h-2
            [&_[data-orientation=horizontal]]:bg-slate-200
            [&_[role=slider]]:h-5
            [&_[role=slider]]:w-5
            [&_[role=slider]]:border-2
            [&_[role=slider]]:border-white
            [&_[role=slider]]:bg-[#0A66C2]
            [&_[role=slider]]:shadow-md
            [&_[role=slider]]:ring-[#0A66C2]/20
          "
        />

        {/* Range labels */}
        <div className="mt-2 flex items-center justify-between text-xs font-medium text-slate-400">
          <span>{MIN_SHORTLIST_PERCENT}%</span>

          <span className="text-slate-500">
            {MAX_SHORTLIST_PERCENT}%
          </span>
        </div>
      </div>

      {/* Explanation */}
      <div
        className="
          mt-5
          rounded-lg
          border border-blue-100
          bg-blue-50/60
          px-3.5
          py-3
        "
      >
        <p className="text-sm leading-6 text-slate-600">
          The top{" "}
          <span className="font-semibold text-[#0A2540]">
            {percent}%
          </span>{" "}
          of candidates returned by screening will be
          shortlisted for your review.
        </p>
      </div>
    </section>
  );
}
