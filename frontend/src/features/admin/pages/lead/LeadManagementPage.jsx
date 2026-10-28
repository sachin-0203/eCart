import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  AlertCircle,
  Eye,
  LoaderCircle,
  Mail,
  Phone,
  Trash2,
  UsersRound,
} from "lucide-react";
import { deleteLead, getLeads, updateLead } from "../../api/leadsApi";
import AdminLoading from "../../components/AdminLoading";
import AdminSearch from "../../components/AdminSearch";
import LeadDetailsModal from "../../components/LeadDetailsModal";

const statusOptions = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "resolved", label: "Resolved" },
];

const statusStyles = {
  new: "bg-sky-50 text-sky-700",
  contacted: "bg-amber-50 text-amber-700",
  resolved: "bg-emerald-50 text-emerald-700",
};

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export default function LeadManagementPage() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      setLeads(await getLeads());
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const visibleLeads = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesSearch = [
        lead.name,
        lead.email,
        lead.phone,
        lead.subject,
        lead.message,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch));
      return (
        matchesSearch &&
        (statusFilter === "all" || lead.status === statusFilter)
      );
    });
  }, [leads, search, statusFilter]);

  const handleStatusChange = async (lead, status) => {
    setUpdatingId(lead.id);
    try {
      const updatedLead = await updateLead(lead.id, { status });
      setLeads((current) =>
        current.map((item) =>
          item.id === lead.id ? { ...item, ...updatedLead } : item,
        ),
      );
      toast.success(`Lead marked ${status}.`);
    } catch (error) {
      toast.error("Could not update lead status", {
        description: error.message,
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (lead) => {
    if (!window.confirm(`Delete the lead from ${lead.name}? This cannot be undone.`)) {
      return;
    }

    setDeletingId(lead.id);
    try {
      await deleteLead(lead.id);
      setLeads((current) => current.filter((item) => item.id !== lead.id));
      toast.success("Lead deleted.");
    } catch (error) {
      toast.error("Could not delete lead", { description: error.message });
    } finally {
      setDeletingId(null);
    }
  };

  const countByStatus = (status) =>
    leads.filter((lead) => lead.status === status).length;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
          Customer enquiries
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Lead management
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Review customer enquiries, follow up, and track their progress.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total leads",
            value: leads.length,
            tone: "text-slate-950",
            accent: "from-slate-900 to-slate-700",
          },
          {
            label: "New",
            value: countByStatus("new"),
            tone: "text-sky-700",
            accent: "from-sky-500 to-sky-600",
          },
          {
            label: "Contacted",
            value: countByStatus("contacted"),
            tone: "text-amber-700",
            accent: "from-amber-400 to-amber-500",
          },
          {
            label: "Resolved",
            value: countByStatus("resolved"),
            tone: "text-emerald-700",
            accent: "from-emerald-500 to-emerald-600",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className={`mb-3 h-1.5 w-16 rounded-full bg-gradient-to-r ${stat.accent}`} />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {stat.label}
            </p>
            <p className={`mt-3 text-2xl font-bold ${stat.tone}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <AdminSearch
                value={search}
                onChange={setSearch}
                placeholder="Search name, email, or subject"
                label="Search leads"
              />
            </div>
            <div className="inline-flex flex-wrap items-center gap-1 rounded-md bg-gray-200 p-1 shadow-inner ring-1 ring-white/10">
              {[
                { value: "all", label: "All" },
                ...statusOptions,
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatusFilter(option.value)}
                  className={`rounded-sm px-2 py-1 text-sm font-medium transition ${
                    statusFilter === option.value
                      ? "bg-white/90 text-slate-900 shadow-sm"
                      : "text-slate-800 hover:text-black"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <AdminLoading label="Gathering customer enquiries" />
        ) : loadError ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <AlertCircle className="text-red-500" size={30} />
            <h2 className="mt-3 font-semibold text-slate-900">
              Could not load leads
            </h2>
            <p className="mt-1 max-w-lg text-sm text-slate-500">{loadError}</p>
            <button
              type="button"
              onClick={loadLeads}
              className="mt-4 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Try again
            </button>
          </div>
        ) : visibleLeads.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <UsersRound className="text-slate-300" size={36} />
            <h2 className="mt-3 font-semibold text-slate-900">
              {leads.length ? "No matching leads" : "No leads yet"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {leads.length
                ? "Try a different search or status filter."
                : "Customer enquiries will appear here when they arrive."}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Lead</th>
                    <th className="px-5 py-4 font-semibold">Enquiry</th>
                    <th className="px-5 py-4 font-semibold">Received</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visibleLeads.map((lead) => (
                    <tr key={lead.id} className="align-top hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">
                          {lead.name}
                        </p>
                        <a
                          href={`mailto:${lead.email}`}
                          className="mt-1 block text-sm text-cyan-700 hover:underline"
                        >
                          {lead.email}
                        </a>
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="mt-1 block text-xs text-slate-500 hover:text-cyan-700"
                          >
                            {lead.phone}
                          </a>
                        )}
                      </td>
                      <td className="max-w-md px-5 py-4">
                        <p className="font-medium text-slate-800">
                          {lead.subject}
                        </p>
                        <p className="mt-1 line-clamp-2 whitespace-pre-wrap text-sm text-slate-500">
                          {lead.message}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            statusStyles[lead.status] || "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {statusOptions.find(
                            (status) => status.value === lead.status,
                          )?.label || lead.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedLead(lead)}
                            aria-label={`View details for ${lead.name}`}
                            title="View lead"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-cyan-300 hover:text-cyan-700"
                          >
                            <Eye size={16} />
                          </button>
                          <a
                            href={`mailto:${lead.email}?subject=${encodeURIComponent(`Re: ${lead.subject}`)}`}
                            aria-label={`Email ${lead.name}`}
                            title="Reply by email"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-cyan-300 hover:text-cyan-700"
                          >
                            <Mail size={16} />
                          </a>
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              aria-label={`Call ${lead.name}`}
                              title="Call lead"
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-cyan-300 hover:text-cyan-700"
                            >
                              <Phone size={16} />
                            </a>
                          )}
                          <label className="sr-only" htmlFor={`status-${lead.id}`}>
                            Update status for {lead.name}
                          </label>
                          <select
                            id={`status-${lead.id}`}
                            value={lead.status}
                            onChange={(event) =>
                              handleStatusChange(lead, event.target.value)
                            }
                            disabled={updatingId === lead.id}
                            className="max-w-32 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-cyan-500 disabled:opacity-50"
                          >
                            {statusOptions.map((status) => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => handleDelete(lead)}
                            disabled={deletingId === lead.id}
                            aria-label={`Delete lead from ${lead.name}`}
                            title="Delete lead"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-red-200 hover:text-red-600 disabled:opacity-50"
                          >
                            {deletingId === lead.id ? (
                              <LoaderCircle
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
              Showing {visibleLeads.length} of {leads.length} leads
            </p>
          </>
        )}
      </section>
      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}
