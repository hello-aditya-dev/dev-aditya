"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_LOCATION, GITHUB_URL, GITHUB_HANDLE } from "@/config/contact";
import { PROJECT_TYPES } from "@/lib/schemas/contact";

const directContact = [
  { label: "Email", value: CONTACT_EMAIL, href: CONTACT_EMAIL_HREF, external: false },
  { label: "Location", value: CONTACT_LOCATION, href: undefined, external: false },
  { label: "GitHub", value: `@${GITHUB_HANDLE}`, href: GITHUB_URL, external: true },
];

const inputClass =
  "w-full rounded-lg border-1.5 border-ink bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 focus:border-coral focus:outline-none transition-colors";

const initialFormData = {
  name: "",
  email: "",
  company: "",
  website: "",
  projectType: "",
  scope: "",
  timing: "",
  details: "",
  _honey: "",
  consent: false,
};

type Status = "idle" | "loading" | "success" | "error";

export function ContactContent() {
  const [formData, setFormData] = React.useState(initialFormData);
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = React.useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) e.email = "Work email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Please enter a valid email.";
    if (!formData.details.trim())
      e.details = "A short description of the project is required.";
    if (!formData.consent) e.consent = "Please accept the consent.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          website: formData.website,
          projectType: formData.projectType,
          scope: formData.scope,
          timing: formData.timing,
          details: formData.details,
          _honey: formData._honey,
          consent: formData.consent,
        }),
      });
      const data = await res.json();
      setServerMessage(typeof data.message === "string" ? data.message : "");
      if (data.success) {
        setStatus("success");
        setFormData(initialFormData);
      } else {
        setStatus("error");
      }
    } catch {
      setServerMessage("");
      setStatus("error");
    }
  };

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <Container>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
            Tell me what the website needs to achieve.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Share the company, current website, project goal and expected timing.
            I'll review the requirements and reply with the most practical next
            step.
          </p>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-white pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:gap-14">
            <Reveal>
              <div>
                <h2 className="text-lg font-bold tracking-tight">Direct contact</h2>
                <div className="mt-6 space-y-5">
                  {directContact.map((item) => (
                    <div key={item.label}>
                      <p className="micro-label text-ink-muted">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          {...(item.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="mt-1 block text-sm font-bold tracking-tight text-ink hover:text-coral"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-bold tracking-tight">{item.value}</p>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-8 border-t border-ink/15 pt-5 text-sm leading-relaxed text-ink-muted">
                  Typical response time: within 1–2 business days.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {status === "success" ? (
                <Card className="p-8" shadow>
                  <div className="flex items-start gap-3">
                    <span
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral text-white"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <div>
                      <p className="text-xl font-bold tracking-tight">Message sent.</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {serverMessage ||
                          "Thanks — I'll review the requirements and reply within 1–2 business days."}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setStatus("idle");
                          setServerMessage("");
                        }}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold tracking-tight text-coral"
                      >
                        Send another enquiry
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Name"
                      required
                      error={errors.name}
                      htmlFor="name"
                    >
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClass}
                        autoComplete="name"
                      />
                    </Field>
                    <Field
                      label="Work email"
                      required
                      error={errors.email}
                      htmlFor="email"
                    >
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={inputClass}
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Company" htmlFor="company">
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name"
                        className={inputClass}
                        autoComplete="organization"
                      />
                    </Field>
                    <Field label="Current website" htmlFor="website">
                      <input
                        id="website"
                        name="website"
                        type="text"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://"
                        className={inputClass}
                        autoComplete="url"
                      />
                    </Field>
                    <Field label="Project type" htmlFor="projectType">
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select one</option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Approximate scope" htmlFor="scope">
                      <input
                        id="scope"
                        name="scope"
                        type="text"
                        value={formData.scope}
                        onChange={handleChange}
                        placeholder="e.g. 6-page corporate site"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field label="Target launch timing" htmlFor="timing">
                    <input
                      id="timing"
                      name="timing"
                      type="text"
                      value={formData.timing}
                      onChange={handleChange}
                      placeholder="e.g. within the next quarter"
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    label="Project details"
                    required
                    error={errors.details}
                    htmlFor="details"
                    hint={`${formData.details.length} / 2000`}
                  >
                    <textarea
                      id="details"
                      name="details"
                      required
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="What the website needs to achieve, and what is not working today..."
                      maxLength={2000}
                      className={`${inputClass} min-h-[140px] resize-y`}
                    />
                  </Field>

                  {/* Honeypot — hidden from users, visible to bots */}
                  <div style={{ display: "none" }} aria-hidden="true">
                    <label htmlFor="_honey">Do not fill this</label>
                    <input
                      id="_honey"
                      name="_honey"
                      type="text"
                      value={formData._honey}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-coral"
                      />
                      <span className="text-sm leading-relaxed text-ink-muted">
                        I'm okay with Aditya reading this enquiry and replying by
                        email. No spam.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1 text-xs text-coral">{errors.consent}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border-1.5 border-ink bg-coral px-7 py-3.5 text-base font-medium tracking-tight text-white shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                    >
                      {status === "loading" ? "Sending…" : "Send enquiry →"}
                    </button>
                    {status === "error" && (
                      <p className="text-sm text-coral" role="alert">
                        {serverMessage || "Something went wrong. Please try again."}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={htmlFor} className="micro-label text-ink-muted">
          {label}
          {required && <span className="ml-1 text-coral">*</span>}
        </label>
        {hint && <span className="text-xs text-ink-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="mt-1 text-xs text-coral" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
