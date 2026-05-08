"use client";

import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  src: string;
  /** Dark overlay opacity — 0 to 1. Default: 0.2 */
  overlayOpacity?: number;
  /** Playback speed — 1 = normal, 0.75 = slow-mo. Default: 1 */
  playbackRate?: number;
}

export default function VideoBackground({
  src,
  overlayOpacity = 0.2,
  playbackRate = 1,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: import("hls.js").default | null = null;

    async function init() {
      const isHLS = src.endsWith(".m3u8") || src.includes("stream.mux.com");

      if (isHLS) {
        const Hls = (await import("hls.js")).default;

        if (Hls.isSupported()) {
          hls = new Hls({
            lowLatencyMode: false,
            maxBufferLength: 30,
            startLevel: -1,
          });
          hls.loadSource(src);
          hls.attachMedia(video!);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video!.playbackRate = playbackRate;
            video!.play().catch(() => {});
          });
        } else if (video!.canPlayType("application/vnd.apple.mpegurl")) {
          video!.src = src;
          video!.playbackRate = playbackRate;
          video!.play().catch(() => {});
        }
      } else {
        video!.src = src;
        video!.playbackRate = playbackRate;
        video!.play().catch(() => {});
      }
    }

    init();

    return () => {
      hls?.destroy();
    };
  }, [src, playbackRate]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Dark overlay — 20% */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(5, 5, 5, ${overlayOpacity})` }}
      />

      {/* Vignette — mantém legibilidade do texto */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(5,5,5,0.75) 100%)",
        }}
      />

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, #050505)",
        }}
      />
    </div>
  );
}
