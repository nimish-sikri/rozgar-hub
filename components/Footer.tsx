import Link from "next/link";
import { ImGithub, ImLinkedin2, ImTwitter } from "react-icons/im";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Rozgar Hub</h3>
            <p className="text-sm leading-relaxed text-gray-500">
              Connecting talented professionals with top companies. Your next
              career opportunity is just a click away.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/nimish-sikri-661635125/"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImLinkedin2 size={15} />
              </a>
              <a
                href="https://www.github.com/nimish-sikri"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImGithub size={15} />
              </a>
              <a
                href="https://twitter.com/Nimish161202"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImTwitter size={15} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/home"
                  className="text-gray-500 transition-colors hover:text-gray-900"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/saved-jobs"
                  className="text-gray-500 transition-colors hover:text-gray-900"
                >
                  Saved Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 transition-colors hover:text-gray-900"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 transition-colors hover:text-gray-900"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-500 transition-colors hover:text-gray-900"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-500 transition-colors hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Rozgar Hub, Inc. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
