import { motion } from "framer-motion";
import { processSteps } from "../site.config";

export default function Process() {
  return (
    <section id="process" className="scroll-mt-[5px] px-6 sm:px-10 lg:px-16 py-24 sm:py-28">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-xs sm:text-[13px] text-faint">[ process ]</p>
        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight lowercase text-paper">
          simple, four steps
        </h2>
        <p className="mt-4 max-w-xl text-base text-mute leading-relaxed font-normal">
          no jargon, no meetings that could have been messages. you always know what happens next.
        </p>

        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={s.step} className="relative">
              {/* dotted join to the next step (desktop only) */}
              {i < processSteps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-[3.1rem] left-[calc(50%+2.6rem)] right-[calc(-2.5rem)] hidden lg:block border-t border-dashed border-white/15"
                />
              )}
              <span className="block font-mono text-[64px] leading-none text-white/12 select-none" aria-hidden>
                {s.step}
              </span>
              <h3 className="mt-4 text-lg font-medium tracking-tight lowercase">{s.title}</h3>
              <p className="mt-2.5 text-sm text-mute leading-relaxed">{s.description}</p>
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
