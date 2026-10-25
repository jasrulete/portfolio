import { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { profile } from "../data/profile";
import SectionHeading from "./section-heading";

/** Web3Forms free plan requires this site key — not your personal hCaptcha key. */
const WEB3FORMS_HCAPTCHA_SITE_KEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";
/** Optional override only if you use a custom key on a Web3Forms paid plan. */
const HCAPTCHA_SITE_KEY =
  import.meta.env.VITE_HCAPTCHA_SITE_KEY || WEB3FORMS_HCAPTCHA_SITE_KEY;
const formConfigured = Boolean(WEB3FORMS_ACCESS_KEY);

type FormFields = {
  name: string;
  email: string;
  message: string;
  /**
   * Optional and never blocking. It is the whole measurement plan: the site
   * has no analytics, and which channel produced an enquiry is the one thing
   * a page-view counter could not answer anyway.
   */
  source: string;
};

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    message: "",
    source: "",
  });
  const [result, setResult] = useState<React.ReactNode>("");
  // Status drives the colour of the result line. Deriving it from the message
  // text ("sent") painted "Sending..." in error red.
  const [status, setStatus] = useState<Status>("idle");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  // hCaptcha is the largest third-party payload on the page and most visitors
  // never reach this form, so the widget mounts only once someone actually
  // starts filling it in — first focus or first keystroke, whichever comes
  // first.
  const [captchaArmed, setCaptchaArmed] = useState(false);
  const [captchaCompact, setCaptchaCompact] = useState(false);
  const captchaRef = useRef<HCaptcha>(null);
  const isSubmitting = status === "sending";

  const armCaptcha = () => {
    if (captchaArmed) return;
    // The standard widget is 303px wide and overflows the column below ~335px.
    // Read once, here, because changing size after mount means re-rendering
    // the challenge anyway.
    setCaptchaCompact(window.matchMedia("(max-width: 399px)").matches);
    setCaptchaArmed(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    armCaptcha();
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Ad blockers and corporate proxies block hCaptcha outright. Without this
  // the form is simply unusable with no explanation and no way out.
  const handleCaptchaError = () => {
    setStatus("error");
    setResult(
      <>
        The CAPTCHA could not load. It may be blocked on this network. Email me
        at{" "}
        <a
          href={`mailto:${profile.formEmail}`}
          className="rounded-sm underline underline-offset-4 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          {profile.formEmail}
        </a>{" "}
        instead.
      </>
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!formConfigured) {
      setStatus("error");
      setResult(
        `Form is not configured on this deployment. Please email me at ${profile.formEmail} directly.`
      );
      return;
    }

    if (!captchaToken) {
      setStatus("error");
      setResult("Please verify the CAPTCHA.");
      return;
    }

    setStatus("sending");
    setResult("Sending...");

    // Strip control characters before the name goes into a header field —
    // maxLength on the input doesn't stop a pasted/scripted \r\n.
    const safeName = formData.name.replace(/[\r\n]+/g, " ").slice(0, 100);

    const formPayload = new FormData();
    formPayload.append("access_key", WEB3FORMS_ACCESS_KEY);
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("message", formData.message);
    formPayload.append("source", formData.source);
    formPayload.append("subject", `Portfolio message from ${safeName}`);
    formPayload.append("from_name", formData.name);
    formPayload.append("replyto", formData.email);
    formPayload.append("h-captcha-response", captchaToken);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setResult("Message sent! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "", source: "" });
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
      } else {
        setStatus("error");
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
      setResult(
        `Could not send. Please email me at ${profile.formEmail} directly.`
      );
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 border-t border-line"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Contact" />

        <ContactGrid
          formData={formData}
          result={result}
          status={status}
          formConfigured={formConfigured}
          isSubmitting={isSubmitting}
          captchaRef={captchaRef}
          captchaArmed={captchaArmed}
          captchaCompact={captchaCompact}
          onFieldActivity={armCaptcha}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCaptchaVerify={(token) => setCaptchaToken(token || null)}
          onCaptchaError={handleCaptchaError}
        />
      </div>
    </section>
  );
}

function ContactGrid({
  formData,
  result,
  status,
  formConfigured,
  isSubmitting,
  captchaRef,
  captchaArmed,
  captchaCompact,
  onFieldActivity,
  onChange,
  onSubmit,
  onCaptchaVerify,
  onCaptchaError,
}: {
  formData: FormFields;
  result: React.ReactNode;
  status: Status;
  formConfigured: boolean;
  isSubmitting: boolean;
  captchaRef: React.RefObject<HCaptcha | null>;
  captchaArmed: boolean;
  captchaCompact: boolean;
  onFieldActivity: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCaptchaVerify: (token: string) => void;
  onCaptchaError: () => void;
}) {
  // green-800, not green-600: on the gray-50 page surface green-600 measures
  // ≈3.15:1, under the 4.5:1 floor this site publishes for itself. green-800
  // is 6.82:1; dark mode keeps green-400 at 10.19:1 on gray-900.
  const statusClass =
    status === "success"
      ? "text-green-800 dark:text-green-400"
      : status === "sending"
        ? "text-muted"
        : "text-red-600 dark:text-red-400";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
      <ContactInfo />

      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          label="Name"
          id="name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={onChange}
          onFocus={onFieldActivity}
          required
          maxLength={100}
        />
        <FormField
          label="Your email"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={onChange}
          onFocus={onFieldActivity}
          required
        />
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={onChange}
            onFocus={onFieldActivity}
            required
            rows={5}
            placeholder="Write your message here..."
            className="w-full px-4 py-2.5 border border-muted rounded-md bg-surface text-ink focus:outline-hidden focus:ring-2 focus:ring-focus"
          />
        </div>

        {/* Not required, not validated, and an empty value still submits. */}
        <FormField
          label="How did you find me? (optional)"
          id="source"
          name="source"
          value={formData.source}
          onChange={onChange}
          onFocus={onFieldActivity}
        />

        {formConfigured ? (
          captchaArmed && (
            <HCaptcha
              sitekey={HCAPTCHA_SITE_KEY}
              size={captchaCompact ? "compact" : "normal"}
              reCaptchaCompat={false}
              onVerify={onCaptchaVerify}
              onExpire={() => onCaptchaVerify("")}
              onError={onCaptchaError}
              ref={captchaRef}
            />
          )
        ) : (
          <p className="text-sm text-red-600 dark:text-red-400">
            Contact form requires environment setup on this host. Use the email
            address on the left.
          </p>
        )}

        <button
          type="submit"
          disabled={!formConfigured || isSubmitting}
          className="inline-flex items-center px-5 py-3 text-sm font-semibold rounded-md text-on-accent bg-accent-fill hover:opacity-90 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas transition-opacity duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {result && (
          <p role="status" className={`mt-4 text-sm ${statusClass}`}>
            {result}
          </p>
        )}
      </form>
    </div>
  );
}

