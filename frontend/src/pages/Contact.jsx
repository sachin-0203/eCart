import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, MessageSquareText } from "lucide-react";
import { toast } from "sonner";
import { createLead } from "../features/admin/api/leadsApi";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);

    try {
      await createLead({
        name: formData.get("name").trim(),
        email: formData.get("email").trim(),
        phone: formData.get("phone").trim(),
        subject: formData.get("subject").trim(),
        message: formData.get("message").trim(),
      });
      form.reset();
      setSubmitted(true);
      toast.success("Your message has been sent.");
    } catch (error) {
      toast.error(error.message || "Your message could not be sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-slate-50 px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] bg-primary px-7 py-10 text-white sm:px-12 sm:py-14">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-white/65">
            <span className="h-px w-7 bg-secondary" />
            Here to help
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s talk.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            Questions about a product or an order? Send us a message and our
            team will get back to you.
          </p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
              <MessageSquareText size={22} />
            </span>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
              How can we help?
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Send your question through the form. For order-related requests,
              include your order number and the email address used at checkout
              so we can understand the details.
            </p>
            <div className="mt-7 flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
              <Mail className="mt-0.5 shrink-0 text-secondary" size={18} />
              <p className="text-sm leading-6 text-slate-600">
                We&apos;ll use the email address you provide to follow up about
                your message.
              </p>
            </div>
          </aside>

          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            {submitted && (
              <div
                role="status"
                className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800"
              >
                <CheckCircle2 size={19} />
                Thanks for reaching out. Your message is with our team.
              </div>
            )}
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Send us a message
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fields marked with * are required.
            </p>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Your name *
                  <input
                    required
                    maxLength={100}
                    autoComplete="name"
                    name="name"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="Name"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Email address *
                  <input
                    required
                    type="email"
                    maxLength={254}
                    autoComplete="email"
                    name="email"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Phone number <span className="font-normal text-slate-400">(optional)</span>
                  <input
                    type="tel"
                    maxLength={15}
                    autoComplete="tel"
                    name="phone"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="Your phone number"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Subject *
                  <input
                    required
                    maxLength={100}
                    name="subject"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="What can we help with?"
                  />
                </label>
              </div>
              <label className="block text-sm font-semibold text-slate-700">
                Message *
                <textarea
                  required
                  maxLength={5000}
                  rows={5}
                  name="message"
                  className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="Share a few details so we can help."
                />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send message"}
                {!isSubmitting && <ArrowRight size={16} />}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Contact;
