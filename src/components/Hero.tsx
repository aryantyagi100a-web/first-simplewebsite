import { motion } from "framer-motion";
import { site } from "../site.config";
import { LiveDot, Magnetic, WhatsAppIcon } from "./ui";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative px-4 sm:px-8 lg:px-16 pt-28 sm:pt-36 pb-16 sm:pb-28 min-h-[85vh] flex flex-col items-center justify-center">
      <div className="relative max-w-5xl text-center w-full">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-4 py-1.5 text-xs font-mono text-mute shadow-sm"
        >
          <LiveDot />
          <span>{site.availability}</span>
        </motion.div>

        {/* Responsive Headline with staggered entrance */}
        <h1 className="font-bold tracking-[-0.04em] leading-[1.02] sm:leading-[0.96] text-[clamp(2.4rem,8.5vw,7.5rem)] lowercase text-paper">
          <div className="overflow-hidden pb-[0.04em]">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "110%", filter: "blur(14px)", opacity: 0 }}
              animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              websites that
            </motion.span>
          </div>
          <div className="overflow-hidden pb-[0.04em]">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "110%", filter: "blur(14px)", opacity: 0 }}
              animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.38,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              bring in
            </motion.span>
          </div>
          <div className="overflow-hidden pt-1 pb-1">
            <motion.span
              className="inline-block bg-white text-[#156338] px-3.5 sm:px-6 py-0.5 sm:py-1 rounded-xl sm:rounded-2xl shadow-lg will-change-transform font-extrabold"
              initial={{ y: "110%", filter: "blur(14px)", opacity: 0 }}
              animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.52,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              customers.
            </motion.span>
          </div>
        </h1>

        <div className="mt-6 sm:mt-10 flex flex-col items-center gap-6 sm:gap-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-base sm:text-lg lg:text-xl leading-relaxed text-mute font-normal px-2 sm:px-0"
          >
            {site.heroIntro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none"
          >
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#contact"
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-paper px-8 py-3.5 text-base font-bold text-ink transition-all hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] shadow-lg text-center"
              >
                <span>get a free quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border border-white/25 bg-surface/50 backdrop-blur-md px-6 py-3.5 text-base font-medium text-paper transition-all hover:bg-white/15 hover:border-white/40 active:scale-[0.98] text-center"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>whatsapp me</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-2 font-mono text-xs sm:text-sm text-faint px-4"
        >
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          <span>{site.whatsappDisplay}</span>
          <span className="hidden xs:inline">·</span>
          <span>{site.heroNote}</span>
        </motion.p>
      </div>
    </section>
  );
}