function ContactInfo() {
  const emails = [{ label: "Personal", address: profile.personalEmail }];

  return (
    <div>
      <h3 className="text-xl font-semibold tracking-tight mb-6 text-ink">Contact information</h3>
      <div className="space-y-6">
        <div className="flex items-start">
          <MailIcon />
          <div>
            <h4 className="text-lg font-medium">Email</h4>
            <ul className="space-y-1 mt-1">
              {emails.map(({ label, address }) => (
                <li key={address}>
                  <a
                    href={`mailto:${address}`}
                    className="rounded-sm text-muted hover:text-accent transition-colors duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                  >
                    <span className="text-xs text-muted mr-2">
                      {label}:
                    </span>
                    {address}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ContactRow
          icon={<PhoneIcon />}
          title="Phone"
          content={
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="rounded-sm text-muted hover:text-accent transition-colors duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              {profile.phone}
            </a>
          }
        />

        <ContactRow
          icon={<LocationIcon />}
          title="Location"
          content={
            <p className="text-muted">{profile.location}</p>
          }
        />
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div className="flex items-start">
      <div className="mr-4 mt-1 text-accent shrink-0">{icon}</div>
      <div>
        <h4 className="text-lg font-medium">{title}</h4>
        {content}
      </div>
    </div>
  );
}

function FormField({
  label,
  id,
  name,
  value,
  onChange,
  onFocus,
  type = "text",
  autoComplete,
  required,
  maxLength,
}: {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        autoComplete={autoComplete}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        required={required}
        className="w-full px-4 py-2.5 border border-muted rounded-md bg-surface text-ink focus:outline-hidden focus:ring-2 focus:ring-focus"
      />
    </div>
  );
}

function MailIcon() {
  return (
    <svg className="h-6 w-6 text-accent mr-4 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
