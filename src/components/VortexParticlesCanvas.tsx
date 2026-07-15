import { useEffect, useRef } from "react";

export function VortexParticlesCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: {
      x: number;
      y: number;
      angle: number;
      radius: number;
      speed: number;
      radialSpeed: number;
      size: number;
      opacity: number;
      hue: number;
      pulseSpeed: number;
      pulseOffset: number;
    }[] = [];

    const PARTICLE_COUNT = 2500; // Thousands of tiny glowing particles

    // Initialize particles using a spiral vortex configuration
    const initParticles = (w: number, h: number) => {
      particles = [];
      const maxRadius = Math.sqrt(w * w + h * h) * 0.75;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Distribute radii so they are more concentrated in the middle, but cover full spectrum
        const radius = Math.pow(Math.random(), 1.5) * maxRadius;
        particles.push({
          x: 0,
          y: 0,
          angle,
          radius,
          // Swirl direction can be clockwise or counter-clockwise
          speed: (0.003 + Math.random() * 0.012) * (Math.random() > 0.5 ? 1 : -1),
          // Spiral inward velocity
          radialSpeed: 0.12 + Math.random() * 0.55,
          size: 0.3 + Math.random() * 0.7, // Physically smaller tiny dots
          opacity: 0.15 + Math.random() * 0.8,
          hue: Math.random() > 0.85 ? 18 : Math.random() > 0.4 ? 26 : 34, // Warm orange hues
          pulseSpeed: 1.2 + Math.random() * 2.5,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    // Resize handler using ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width: entryWidth, height: entryHeight } = entries[0].contentRect;
      
      width = entryWidth;
      height = entryHeight;
      canvas.width = width;
      canvas.height = height;

      // Re-initialize particles
      initParticles(width, height);
    });

    resizeObserver.observe(container);

    let lastTime = 0;
    const render = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      // Soft motion blur: draw a semi-transparent slate-dark overlay
      // Using 0.28 instead of 0.10 dramatically shortens the trail, ensuring the particles look like sharp, distinct tiny dots.
      ctx.fillStyle = "rgba(10, 15, 26, 0.28)";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.sqrt(width * width + height * height) * 0.75;

      // Add a subtle radial overlay to make the center feel like a vortex core
      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.min(width, height) * 0.45);
      centerGlow.addColorStop(0, "rgba(255, 122, 32, 0.04)");
      centerGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // Smooth accelerating speed multiplier to-and-fro
      const speedMultiplier = 1.0 + 0.55 * Math.sin(time * 0.0009);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Spiral inward
        p.radius -= p.radialSpeed * speedMultiplier;

        // Swirl faster as they approach the center
        const angularAcceleration = (160 / (p.radius + 35)) * 0.035;
        p.angle += p.speed * speedMultiplier * (1 + angularAcceleration);

        // If particle reaches the center, respawn far away near the outer limits
        if (p.radius <= 4) {
          p.radius = maxRadius * (0.8 + Math.random() * 0.2);
          p.angle = Math.random() * Math.PI * 2;
        }

        // Calculate absolute positions
        p.x = centerX + Math.cos(p.angle) * p.radius;
        p.y = centerY + Math.sin(p.angle) * p.radius;

        // Pulsing glow size/brightness
        const pulse = Math.sin(time * 0.002 * p.pulseSpeed + p.pulseOffset);
        const currentOpacity = Math.max(0.08, Math.min(0.95, p.opacity * (0.6 + 0.4 * pulse)));

        // Drawing glowing orange circle (highly precise tiny dots)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${currentOpacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-[#0A0F1A]">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
