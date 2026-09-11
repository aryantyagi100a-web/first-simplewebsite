import { motion } from "framer-motion";
import { processSteps } from "../site.config";

export default function Process() {
  return (
    <section id="process" className="scroll-mt-[5px] px-4 sm:px-8 lg:px-16 py-16 sm:py-28">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-xs sm:text-[13px] text-faint">[ process ]</p>
        <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight lowercase text-paper">
          simple, four steps
        </h2>
        <p className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-mute leading-relaxed font-normal">
          no jargon, no meetings that could have been messages. you always know what happens next.
        </p>

        <ol className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <li
              key={s.step}
              className="relative rounded-2xl sm:rounded-3xl border border-line bg-surface/50 backdrop-blur-md p-5 sm:p-7 flex flex-col justify-between hover:border-white/30 transition-colors"
            >
              {/* Dotted join to the next step (desktop only) */}
              {i < processSteps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-1/2 -right-4 w-8 hidden lg:block border-t border-dashed border-white/20 z-10 pointer-events-none"
                />
              )}
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-live/80 select-none">
                    {s.step}
                  </span>
                  <span className="font-mono text-[11px] text-faint uppercase tracking-wider">
                    step 0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold tracking-tight lowercase text-paper">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-mute leading-relaxed">
                  {s.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
