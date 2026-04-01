import H1 from "@/components/ui/h1";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

const sections = [
  {
    title: "1. Purpose",
    content:
      "Rozgar Hub is intended to serve as a medium of contact and exchange of information for users who have a genuine intention to connect for purposes related to existing job vacancies and career enhancement services.",
  },
  {
    title: "2. Acceptable Use",
    content:
      "The platform and its services are meant for the exclusive use of the registered user. Copying, downloading, recreating, sharing passwords, sublicensing, or sharing in any unauthorized manner is a misuse of the platform. Rozgar Hub reserves the right to take action to protect its interests, including stopping access and claiming damages.",
  },
  {
    title: "3. User Responsibilities",
    content:
      "You are obligated to provide true and correct information. If you create a profile, you undertake to keep the information up to date at all times. Rozgar Hub will not be liable for any inaccuracy of information provided by users. It is your responsibility to verify information found on the site.",
  },
  {
    title: "4. No Guarantee of Responses",
    content:
      "Rozgar Hub cannot monitor the responses that a person may receive in response to information displayed on the site. You are responsible for conducting your own background checks on the genuineness of all responses received.",
  },
  {
    title: "5. Intellectual Property",
    content:
      "You shall not infringe on any intellectual property rights of any person or entity, nor retain or download any information from any computer system with malicious intent. All content on the platform is protected by applicable copyright and intellectual property laws.",
  },
  {
    title: "6. Prohibited Activities",
    items: [
      "Violate any applicable local, state, national or international law",
      "Interfere with or disrupt computer networks connected to Rozgar Hub",
      "Impersonate any other person or entity",
      "Use the platform to gain unauthorized access to other computer systems",
      "Reproduce, copy, modify, sell, or distribute any content for commercial purposes",
      "Use automated means to crawl or scrape content from the platform",
      "Upload or transmit any unsolicited bulk email or spam",
      "Upload any material containing viruses or malicious code",
      "Access the platform for training AI/ML models without written permission",
    ],
  },
  {
    title: "7. Privacy & Data",
    content:
      "Rozgar Hub does not share personally identifiable data with other companies without obtaining permission, except with those acting as our agents or in response to legal process such as court orders. We use your data and information to make relevant suggestions and recommendations.",
  },
  {
    title: "8. Limitation of Liability",
    content:
      "Rozgar Hub does not warrant that the website is free of operational errors, viruses, or other harmful components. Rozgar Hub shall not be liable for any loss or damage sustained by reason of any disclosure of information or any error, omission, or inaccuracy with respect to any information disclosed.",
  },
  {
    title: "9. Third-Party Links",
    content:
      "The platform may contain links to third-party websites. These links are provided solely as a convenience. The presence of these links should not be considered as an endorsement of their contents. You access these websites at your own risk.",
  },
  {
    title: "10. Modifications",
    content:
      "Rozgar Hub reserves the right to amend, alter, or change all or any terms of agreement at any time without prior notice. Continued use of the platform after changes constitutes acceptance of the modified terms.",
  },
  {
    title: "11. Governing Law",
    content:
      "These Terms and Conditions regulate the usage of Rozgar Hub. Any person using the platform in violation of these terms shall render themselves liable to appropriate action in a court of law, both civil and criminal. The laws of India shall govern these terms.",
  },
];

export default function TermsPage() {
  return (
    <main className="m-auto my-10 max-w-4xl space-y-8 px-4 min-h-full">
      <div className="space-y-3 text-center">
        <H1>Terms of Service</H1>
        <p className="text-sm text-gray-500">
          Last updated: January 2025
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-8 text-sm leading-relaxed text-gray-600">
          Welcome to Rozgar Hub. By accessing or using our platform, you agree
          to be bound by these Terms of Service. Please read them carefully
          before using our services.
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
            If you have any questions about these Terms of Service, please{" "}
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
