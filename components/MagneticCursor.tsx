"use client";

import { useEffect, useRef, useState } from "react";

export default function MagneticCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const lerped  = useRef({ x: -200, y: -200 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    // Só ativa em dispositivos com ponteiro preciso (desktop/trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const lerpFn = (a: number, b: number, n: number) => a + (b - a) * n;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      const el = e.target as Element;
      setHovered(!!el.closest("button, a, [data-magnetic]"));
    };

    const tick = () => {
      lerped.current.x = lerpFn(lerped.current.x, mouse.current.x, 0.11);
      lerped.current.y = lerpFn(lerped.current.y, mouse.current.y, 0.11);

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${lerped.current.x}px, ${lerped.current.y}px) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Esfera dourada — 10px, segue o mouse direto */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#C5A059",
          zIndex: 9999,
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s",
          boxShadow: "0 0 8px rgba(197,160,89,0.55)",
          willChange: "transform",
        }}
      />

      {/* Anel expansível — lerped, expande sobre botões e cards */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovered ? 52 : 36,
          height: hovered ? 52 : 36,
          borderRadius: "50%",
          border: `1px solid rgba(197,160,89,${hovered ? 0.65 : 0.35})`,
          background: hovered ? "rgba(197,160,89,0.04)" : "transparent",
          zIndex: 9998,
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition:
            "width 0.4s cubic-bezier(0.16,1,0.3,1), " +
            "height 0.4s cubic-bezier(0.16,1,0.3,1), " +
            "opacity 0.25s, border-color 0.3s, background 0.3s",
          willChange: "transform",
        }}
      />
    </>
  );
}
