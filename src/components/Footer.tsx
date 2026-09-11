import { site } from "../site.config";
import { RollingText } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 sm:px-10 lg:px-16 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a href="#top" className="inline-block text-sm font-semibold tracking-tight text-paper">
              <RollingText text={site.name} />
              <span className="text-faint"> — {site.role}</span>
            </a>
            <p className="mt-1.5 font-mono text-xs text-faint">
              {site.location}
            </p>
          </div>

          <nav aria-label="footer" className="flex flex-wrap gap-x-7 gap-y-3">
            <a href={site.whatsappLink} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-mute transition-colors hover:text-paper">
              whatsapp
            </a>
            <a href={`mailto:${site.email}`} className="font-mono text-[13px] text-mute transition-colors hover:text-paper">
              email
            </a>
            <a href={site.fiverrUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-mute transition-colors hover:text-paper">
              fiverr
            </a>
            {site.githubUrl && (
              <a href={site.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-mute transition-colors hover:text-paper">
                github
              </a>
            )}
            {site.linkedinUrl && (
              <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-mute transition-colors hover:text-paper">
                linkedin
              </a>
            )}
            <a href="#contact" className="font-mono text-[13px] text-mute transition-colors hover:text-paper">
              contact
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>designed & built from scratch — no template</span>
        </div>
      </div>
    </footer>
  );
}
