import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CircleHelp,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function InformationPage({ page }) {
  return (
    <main className="bg-slate-50 px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-sm text-slate-500"
        >
          <Link to="/" className="transition hover:text-primary">
            Home
          </Link>
          <ChevronRight size={15} aria-hidden="true" />
          <span className="text-slate-800">{page.title}</span>
        </nav>

        <header className="overflow-hidden rounded-[2rem] bg-primary px-7 py-10 text-white sm:px-12 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/65">
            {page.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            {page.intro}
          </p>
        </header>

        <div className="mt-8 grid gap-5">
          {page.sections?.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-7 text-slate-600 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {page.faqs && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight text-slate-900">
                <CircleHelp className="text-secondary" size={22} />
                Answers to common questions
              </h2>
              <div className="mt-5 divide-y divide-slate-100">
                {page.faqs.map((faq) => (
                  <details key={faq.question} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-800 marker:hidden">
                      {faq.question}
                      <ChevronDown
                        size={18}
                        className="shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>

        <section className="mt-8 flex flex-col gap-5 rounded-3xl border border-primary/10 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Still have a question?
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Send our team a message and include any order details that may
              help.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            Contact us
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
