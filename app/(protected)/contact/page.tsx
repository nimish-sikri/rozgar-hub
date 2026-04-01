"use client";

import React, { useState } from "react";
import ContactForm from "@/components/contactForm/ContactFormWrapper";
import H1 from "@/components/ui/h1";
import { Mail, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { ImGithub, ImLinkedin2, ImTwitter } from "react-icons/im";

const faqs = [
  {
    q: "How do I post a job?",
    a: "Sign up as an Employer, then click \"Post a Job\" in the navigation bar. Fill in the job details and submit. Your listing will be reviewed and approved by our admin team.",
  },
  {
    q: "How long does job approval take?",
    a: "Most job postings are reviewed and approved within 24 hours. You'll see your listing go live once approved.",
  },
  {
    q: "How do I upload my resume?",
    a: "As a Job Seeker, click \"Upload Resume\" in the navbar. Upload a PDF file and we'll automatically parse your skills to recommend matching jobs.",
  },
  {
    q: "Can I edit my application after submitting?",
    a: "Currently, applications cannot be edited after submission. Make sure to review your cover letter before submitting.",
  },
  {
    q: "How does job matching work?",
    a: "We extract skills from your resume and match them against job descriptions. Jobs are ranked by the number of matching skills and your experience level.",
  },
  {
    q: "Is Rozgar Hub free to use?",
    a: "Yes! Rozgar Hub is completely free for both job seekers and employers.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
      >
        {q}
        {open ? (
          <ChevronUp size={16} className="shrink-0 text-gray-400" />
        ) : (
          <ChevronDown size={16} className="shrink-0 text-gray-400" />
        )}
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed text-gray-500 animate-fade-in-up">
          {a}
        </p>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="m-auto my-10 max-w-6xl space-y-12 px-4 min-h-full">
      {/* Header */}
      <div className="space-y-3 text-center">
        <H1>Contact Us</H1>
        <p className="mx-auto max-w-lg text-gray-500">
          Have a question or need help? We&apos;d love to hear from you.
          Reach out and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      {/* Info cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <Mail size={18} className="text-gray-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Email Us</h3>
            <p className="mt-1 text-sm text-gray-500">nimishsikri02@gmail.com</p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <MapPin size={18} className="text-gray-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Location</h3>
            <p className="mt-1 text-sm text-gray-500">Bengaluru, India</p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <Clock size={18} className="text-gray-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Response Time</h3>
            <p className="mt-1 text-sm text-gray-500">Within 24 hours</p>
          </div>
        </div>
      </div>

      {/* Split layout: Form + FAQ */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Form */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-semibold text-gray-900">
            Send us a message
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Fill out the form and we&apos;ll get back to you shortly.
          </p>
          <ContactForm />
        </div>

        {/* FAQ */}
        <div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div>
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Connect with us
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/nimish-sikri-661635125/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                <ImLinkedin2 size={16} />
              </a>
              <a
                href="https://www.github.com/nimish-sikri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                <ImGithub size={16} />
              </a>
              <a
                href="https://twitter.com/Nimish161202"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                <ImTwitter size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
