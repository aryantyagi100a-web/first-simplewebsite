import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { featuredProjects, site } from "../site.config";
import { Magnetic, WhatsAppIcon } from "./ui";
import { ExternalLink, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ConceptShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const activeProject = featuredProjects[activeIdx] || featuredProjects[0];

  const waBookingMessage = encodeURIComponent(
    `Hi ${activeProject.title.split("—")[0].trim()}, I'd like to ask a quick question / book an inquiry!`
  );
  const waUrl = `https://wa.me/${site.whatsapp}?text=${waBookingMessage}`;

  return (
    <section id="work" className="scroll-mt-10 px-6 sm:px-10 lg:px-16 py-24 sm:py-28">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs sm:text-[13px] text-faint">[ featured work & live demos ]</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight lowercase text-paper">
              working websites built for businesses
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-mute">
            <span className="h-2 w-2 rounded-full bg-live" />
            <span>4 working live demos</span>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-base text-mute leading-relaxed font-normal">
          every demo below is a fully functional, mobile-first website designed to turn visitors into paying customers. click any project to test its live flow or open the full experience.
        </p>

        {/* Project Selector Tabs */}
        <div className="mt-10 flex flex-wrap items-center gap-2 sm:gap-3">
          {featuredProjects.map((p, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setExpanded(false);
                }}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-paper text-ink font-semibold shadow-md scale-[1.02]"
                    : "bg-surface border border-line text-mute hover:text-paper hover:border-white/30"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: isSelected ? "#156338" : p.accent }}
                />
                <span className="capitalize">{p.title.split("—")[0].trim()}</span>
                <span className={`text-[11px] font-mono hidden md:inline ${isSelected ? "text-ink/70" : "text-faint"}`}>
                  · {p.category.split("&")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Project Meta Banner */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-faint bg-surface/40 p-4 rounded-2xl border border-line">
          <div className="flex items-center gap-2 text-mute">
            <span className="font-semibold text-paper capitalize text-sm">{activeProject.title}</span>
            <span>—</span>
            <span className="capitalize">{activeProject.category}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/demo/${activeProject.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-paper hover:underline font-semibold"
            >
              <span>open full site in new tab</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Browser Mockup Frame with Live Clickable Preview */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl transition-all">
          {/* Browser Chrome Header */}
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 sm:px-6 py-3.5 bg-raised/50">
            <div className="flex items-center gap-2" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-red-400/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80 inline-block" />
            </div>

            {/* Address Bar — Clickable link to full demo */}
            <Link
              to={`/demo/${activeProject.id}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Click to open full website"
              className="group flex-1 max-w-lg mx-2 flex items-center justify-center gap-2 rounded-xl bg-surface px-4 py-1.5 text-center font-mono text-xs text-mute border border-line hover:border-white/40 hover:text-paper transition-all"
            >
              <span className="text-emerald-400">🔒</span>
              <span className="truncate">https://{activeProject.domain}</span>
              <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Action button on right */}
            <Link
              to={`/demo/${activeProject.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-1.5 text-xs font-semibold text-ink hover:opacity-90 transition-opacity shadow-sm"
            >
              <span>Open Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Simulated Active Website Inside Frame */}
          <div className="bg-white text-neutral-900 transition-all">
            {/* Demo Site Navbar */}
            <div className="flex items-center justify-between px-6 sm:px-10 pt-6 text-[13px] border-b border-neutral-100 pb-4">
              <span className="font-bold tracking-tight text-neutral-900 capitalize text-base">
                {activeProject.title.split("—")[0]}
              </span>
              <span className="hidden sm:block text-neutral-500 font-mono text-xs lowercase">
                {activeProject.badge}
              </span>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 px-3.5 py-1.5 text-[11px] font-medium text-white transition-all shadow-sm"
              >
                <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-400" />
                <span>book on whatsapp</span>
              </a>
            </div>

            {/* Demo Site Hero Body */}
            <div className="px-6 sm:px-10 py-10 sm:py-14 space-y-8">
              <div>
                <span className="inline-block rounded-full bg-neutral-100 border border-neutral-200 px-3 py-1 font-mono text-[11px] text-neutral-700 mb-3">
                  {activeProject.category}
                </span>
                <p className="text-2xl sm:text-4xl font-bold tracking-tight lowercase leading-tight max-w-xl text-neutral-900">
                  {activeProject.headline}
                </p>
                <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-lg">
                  {activeProject.subhead}
                </p>
              </div>

              {/* Services & Price Ledger */}
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  // offerings & rates
                </p>
                <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
                  {activeProject.menu.map((row) => (
                    <li
                      key={row.item}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between py-3.5 text-[15px] gap-1"
                    >
                      <div>
                        <span className="text-neutral-800 font-medium capitalize">{row.item}</span>
                        {row.detail && (
                          <p className="text-xs text-neutral-500">{row.detail}</p>
                        )}
                      </div>
                      <span className="font-mono text-sm font-semibold text-neutral-900 shrink-0">
                        {row.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Thematic Gallery Strip */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3" aria-hidden>
                {[
                  "from-neutral-200 to-neutral-100",
                  "from-neutral-100 to-neutral-300",
                  "from-neutral-300 to-neutral-200",
                ].map((g, i) => (
                  <div
                    key={i}
                    className={`h-16 sm:h-24 rounded-xl bg-gradient-to-br ${g} flex items-end p-2 sm:p-3 border border-neutral-200/60`}
                  >
                    <span className="font-mono text-[10px] text-neutral-500 uppercase">
                      preview 0{i + 1}
                    </span>
                  </div>
                ))}
              </div>

              {/* Reviews + Hours Footer */}
              <div className="grid gap-6 sm:grid-cols-2 pt-2">
                <div className="space-y-3">
                  {activeProject.reviews.map((r, i) => (
                    <div key={i} className="rounded-xl bg-neutral-50 p-3.5 border border-neutral-200/70 text-sm">
                      <div className="text-amber-500 text-xs mb-1" aria-label={`${r.stars} stars`}>
                        {"★".repeat(r.stars)}
                      </div>
                      <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed italic">
                        “{r.text}”
                      </p>
                      <p className="font-mono text-[11px] text-neutral-400 mt-1 font-medium">
                        — {r.author}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-neutral-900 p-5 sm:p-6 text-white flex flex-col justify-between space-y-4">
                  <div>
                    <p className="font-mono text-xs text-emerald-400 uppercase tracking-wider">
                      Business Hours & Inquiries
                    </p>
                    <p className="mt-1.5 text-sm sm:text-base font-bold text-white">
                      {activeProject.badge}
                    </p>
                    <p className="mt-1 font-mono text-xs text-neutral-400">
                      https://{activeProject.domain}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Link
                      to={`/demo/${activeProject.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white text-neutral-900 px-4 py-2 text-xs font-bold hover:bg-neutral-100 transition-colors shadow-sm"
                    >
                      <span>Launch Full Preview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 text-white px-3.5 py-2 text-xs font-medium hover:bg-emerald-600 transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Test Booking</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Click to Expand — What this demonstrates */}
        <div className="mt-6 flex items-center justify-between">
          <Magnetic className="inline-block" strength={0.18} maxShift={5}>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="group inline-flex items-center gap-2 font-mono text-[13px] text-mute transition-colors hover:text-paper cursor-pointer"
            >
              [ {expanded ? "close feature breakdown" : `why this works for ${activeProject.category}`} ]
            </button>
          </Magnetic>

          <Link
            to={`/demo/${activeProject.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-faint hover:text-paper inline-flex items-center gap-1"
          >
            <span>view {activeProject.domain}</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-2xl border border-line bg-surface/60 p-6">
                <p className="font-mono text-xs text-live uppercase tracking-wider mb-3">
                  // conversion & engineering highlights for {activeProject.title.split("—")[0]}
                </p>
                <div className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {activeProject.demonstrates.map((d, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-mute">
                      <CheckCircle2 className="w-4 h-4 text-live shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
