import { motion } from "framer-motion";
import { aboutSection } from "../site.config";
import { Users, Sparkles, ArrowUpRight } from "lucide-react";

export default function AboutTeam() {
  return (
    <section id="about" className="scroll-mt-[5px] px-4 sm:px-8 lg:px-16 py-16 sm:py-28">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs sm:text-[13px] text-faint">[ about & studio ]</p>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight lowercase text-paper">
              {aboutSection.title}
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-line bg-surface/40 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-mute">
            <Users className="w-3.5 h-3.5 text-live" />
            <span>small studio · big impact</span>
          </div>
        </div>

        <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-mute leading-relaxed font-normal">
          {aboutSection.intro}
        </p>

        {/* Studio Principles / Values Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {aboutSection.values.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-line bg-surface/50 backdrop-blur-md p-5 sm:p-6 hover:border-white/30 transition-colors"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-live uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{v.label}</span>
              </div>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-mute leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Team Cards Grid */}
        <div className="mt-10 sm:mt-14">
          <h3 className="font-mono text-xs uppercase tracking-widest text-faint mb-4 sm:mb-6">
            // the team behind the code
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {aboutSection.team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-line bg-surface/70 backdrop-blur-lg p-5 sm:p-8 hover:border-white/35 transition-all duration-300 shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    {/* Avatar Initials or Image Badge */}
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-white/20 bg-black/60 font-mono text-base sm:text-lg font-bold text-paper shadow-inner group-hover:scale-105 transition-transform duration-300 overflow-hidden p-1">
                      {member.avatar.startsWith("/") ? (
                        <img src={member.avatar} alt={member.name} className="h-full w-full object-contain" />
                      ) : (
                        member.avatar
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold tracking-tight text-paper group-hover:text-white transition-colors">
                        {member.name}
                      </h4>
                      <p className="font-mono text-xs text-live mt-0.5 lowercase">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-mute leading-relaxed">
                  {member.bio}
                </p>

                {/* Social link tag */}
                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-line flex items-center justify-between">
                  <span className="font-mono text-[11px] sm:text-xs text-faint">
                    cabin and code studio
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex min-h-[36px] items-center gap-1 font-mono text-xs text-mute hover:text-paper active:text-white transition-colors py-1 px-2 -mr-2"
                  >
                    <span>connect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
