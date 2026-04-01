import H1 from "@/components/ui/h1";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const sections = [
  {
    title: "1. Introduction",
    content:
      'We at Rozgar Hub are committed to respecting your online privacy and recognize the need for appropriate protection and management of any personally identifiable information you share with us. This Privacy Policy describes how Rozgar Hub collects, uses, discloses and transfers personal information of users through its website and applications (collectively, the "Platform").',
  },
  {
    title: "2. Information We Collect",
    items: [
      "Name, email address, and password when you create an account",
      "Information included in your resume — contact details, work experience, educational qualifications, skills, and salary information",
      "Information about how you use our services, including log data and location information",
      "Data collected through cookies and similar tracking technologies",
      "Information you provide when filling out forms, surveys, or contacting us",
      "Device information and technical data when accessing the platform",
      "Social media account information if you choose to sign in via a social provider (Google, GitHub)",
    ],
  },
  {
    title: "3. How We Use Your Information",
    items: [
      "Providing our services including job alerts, search results, and recommended jobs",
      "Matching your profile with relevant job opportunities",
      "Sending email notifications about application status updates",
      "Protecting our users and providing customer support",
      "Improving the platform and its content through analytics",
      "Sending information about our services for marketing purposes (with your consent)",
      "Preventing fraud and ensuring compliance with applicable laws",
    ],
  },
  {
    title: "4. Resume & Skills Data",
    content:
      "When you upload your resume, we parse the document to extract skills, experience, and other relevant information. This data is used to provide personalized job recommendations and to share with employers when you apply for jobs. Your resume file and extracted data are stored securely and only shared with employers for positions you explicitly apply to.",
  },
  {
    title: "5. Cookies & Tracking",
    content:
      'We use cookies and similar tracking technologies to collect information about website activity, improve user experience, and analyze trends. You can control cookies through your browser settings. Note that disabling cookies may affect some features of the platform. We use cookies to remember your preferences, maintain your session, and provide relevant content.',
  },
  {
    title: "6. Information Sharing",
    content:
      "We do not sell your personal information. We may share your information with:",
    items: [
      "Employers — only when you explicitly apply for a job (your resume, cover letter, and profile information)",
      "Service providers who help us operate the platform (hosting, email delivery, analytics)",
      "Legal authorities when required by law, court order, or to protect our rights",
      "In connection with a merger, acquisition, or sale of business assets",
    ],
  },
  {
    title: "7. Data Security",
    content:
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encrypted connections (HTTPS), secure password hashing, and access controls. However, no method of transmission over the internet is 100% secure.",
  },
  {
    title: "8. Your Rights",
    items: [
      "Access your personal information and request a copy of your data",
      "Rectify or update inaccurate personal information",
      "Delete your account and associated data",
      "Restrict or object to certain processing of your data",
      "Withdraw consent at any time for consent-based processing",
      "Data portability — receive your data in a structured, commonly used format",
    ],
  },
  {
    title: "9. Data Retention",
    content:
      "Your personal information is retained only as long as necessary for the purposes for which it was collected, or as required by applicable laws. When you delete your account, your personal data is removed from our active databases. Some information may be retained in backups for a limited period.",
  },
  {
    title: "10. Children",
    content:
      "Our platform is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If you are under 18, you must use the platform under the supervision of a parent or legal guardian.",
  },
  {
    title: "11. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. When we make changes, we will update the \"Last updated\" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="m-auto my-10 max-w-4xl space-y-8 px-4 min-h-full">
      <div className="space-y-3 text-center">
        <H1>Privacy Policy</H1>
        <p className="text-sm text-gray-500">
          Last updated: January 2025
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-8 text-sm leading-relaxed text-gray-600">
          Your privacy is important to us. This Privacy Policy explains how
          Rozgar Hub collects, uses, and protects your personal information when
          you use our platform.
        </p>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-2 text-base font-semibold text-gray-900">
                {section.title}
              </h2>
              {section.content && (
                <p className="text-sm leading-relaxed text-gray-600">
                  {section.content}
                </p>
              )}
              {section.items && (
                <ul className="mt-2 space-y-1.5 pl-5">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="list-disc text-sm leading-relaxed text-gray-600"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">
            If you have questions about this Privacy Policy, please{" "}
            <a href="/contact" className="font-medium text-gray-900 hover:underline">
              contact us
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
