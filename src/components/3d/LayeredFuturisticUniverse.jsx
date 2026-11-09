import React, { useEffect, useRef } from "react";

/**
 * LayeredFuturisticUniverse
 * Immersive 3D sci-fi atmosphere combining deep space perspective grid,
 * floating circuit particles, digital matrix rain traces, glowing nebula orbs,
 * and holographic rings.
 */
export function LayeredFuturisticUniverse() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 1. Floating Robotic Circuit Nodes
    const numNodes = 40;
    const nodes = [];
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.45 ? "#00f0ff" : "#a855f7",
      });
    }

    // 2. Subtle Matrix Rain Code Streams
    const numStreams = 22;
    const streams = [];
    const glyphs = "0101<>{}[]_/#$%*ACM";
    for (let i = 0; i < numStreams; i++) {
      streams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 1.5 + 0.8,
        char: glyphs[Math.floor(Math.random() * glyphs.length)],
        opacity: Math.random() * 0.25 + 0.05,
      });
    }

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Render Circuit Network Lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < numNodes; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        if (n1.x < 0) n1.x = width;
        if (n1.x > width) n1.x = 0;
        if (n1.y < 0) n1.y = height;
        if (n1.y > height) n1.y = 0;

        // Draw node
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = n1.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();

        // Connect nearby nodes like neural network
        for (let j = i + 1; j < numNodes; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = n1.color;
            ctx.globalAlpha = (1 - dist / 110) * 0.15;
            ctx.stroke();
          }
        }
      }

      // Render Subtle Digital Rain Streams
      ctx.font = "10px monospace";
      for (let i = 0; i < numStreams; i++) {
        const s = streams[i];
        s.y += s.speed;
        if (s.y > height) {
          s.y = 0;
          s.x = Math.random() * width;
          s.char = glyphs[Math.floor(Math.random() * glyphs.length)];
        }

        ctx.fillStyle = "#00f0ff";
        ctx.globalAlpha = s.opacity;
        ctx.fillText(s.char, s.x, s.y);
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Deep Space Cosmic Nebulas */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[140px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-indigo-600/12 blur-[160px]" />
      <div className="absolute top-[45%] left-[30%] w-[500px] h-[500px] rounded-full bg-purple-600/08 blur-[150px]" />

      {/* 2. Perspective 3D Cyber Horizon Floor */}
      <div
        className="absolute bottom-0 inset-x-0 h-[45vh] opacity-20"
        style={{
          perspective: "600px",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 10%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 10%, transparent 95%)",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            transform: "rotateX(72deg) scale(1.8)",
            transformOrigin: "bottom center",
            backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.4) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0, 240, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* 3. Subtle Cyber Grid Wall */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.3) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 240, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* 4. Canvas for Neural Network & Digital Streams */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
