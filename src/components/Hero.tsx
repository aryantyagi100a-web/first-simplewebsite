import { motion } from "framer-motion";
import { site } from "../site.config";
import { Magnetic, WhatsAppIcon } from "./ui";

export default function Hero() {
  return (
    <section className="relative px-6 sm:px-10 lg:px-16 pt-32 sm:pt-36 pb-24 sm:pb-28 min-h-[85vh] flex flex-col items-center justify-center">
      <div className="relative max-w-5xl text-center">
        {/* THE one motion moment: words land with a blurred echo, staggered */}
        <h1 className="font-bold tracking-[-0.04em] leading-[0.96] text-[clamp(3.4rem,10.5vw,8.5rem)] lowercase text-paper">
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
          <div className="overflow-hidden pt-1.5 pb-1">
            <motion.span
              className="inline-block bg-white text-[#156338] px-4 sm:px-6 py-0.5 sm:py-1 -ml-1 sm:-ml-2 rounded-xl shadow-lg will-change-transform"
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

        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-lg sm:text-xl leading-relaxed text-mute font-normal"
          >
            {site.heroIntro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic className="inline-block">
              <a
                href="#contact"
                className="inline-flex items-center rounded-full bg-paper px-8 py-3.5 text-base font-semibold text-ink transition-all hover:opacity-95 hover:scale-[1.02] shadow-lg"
              >
                get a free quote
              </a>
            </Magnetic>
            <Magnetic className="inline-block">
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-surface/50 backdrop-blur-md px-6 py-3.5 text-base font-medium text-paper transition-all hover:bg-white/15 hover:border-white/40"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-faint" />
                <span>whatsapp me</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="mt-12 flex items-center justify-center gap-2 font-mono text-sm text-faint"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {site.whatsappDisplay} · {site.heroNote}
        </motion.p>
      </div>
    </section>
  );
}
