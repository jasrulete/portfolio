import { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { profile } from "../data/profile";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";
const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY ?? "";
const formConfigured = Boolean(WEB3FORMS_ACCESS_KEY && HCAPTCHA_SITE_KEY);

type FormFields = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    message: "",
  });
  const [result, setResult] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formConfigured) {
      setResult(
        `Form is not configured on this deployment. Please email me at ${profile.formEmail} directly.`
      );
      return;
    }

    if (!captchaToken) {
      setResult("Please verify the CAPTCHA.");
      return;
    }

    setResult("Sending...");

    const formPayload = new FormData();
    formPayload.append("access_key", WEB3FORMS_ACCESS_KEY);
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("message", formData.message);
    formPayload.append("subject", `Portfolio message from ${formData.name}`);
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
        setResult("Message sent! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
      } else {
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setResult(
        `Could not send. Please email me at ${profile.formEmail} directly.`
      );
    }
  };

  const isSuccess = result.includes("sent");

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Get In Touch" />

        <ContactGrid
          formData={formData}
          result={result}
          isSuccess={isSuccess}
          formConfigured={formConfigured}
          captchaRef={captchaRef}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCaptchaVerify={(token) => setCaptchaToken(token || null)}
        />
      </div>
    </section>
  );
}

function ContactGrid({
  formData,
  result,
  isSuccess,
  formConfigured,
  captchaRef,
  onChange,
  onSubmit,
  onCaptchaVerify,
}: {
  formData: FormFields;
  result: string;
  isSuccess: boolean;
  formConfigured: boolean;
  captchaRef: React.RefObject<HCaptcha | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCaptchaVerify: (token: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <ScrollReveal direction="left">
        <ContactInfo />
      </ScrollReveal>

      <ScrollReveal direction="right" delay={150}>
        <form onSubmit={onSubmit} className="space-y-6">
          <FormField
            label="Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
          <FormField
            label="Your email"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
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
              required
              rows={5}
              placeholder="Write your message here..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {formConfigured ? (
            <HCaptcha
              sitekey={HCAPTCHA_SITE_KEY}
              onVerify={onCaptchaVerify}
              onExpire={() => onCaptchaVerify("")}
              ref={captchaRef}
            />
          ) : (
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Contact form requires environment setup on this host. Use the email
              addresses on the left.
            </p>
          )}

          <button
            type="submit"
            disabled={!formConfigured}
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Send Message
          </button>

          {result && (
            <p
              role="status"
              className={`mt-4 text-sm ${isSuccess ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {result}
            </p>
          )}
        </form>
      </ScrollReveal>
    </div>
  );
}

function ContactInfo() {
  const emails = [
    { label: "Personal", address: profile.personalEmail },
    { label: "School", address: profile.email },
  ];

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
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
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    <span className="text-xs text-gray-400 dark:text-gray-500 mr-2">
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
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
            >
              {profile.phone}
            </a>
          }
        />

        <ContactRow
          icon={<LocationIcon />}
          title="Location"
          content={
            <p className="text-gray-600 dark:text-gray-300">{profile.location}</p>
          }
        />
      </div>

      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        Messages from the form are delivered to{" "}
        <a
          href={`mailto:${profile.formEmail}`}
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          {profile.formEmail}
        </a>
        . You can reply directly to visitors from your inbox.
      </p>
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
      <div className="mr-4 mt-1 text-blue-500 shrink-0">{icon}</div>
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
  type = "text",
  required,
}: {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
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
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function MailIcon() {
  return (
    <svg className="h-6 w-6 text-blue-500 mr-4 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
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
