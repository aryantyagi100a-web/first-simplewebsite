import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { featuredProjects, site } from "../site.config";
import { WhatsAppIcon } from "../components/ui";
import { ArrowLeft, Smartphone, Monitor, Tablet } from "lucide-react";

export default function DemoPage() {
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const project = featuredProjects.find((p) => p.id === id) || featuredProjects[0];

  const waBookingMessage = encodeURIComponent(
    `Hi ${project.title.split("—")[0].trim()}, I found your website demo via Cabin and Code and would like to inquire!`
  );
  const waUrl = `https://wa.me/${site.whatsapp}?text=${waBookingMessage}`;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Top Demo Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-800 bg-neutral-900/95 px-3 sm:px-8 py-2.5 sm:py-3.5 backdrop-blur-md gap-2">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Link
            to="/#work"
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl bg-neutral-800 px-2.5 sm:px-3 py-1.5 text-xs font-mono text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Back to Portfolio</span>
            <span className="xs:hidden">Back</span>
          </Link>
          <div className="truncate hidden sm:block">
            <span className="font-semibold text-xs sm:text-sm text-white truncate">{project.title.split("—")[0]}</span>
            <span className="ml-2 font-mono text-xs text-neutral-400 hidden lg:inline">({project.domain})</span>
          </div>
        </div>

        {/* Device Switcher (Desktop / Tablet / Mobile) */}
        <div className="flex items-center gap-0.5 sm:gap-1 rounded-xl bg-neutral-800 p-1 border border-neutral-700/60 shrink-0">
          <button
            onClick={() => setDevice("desktop")}
            className={`flex items-center gap-1 rounded-lg px-2 sm:px-2.5 py-1 text-xs transition-colors cursor-pointer ${
              device === "desktop" ? "bg-white text-black font-semibold shadow-sm" : "text-neutral-400 hover:text-white"
            }`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={`flex items-center gap-1 rounded-lg px-2 sm:px-2.5 py-1 text-xs transition-colors cursor-pointer ${
              device === "tablet" ? "bg-white text-black font-semibold shadow-sm" : "text-neutral-400 hover:text-white"
            }`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`flex items-center gap-1 rounded-lg px-2 sm:px-2.5 py-1 text-xs transition-colors cursor-pointer ${
              device === "mobile" ? "bg-white text-black font-semibold shadow-sm" : "text-neutral-400 hover:text-white"
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* CTA to get a similar site */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-[#15803d] hover:bg-[#16a34a] text-white px-3 sm:px-4 py-1.5 text-xs font-semibold shadow-sm transition-colors"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Test WhatsApp Flow</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Main Viewport Container */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 bg-neutral-900/50 overflow-x-hidden">
        <div
          className={`transition-all duration-300 w-full overflow-hidden rounded-xl sm:rounded-2xl border border-neutral-700/80 bg-white text-neutral-900 shadow-2xl ${
            device === "mobile"
              ? "max-w-[390px] min-h-[680px] my-2 sm:my-4 rounded-[28px] sm:rounded-[36px] border-[4px] sm:border-[6px] border-neutral-800"
              : device === "tablet"
              ? "max-w-[768px] min-h-[750px]"
              : "max-w-5xl min-h-[85vh]"
          }`}
        >
          {/* Simulated Browser Bar */}
          <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-3 sm:px-4 py-2 sm:py-2.5 text-xs text-neutral-600">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-white px-3 sm:px-4 py-1 border border-neutral-200 font-mono text-[11px] sm:text-xs text-neutral-700 shadow-sm max-w-[200px] sm:max-w-md w-full justify-center truncate">
              <span className="text-emerald-600 shrink-0">🔒</span>
              <span className="truncate">{project.domain}</span>
            </div>
            <div className="w-6 sm:w-10" />
          </div>

          {/* Interactive Live Website Content */}
          <div className="overflow-y-auto max-h-[80vh] p-4 sm:p-10 space-y-8 sm:space-y-12">
            {/* Nav */}
            <nav className="flex items-center justify-between border-b border-neutral-200 pb-4 sm:pb-5 gap-2">
              <div className="min-w-0">
                <span className="text-base sm:text-xl font-bold tracking-tight text-neutral-900 capitalize truncate block">
                  {project.title.split("—")[0]}
                </span>
                <p className="text-[11px] sm:text-xs text-neutral-500 font-mono truncate">{project.category}</p>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-medium transition-all shadow-sm hover:scale-105 shrink-0"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Book on WhatsApp</span>
              </a>
            </nav>

            {/* Hero Section */}
            <div className="text-center max-w-2xl mx-auto py-4 sm:py-6 space-y-3 sm:space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 border border-neutral-300/80 px-3 py-1 text-[11px] sm:text-xs font-mono text-neutral-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {project.badge}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 lowercase leading-tight">
                {project.headline}
              </h1>
              <p className="text-neutral-600 text-xs sm:text-base leading-relaxed max-w-lg mx-auto">
                {project.subhead}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-neutral-900 text-white px-6 py-2.5 text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-all shadow-md"
                >
                  Contact & Reserve
                </a>
                <a
                  href="#menu"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-neutral-300 text-neutral-800 px-6 py-2.5 text-xs sm:text-sm font-medium hover:bg-neutral-100 transition-colors"
                >
                  View Offerings
                </a>
              </div>
            </div>

            {/* Visual Photo Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {[
                "from-amber-100 to-amber-200",
                "from-neutral-200 to-neutral-300",
                "from-emerald-100 to-emerald-200",
                "from-sky-100 to-sky-200",
              ].map((gradient, i) => (
                <div
                  key={i}
                  className={`h-24 sm:h-36 rounded-xl bg-gradient-to-br ${gradient} p-3 sm:p-4 flex flex-col justify-end border border-neutral-200/80 shadow-sm`}
                >
                  <span className="font-mono text-[9px] sm:text-[10px] text-neutral-600 font-semibold uppercase tracking-wider">
                    Gallery 0{i + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Offerings / Price Ledger */}
            <div id="menu" className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5 sm:pb-3">
                <h3 className="font-bold text-base sm:text-lg text-neutral-900 lowercase">featured offerings & pricing</h3>
                <span className="font-mono text-[11px] sm:text-xs text-neutral-500">all transparent rates</span>
              </div>
              <ul className="divide-y divide-neutral-200">
                {project.menu.map((item, idx) => (
                  <li
                    key={idx}
                    className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 hover:bg-neutral-50 px-2 rounded-lg transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-neutral-900 lowercase text-sm sm:text-base">{item.item}</span>
                      {item.detail && (
                        <p className="text-xs text-neutral-500 mt-0.5">{item.detail}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs sm:text-sm font-bold text-neutral-900">{item.price}</span>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-emerald-700 hover:underline inline-flex items-center gap-1"
                      >
                        order/book →
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonials & Hours */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 pt-4 sm:pt-6 border-t border-neutral-200">
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-neutral-500 font-mono">// verified client reviews</h4>
                {project.reviews.map((rev, i) => (
                  <div key={i} className="rounded-xl bg-neutral-50 p-3.5 sm:p-4 border border-neutral-200">
                    <div className="flex items-center gap-1 text-amber-500 mb-1 text-xs">
                      {"★".repeat(rev.stars)}
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed italic">“{rev.text}”</p>
                    <p className="font-mono text-[10px] sm:text-[11px] text-neutral-500 mt-1.5 font-semibold">— {rev.author}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-neutral-900 text-white p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div>
                  <span className="font-mono text-[11px] sm:text-xs text-emerald-400 uppercase tracking-wider">Opening Times & Location</span>
                  <p className="text-base sm:text-lg font-bold mt-1 text-white">{project.badge}</p>
                  <p className="text-xs text-neutral-400 mt-1.5">Central Business District · Easy Parking & WhatsApp Assistant</p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white text-neutral-900 py-2.5 text-xs font-bold hover:bg-neutral-100 transition-colors shadow-sm"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
