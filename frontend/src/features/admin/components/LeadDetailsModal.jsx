import { useEffect } from "react";
import { Mail, Phone, X } from "lucide-react";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(value));

export default function LeadDetailsModal({ lead, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!lead) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-details-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-slate-100 p-6 sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
              Lead details
            </p>
            <h2
              id="lead-details-title"
              className="mt-2 text-2xl font-bold tracking-tight text-slate-950"
            >
              {lead.subject}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lead details"
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-7 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-lg font-bold text-cyan-800">
              {lead.name?.charAt(0)?.toUpperCase() || "L"}
            </span>
            <div>
              <p className="font-semibold text-slate-900">{lead.name}</p>
              <p className="text-sm text-slate-500">Lead #{lead.id}</p>
            </div>
            <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
              {lead.status}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={`mailto:${lead.email}`}
              className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 p-4 hover:border-cyan-300"
            >
              <Mail className="shrink-0 text-cyan-700" size={18} />
              <span className="min-w-0">
                <span className="block text-xs text-slate-400">Email</span>
                <span className="block truncate text-sm font-medium text-slate-800">
                  {lead.email}
                </span>
              </span>
            </a>
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 p-4">
              <Phone className="shrink-0 text-cyan-700" size={18} />
              <span className="min-w-0">
                <span className="block text-xs text-slate-400">Phone</span>
                {lead.phone ? (
                  <a
                    href={`tel:${lead.phone}`}
                    className="block truncate text-sm font-medium text-slate-800 hover:text-cyan-700"
                  >
                    {lead.phone}
                  </a>
                ) : (
                  <span className="text-sm text-slate-500">Not provided</span>
                )}
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Message
            </p>
            <p className="mt-2 whitespace-pre-wrap rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
              {lead.message}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Received
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {formatDate(lead.created_at)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
