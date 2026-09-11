import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CuttingMatBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for gentle parallax drift on mouse move
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 25, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 25, mass: 0.8 });

  // Map mouse movement to subtle translation (-18px to +18px)
  const bgX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const bgY = useTransform(smoothY, [-1, 1], [-18, 18]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth) * 2 - 1;
      const yNorm = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(xNorm);
      mouseY.set(yNorm);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#156338]"
    >
      {/* Moving Mat Layer (Parallax + Continuous Ambient Hover) */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute -inset-16 w-[calc(100%+128px)] h-[calc(100%+128px)]"
      >
        {/* Continuous Infinite Floating Layer */}
        <motion.div
          animate={{
            x: [-14, 16, -10, 14, -14],
            y: [-12, -20, 14, -8, -12],
            rotate: [-0.5, 0.5, -0.3, 0.4, -0.5],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="w-full h-full"
        >
          {/* SVG Grid with Cutting Mat Markings */}
          <svg className="w-full h-full opacity-65" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Small 16px Sub-grid */}
            <pattern
              id="subgrid"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 16 0 L 0 0 0 16"
                fill="none"
                stroke="#d9f99d"
                strokeWidth="0.45"
                strokeOpacity="0.28"
              />
            </pattern>

            {/* Major 80px Grid */}
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <rect width="80" height="80" fill="url(#subgrid)" />
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.1"
                strokeOpacity="0.65"
              />
              {/* Subtle Corner crosshairs and centimeter tick marks */}
              <circle cx="80" cy="80" r="1.4" fill="#fef08a" opacity="0.8" />
              <line x1="72" y1="80" x2="88" y2="80" stroke="#fef08a" strokeWidth="0.8" opacity="0.75" />
              <line x1="80" y1="72" x2="80" y2="88" stroke="#fef08a" strokeWidth="0.8" opacity="0.75" />
            </pattern>

            {/* 45 degree angle guide lines pattern */}
            <pattern
              id="angles"
              width="320"
              height="320"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 320 L 320 0 M 0 0 L 320 320"
                fill="none"
                stroke="#fef08a"
                strokeWidth="0.65"
                strokeDasharray="4 6"
                strokeOpacity="0.32"
              />
              {/* 30 & 60 degree guides */}
              <path
                d="M 0 160 L 320 0 M 0 320 L 320 160"
                fill="none"
                stroke="#fef08a"
                strokeWidth="0.45"
                strokeDasharray="3 6"
                strokeOpacity="0.25"
              />
            </pattern>
          </defs>

          {/* Fill mat with rich studio cutting mat green */}
          <rect width="100%" height="100%" fill="#156338" />
          <rect width="100%" height="100%" fill="url(#angles)" />
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Ambient subtle lighting */}
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.2) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.3) 0%, transparent 70%)",
          }}
        />
        </motion.div>
      </motion.div>

      {/* Subtle Edge Blur Layer — soft blur confined to outer edges */}
      <div
        className="absolute inset-0 pointer-events-none backdrop-blur-[4px]"
        style={{
          maskImage: "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 70%, black 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 70%, black 100%)",
        }}
      />

      {/* Gentle Vignette Depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 65%, rgba(10, 42, 24, 0.35) 100%)",
        }}
      />
    </div>
  );
}
