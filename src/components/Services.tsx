import { motion, type Variants } from "framer-motion";
import { services, site } from "../site.config";
import { Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Magnetic, WhatsAppIcon } from "./ui";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.96, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 24,
    },
  },
};

export default function Services() {
  return (
    <section id="services" className="scroll-mt-[5px] px-4 sm:px-8 lg:px-16 py-16 sm:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Refined Typography */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-faint"
            >
              <Sparkles className="w-3.5 h-3.5 text-live" />
              <span>[ services ]</span>
            </motion.div>

            {/* Refined Animated Header */}
            <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight lowercase text-paper">
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  className="inline-block will-change-transform"
                  initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                  whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  everything your business needs to
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1">
                <motion.span
                  className="inline-block bg-white text-[#156338] px-3 sm:px-5 py-0.5 rounded-xl shadow-md will-change-transform font-extrabold"
                  initial={{ y: "100%", opacity: 0, filter: "blur(12px)" }}
                  whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  win customers online.
                </motion.span>
              </span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="max-w-md space-y-2.5"
          >
            <p className="text-sm sm:text-base text-mute leading-relaxed">
              one dedicated team, end to end — design, build, launch, and support. zero middlemen, zero bloated agency fees.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-live">
              <CheckCircle2 className="w-4 h-4 text-live shrink-0" />
              <span>100% turnkey · upfront flat pricing</span>
            </div>
          </motion.div>
        </div>

        {/* Popping Service Cards Ledger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-10 sm:mt-14 space-y-3.5 sm:space-y-4"
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              whileHover={{ scale: 1.012, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-line bg-surface/60 backdrop-blur-xl p-5 sm:p-8 transition-all duration-300 hover:border-white/40 hover:bg-surface/90 hover:shadow-2xl"
            >
              {/* Subtle Animated Hover Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-white via-live to-transparent"
                aria-hidden
              />

              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
                {/* Left: Number + Title + Tag */}
                <div className="flex items-start gap-3.5 sm:gap-6 max-w-xl">
                  {/* Popping Number Badge */}
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-white/20 bg-black/40 font-mono text-xs sm:text-sm font-bold text-live shadow-inner group-hover:scale-110 group-hover:border-live/60 transition-all duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-2xl font-bold tracking-tight lowercase text-paper group-hover:text-white transition-colors">
                        {s.title}
                      </h3>
                      {s.tag && (
                        <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] text-faint group-hover:bg-live/20 group-hover:text-live transition-colors">
                          {s.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-[15px] text-mute leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>

                {/* Right: Quick Action Pill */}
                <div className="flex items-center gap-3 self-stretch sm:self-end md:self-center shrink-0 pt-2 sm:pt-0">
                  <a
                    href="#contact"
                    className="w-full sm:w-auto inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs font-medium text-mute group-hover:border-white/50 group-hover:bg-paper group-hover:text-ink transition-all duration-200 shadow-sm"
                  >
                    <span>inquire for this</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Eye-Catching Highlight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 sm:mt-12 rounded-2xl sm:rounded-3xl border border-line bg-surface/80 backdrop-blur-xl p-5 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="space-y-1 text-center lg:text-left w-full lg:w-auto">
            <div className="flex items-center justify-center lg:justify-start gap-2 font-mono text-xs text-live">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flat fee guarantee</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-paper">
              Every project is quoted flat before kickoff — 0 hourly surprises.
            </p>
            <p className="font-mono text-xs text-faint">
              Need a custom quote today? Get an instant estimate on WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <Magnetic className="w-full sm:w-auto">
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-bold text-neutral-900 shadow-lg hover:bg-neutral-100 hover:shadow-2xl active:scale-[0.98] transition-all text-center"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#15803d]" />
                <span>Quick WhatsApp Quote</span>
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="flex min-h-[48px] items-center justify-center rounded-full border border-line px-5 py-3 text-sm font-medium text-mute hover:text-paper hover:border-white/30 active:scale-[0.98] transition-colors font-mono text-center"
            >
              fill form →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
