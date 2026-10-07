import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Hero() {
  const navigate = useNavigate();

  function start() {
    navigate("/login");
  }

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-0">
        <div className="absolute right-[-10%] top-[-30%] h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute left-[-10%] bottom-[-40%] h-[400px] w-[400px] rounded-full bg-sky-100/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
            AI-POWERED APPLICANT SCREENING
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-[#0A2540] sm:text-5xl md:text-6xl">
            Turn thousands of applications into a{" "}
            <span className="text-[#0A66C2]">focused shortlist.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            ShortlistAI helps recruiters analyze applicant information against a
            job description and quickly identify candidates worth reviewing
            first.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              onClick={start}
              className="h-11 bg-[#0A66C2] px-6 text-sm font-semibold shadow-sm transition-all hover:bg-[#084E96] hover:shadow-md"
            >
              Get Started
            </Button>

            <Button
              variant="outline"
              asChild
              className="h-11 border-slate-300 bg-white px-6 text-sm font-semibold text-[#0A2540] hover:bg-slate-50"
            >
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
            <span>✓ Faster screening</span>
            <span>✓ Explainable recommendations</span>
            <span>✓ Recruiter-controlled decisions</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhySection() {
  return (
    <section className="bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#0A66C2]">
            The challenge
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-[#0A2540] md:text-3xl">
            Screening shouldn't slow your hiring team down.
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600 md:text-base">
            <p>
              Recruiters may receive hundreds or thousands of applications for
              a single position. Manually reviewing every application takes
              significant time and makes it harder to focus on the candidates
              who deserve closer attention.
            </p>

            <p>
              ShortlistAI helps reduce the initial screening workload by
              analyzing available candidate information and prioritizing
              candidates for recruiter review.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Audience() {
  const items = [
    {
      number: "01",
      title: "Recruiters",
      body: "Quickly identify candidates who best match a job description.",
    },
    {
      number: "02",
      title: "Hiring Teams",
      body: "Reduce repetitive initial screening work and focus on meaningful candidate evaluation.",
    },
    {
      number: "03",
      title: "Startups & Small Companies",
      body: "Screen large applicant lists without needing a complicated recruitment platform.",
    },
  ];

  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#0A66C2]">
            Built for teams
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-[#0A2540] md:text-3xl">
            Designed around the people doing the hiring.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-[#0A66C2]">
                {item.number}
              </div>

              <h3 className="mt-5 text-base font-bold text-[#0A2540]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Upload Applicants",
      body: "Provide the candidate information you want ShortlistAI to analyze.",
    },
    {
      n: "02",
      title: "Add Job Description",
      body: "Give the system the role requirements and expectations.",
    },
    {
      n: "03",
      title: "Choose Shortlist %",
      body: "Decide how much of the applicant pool you want to review first.",
    },
    {
      n: "04",
      title: "Review AI Shortlist",
      body: "Review prioritized candidates and the reasoning behind recommendations.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-[#F8FAFC]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#0A66C2]">
            Simple workflow
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-[#0A2540] md:text-3xl">
            From applications to shortlist in four steps.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.n}
              className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0A66C2]">
                  {step.n}
                </span>

                {index < steps.length - 1 && (
                  <span className="hidden text-slate-300 lg:block">→</span>
                )}
              </div>

              <h3 className="mt-5 text-sm font-bold text-[#0A2540]">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Benefits() {
  const items = [
    "Faster initial screening",
    "Handles large applicant lists",
    "Optional resume analysis",
    "Explainable recommendations",
    "Adjustable shortlist percentage",
    "Easy shortlist export",
  ];

  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#0A66C2]">
            Why use ShortlistAI
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-[#0A2540] md:text-3xl">
            Less repetitive screening. More focused review.
          </h2>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-5 py-4 transition-colors hover:border-blue-200 hover:bg-blue-50/40"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-[#0A66C2]">
                ✓
              </div>

              <span className="text-sm font-medium text-[#0A2540]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResponsibleAi() {
  return (
    <section className="bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="max-w-3xl rounded-2xl border border-blue-100 bg-blue-50/60 p-6 md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0A66C2] text-lg text-white">
              AI
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0A66C2]">
                Responsible AI
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-tight text-[#0A2540] md:text-2xl">
                AI assists recruiters — it does not make the final hiring
                decision.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                ShortlistAI provides recommendations and supporting reasons.
                Recruiters remain responsible for reviewing candidates and
                making the final hiring decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  const navigate = useNavigate();

  function start() {
    navigate("/login");
  }

  return (
    <section className="bg-[#0A2540]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
            Get started
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Ready to review candidates faster?
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
            Start screening applications with a workflow designed to keep
            recruiters in control.
          </p>
        </div>

        <Button
          onClick={start}
          className="h-11 shrink-0 bg-white px-6 font-semibold text-[#0A2540] shadow-sm hover:bg-blue-50"
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}
