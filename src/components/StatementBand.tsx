import { motion } from "framer-motion";

export default function StatementBand() {
  return (
    <section aria-label="statement" className="border-y border-line bg-surface/40 px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <blockquote className="mx-auto max-w-4xl text-center">
          <p className="relative text-xl sm:text-3xl lg:text-5xl font-bold tracking-[-0.02em] leading-snug sm:leading-tight text-paper">
            <span className="not-italic text-3xl sm:text-5xl lg:text-6xl leading-none opacity-30 align-top mr-1">“</span>
            A good website does not need to shout.<br className="hidden sm:inline" />{" "}
            It needs to bring customers.
            <span className="not-italic text-3xl sm:text-5xl lg:text-6xl leading-none opacity-30 align-bottom ml-1">”</span>
          </p>
        </blockquote>
      </motion.div>
    </section>
  );
}
