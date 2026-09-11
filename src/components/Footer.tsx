import { site } from "../site.config";
import { RollingText } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-line px-4 sm:px-8 lg:px-16 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a href="#top" className="inline-block text-base sm:text-sm font-semibold tracking-tight text-paper">
              <RollingText text={site.name} />
              <span className="text-faint"> — {site.role}</span>
            </a>
            <p className="mt-1 font-mono text-xs text-faint">
              {site.location}
            </p>
          </div>

          <nav aria-label="footer" className="flex flex-wrap gap-x-6 gap-y-2.5 sm:gap-x-7 sm:gap-y-3">
            <a href={site.whatsappLink} target="_blank" rel="noopener noreferrer" className="font-mono text-sm sm:text-[13px] text-mute transition-colors hover:text-paper py-1">
              whatsapp
            </a>
            <a href={`mailto:${site.email}`} className="font-mono text-sm sm:text-[13px] text-mute transition-colors hover:text-paper py-1">
              email
            </a>
            <a href={site.fiverrUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm sm:text-[13px] text-mute transition-colors hover:text-paper py-1">
              fiverr
            </a>
            {site.githubUrl && (
              <a href={site.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm sm:text-[13px] text-mute transition-colors hover:text-paper py-1">
                github
              </a>
            )}
            {site.linkedinUrl && (
              <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm sm:text-[13px] text-mute transition-colors hover:text-paper py-1">
                linkedin
              </a>
            )}
            <a href="#contact" className="font-mono text-sm sm:text-[13px] text-mute transition-colors hover:text-paper py-1">
              contact
            </a>
          </nav>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>designed & built from scratch — no template</span>
        </div>
      </div>
    </footer>
  );
}
