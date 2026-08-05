'use client'

import { useEffect, useRef, useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// Whiteboard erase-and-rewrite cycling text
// ---------------------------------------------------------------------------
const WHITEBOARD_PHRASES = [
  'making AI less scary',
  'work worth showing',
  'coffee number three',
]

// Animation phase durations (ms)
const HOLD_MS     = 2000
const ERASE_MS    = 600
const PAUSE_MS    = 200
const WRITE_MS    = 900

type WhiteboardPhase = 'hold' | 'erasing' | 'paused' | 'writing'

function WhiteboardWord() {
  const [index, setIndex] = useState(0)
  const [next, setNext]   = useState(1)
  const [phase, setPhase] = useState<WhiteboardPhase>('hold')

  // Advance phase in a loop
  const advance = useCallback((current: WhiteboardPhase, nxt: number) => {
    if (current === 'hold') {
      setPhase('erasing')
    } else if (current === 'erasing') {
      setPhase('paused')
      setIndex(nxt)
      setNext((nxt + 1) % WHITEBOARD_PHRASES.length)
    } else if (current === 'paused') {
      setPhase('writing')
    } else {
      setPhase('hold')
    }
  }, [])

  useEffect(() => {
    const duration =
      phase === 'hold'    ? HOLD_MS  :
      phase === 'erasing' ? ERASE_MS :
      phase === 'paused'  ? PAUSE_MS :
      WRITE_MS
    const id = setTimeout(() => advance(phase, next), duration)
    return () => clearTimeout(id)
  }, [phase, next, advance])

  const phrase = WHITEBOARD_PHRASES[index]
  const isErasing = phase === 'erasing'
  const isWriting = phase === 'writing'
  const isHold    = phase === 'hold'

  return (
    <span
      className="font-shantell text-accent relative inline-flex"
      style={{ minWidth: '18ch', overflow: 'hidden', alignItems: 'baseline', verticalAlign: 'baseline' }}
    >
      {/* Text — revealed on write-in; hold: fully visible; paused: hidden */}
      <span
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          clipPath:  isHold ? 'inset(0 0% 0 0)' : undefined,
          opacity:   phase === 'paused' ? 0 : 1,
          animation: isWriting ? `wb-write ${WRITE_MS}ms cubic-bezier(0.4,0,0.15,1) forwards` : undefined,
        }}
      >
        {phrase}
      </span>

      {/* Erase mask — rotates from behind-right to covering-left, hiding the text beneath */}
      {isErasing && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-4px -4px -4px -4px',
            background: 'var(--background)',
            transformOrigin: 'left center',
            animation: `wb-erase-mask ${ERASE_MS}ms linear forwards`,
            pointerEvents: 'none',
          }}
        />
      )}

      <style>{`
        /* Erase mask: rotates from flat-behind to flat-over, sweeping across the text */
        @keyframes wb-erase-mask {
          from { transform: rotate(-80deg); }
          to   { transform: rotate(10deg);  }
        }

        /* Write-in: clip expands left→right, opacity settles from 85%→100% */
        @keyframes wb-write {
          from { clip-path: inset(0 100% 0 0); opacity: 0.85; }
          85%  { opacity: 1; }
          to   { clip-path: inset(0 0%   0 0); opacity: 1;    }
        }
      `}</style>
    </span>
  )
}

// ---------------------------------------------------------------------------
// Figure — exact paths from Figma "Create Stick Figure Drawing" (node 983:595)
// Each path d= is the original Figma vector data.
// Each transform translates to the vector's position within the 448×465.9 Icon frame.
// Colors: FG = foreground, BLUE = site accent (replaces original red marker).
// ---------------------------------------------------------------------------

const FG   = "oklch(0.20 0.01 240)"; // --foreground
const BLUE = "#4CA9C6";               // --accent (matches Icon.svg marker colour)
const WHITE = "white";

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Pt = [number, number];

// Messy scattered paths (simple polylines in the same 448×466 space)
let _seed = 7;
function rnd() {
  _seed = (_seed * 9301 + 49297) % 233280;
  return _seed / 233280;
}
function messyLine(n: number, cx: number, cy: number, spread: number): Pt[] {
  const pts: Pt[] = [];
  let x = cx + (rnd() - 0.5) * spread;
  let y = cy + (rnd() - 0.5) * spread;
  for (let i = 0; i < n; i++) {
    x += (rnd() - 0.5) * spread * 0.55;
    y += (rnd() - 0.5) * spread * 0.55;
    x = Math.max(10, Math.min(438, x));
    y = Math.max(10, Math.min(455, y));
    pts.push([x, y]);
  }
  return pts;
}
function toPolyline(pts: Pt[]): string {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
}

// One messy stand-in per clean path — same rough centroid
const MESSY: { d: string; color: string; sw: number }[] = [
  { d: toPolyline(messyLine(6, 224, 134, 280)), color: FG,   sw: 3    }, // board
  { d: toPolyline(messyLine(5, 191, 264, 200)), color: FG,   sw: 8.06 }, // left shoulder curve
  { d: toPolyline(messyLine(5, 261, 264, 200)), color: FG,   sw: 8.06 }, // right shoulder curve
  { d: toPolyline(messyLine(4, 224, 162, 120)), color: FG,   sw: 6.27 }, // hair arc
  { d: toPolyline(messyLine(6, 224, 185, 140)), color: FG,   sw: 6.27 }, // head circle
  { d: toPolyline(messyLine(3, 224, 226,  80)), color: FG,   sw: 7.17 }, // neck line
  { d: toPolyline(messyLine(5, 224, 283, 160)), color: FG,   sw: 6.27 }, // torso box
  { d: toPolyline(messyLine(4, 288, 234, 180)), color: FG,   sw: 7.17 }, // right arm
  { d: toPolyline(messyLine(4, 320, 211, 120)), color: FG,   sw: 4.48 }, // right wrist circle
  { d: toPolyline(messyLine(3, 331, 199, 100)), color: BLUE, sw: 5.38 }, // marker diagonal
  { d: toPolyline(messyLine(3, 340, 190,  80)), color: BLUE, sw: 4.00 }, // marker tip
  { d: toPolyline(messyLine(4, 179, 286, 160)), color: FG,   sw: 7.17 }, // left arm
  { d: toPolyline(messyLine(4, 166, 320, 120)), color: FG,   sw: 4.48 }, // left wrist circle
  { d: toPolyline(messyLine(3, 199, 372, 100)), color: FG,   sw: 7.17 }, // left leg
  { d: toPolyline(messyLine(3, 248, 372, 100)), color: FG,   sw: 7.17 }, // right leg
  { d: toPolyline(messyLine(4, 191, 415,  80)), color: FG,   sw: 4.00 }, // left foot
  { d: toPolyline(messyLine(4, 257, 415,  80)), color: FG,   sw: 4.00 }, // right foot
  { d: toPolyline(messyLine(5, 310, 155, 120)), color: BLUE, sw: 4.00 }, // hi! text
];

// Clean paths — exact paths from Icon.svg (absolute canvas coordinates, no tx/ty needed)
// fill/stroke match Icon.svg exactly.
// Index 9 = marker diagonal (blue), index 10 = marker tip (blue filled) — these are the pen paths.
const CLEAN: { d: string; color: string; sw: number; fill?: string }[] = [
  // 0 — whiteboard rectangle
  { color: FG, sw: 3, fill: WHITE,
    d: "M372.734 35.8394H75.2656C73.2862 35.8394 71.6816 37.4439 71.6816 39.4233V229.373C71.6816 231.352 73.2862 232.957 75.2656 232.957H372.734C374.713 232.957 376.318 231.352 376.318 229.373V39.4233C376.318 37.4439 374.713 35.8394 372.734 35.8394Z" },
  // 1 — left shoulder/body curve
  { color: FG, sw: 8.06,
    d: "M199 160.457C189 169.457 184.441 212.607 183.688 254.726C182.935 284.812 184.441 311.889 188.206 335.957" },
  // 2 — right shoulder/body curve
  { color: FG, sw: 8.06,
    d: "M250 161.957C261.5 176.457 264.618 226.984 265.216 268.797C265.813 298.663 264.618 325.543 261.632 349.436" },
  // 3 — hair arc
  { color: FG, sw: 6.27, fill: WHITE,
    d: "M195.328 174.718C197.717 153.811 207.775 150.944 224.5 147.957C241.225 150.944 250.282 153.811 252.671 174.718" },
  // 4 — head circle
  { color: FG, sw: 6.27, fill: WHITE,
    d: "M224 219.517C242.804 219.517 258.047 203.471 258.047 183.677C258.047 163.884 242.804 147.838 224 147.838C205.196 147.838 189.952 163.884 189.952 183.677C189.952 203.471 205.196 219.517 224 219.517Z" },
  // 5 — neck line
  { color: FG, sw: 7.17,
    d: "M224 218.621V234.749" },
  // 6 — torso box
  { color: FG, sw: 6.27, fill: WHITE,
    d: "M188.16 234.749C185.174 275.367 184.576 307.623 186.368 331.516H261.631C263.423 307.623 262.826 275.367 259.839 234.749H188.16Z" },
  // 7 — right arm
  { color: FG, sw: 7.17,
    d: "M258.047 255.357C277.161 237.437 297.172 223.4 318.078 213.245" },
  // 8 — right wrist circle
  { color: FG, sw: 4.48, fill: WHITE,
    d: "M320.767 220.413C325.715 220.413 329.726 216.401 329.726 211.453C329.726 206.505 325.715 202.493 320.767 202.493C315.818 202.493 311.807 206.505 311.807 211.453C311.807 216.401 315.818 220.413 320.767 220.413Z" },
  // 9 — marker diagonal (blue) — PEN PATH
  { color: BLUE, sw: 5.38,
    d: "M326.143 204.286L338.686 191.742" },
  // 10 — marker tip circle (blue filled) — PEN PATH
  { color: BLUE, sw: 0, fill: BLUE,
    d: "M340.478 193.534C342.458 193.534 344.062 191.929 344.062 189.95C344.062 187.97 342.458 186.366 340.478 186.366C338.499 186.366 336.895 187.97 336.895 189.95C336.895 191.929 338.499 193.534 340.478 193.534Z" },
  // 11 — left arm
  { color: FG, sw: 7.17,
    d: "M189.952 255.357C178.005 273.277 170.838 292.69 168.448 313.596" },
  // 12 — left wrist circle
  { color: FG, sw: 4.48, fill: WHITE,
    d: "M166.657 329.724C171.606 329.724 175.617 325.712 175.617 320.764C175.617 315.816 171.606 311.804 166.657 311.804C161.709 311.804 157.697 315.816 157.697 320.764C157.697 325.712 161.709 329.724 166.657 329.724Z" },
  // 13 — left leg
  { color: FG, sw: 7.17,
    d: "M204.288 329.724L195.328 412.155" },
  // 14 — right leg
  { color: FG, sw: 7.17,
    d: "M243.711 329.724L252.671 412.155" },
  // 15 — left foot (filled)
  { color: FG, sw: 0, fill: FG,
    d: "M190.848 422.907C199.756 422.907 206.976 419.697 206.976 415.739C206.976 411.78 199.756 408.571 190.848 408.571C181.941 408.571 174.721 411.78 174.721 415.739C174.721 419.697 181.941 422.907 190.848 422.907Z" },
  // 16 — right foot (filled)
  { color: FG, sw: 0, fill: FG,
    d: "M257.151 422.907C266.058 422.907 273.279 419.697 273.279 415.739C273.279 411.78 266.058 408.571 257.151 408.571C248.244 408.571 241.023 411.78 241.023 415.739C241.023 419.697 248.244 422.907 257.151 422.907Z" },
  // 17 — "hi!" text on whiteboard (blue filled)
  { color: BLUE, sw: 0, fill: BLUE,
    d: "M294.919 172.72C294.479 172.828 294.04 172.772 293.601 172.551C293.187 172.323 292.797 171.911 292.43 171.315C292.064 170.719 291.759 169.929 291.516 168.945C290.845 166.227 290.4 163.755 290.18 161.529C289.961 159.304 289.815 157.266 289.743 155.416C289.69 153.534 289.56 151.836 289.351 150.322C289.237 149.526 289.084 148.794 288.892 148.128C288.726 147.455 288.556 146.823 288.383 146.234C288.23 145.613 288.115 145.037 288.039 144.506C287.982 144.054 288.029 143.63 288.179 143.236C288.329 142.842 288.663 142.581 289.181 142.453C289.75 142.313 290.245 142.424 290.664 142.788C291.083 143.151 291.466 143.812 291.812 144.77C292.178 145.696 292.475 147.01 292.703 148.712C292.924 150.387 293.074 152.218 293.152 154.204C293.256 156.183 293.414 158.273 293.627 160.473C293.86 162.64 294.28 164.843 294.888 167.083L293.871 166.634C294.322 162.897 294.842 159.884 295.431 157.597C296.046 155.303 296.762 153.588 297.581 152.452C298.393 151.29 299.317 150.581 300.352 150.326C301.491 150.045 302.448 150.193 303.222 150.771C303.997 151.349 304.709 152.286 305.358 153.581C306.001 154.851 306.633 156.411 307.255 158.263C307.845 159.875 308.342 161.167 308.747 162.138C309.171 163.078 309.56 163.819 309.914 164.364C310.262 164.882 310.606 165.333 310.948 165.715C311.129 165.89 311.287 166.085 311.422 166.299C311.557 166.513 311.656 166.749 311.72 167.008C311.829 167.448 311.763 167.849 311.523 168.21C311.308 168.565 310.968 168.8 310.502 168.915C309.855 169.075 309.183 168.856 308.486 168.259C307.783 167.636 307.113 166.758 306.476 165.624C305.833 164.464 305.271 163.189 304.79 161.797C304.258 160.198 303.786 158.899 303.375 157.902C302.965 156.905 302.576 156.108 302.209 155.512C301.862 154.884 301.472 154.362 301.04 153.947C300.509 154.132 299.924 154.936 299.286 156.357C298.674 157.771 298.105 159.697 297.581 162.134C297.082 164.564 296.727 167.412 296.517 170.678C296.463 171.35 296.293 171.831 296.008 172.122C295.748 172.405 295.385 172.605 294.919 172.72ZM319.108 166.833C318.668 166.941 318.28 166.927 317.944 166.79C317.609 166.653 317.309 166.384 317.045 165.982C316.807 165.574 316.614 165.072 316.467 164.477C315.969 162.457 315.544 160.736 315.192 159.312C314.841 157.888 314.525 156.661 314.243 155.632C313.981 154.571 313.738 153.587 313.515 152.681C313.291 151.774 313.055 150.817 312.806 149.807C312.691 149.341 312.656 148.924 312.703 148.555C312.749 148.187 312.889 147.864 313.123 147.586C313.356 147.309 313.693 147.116 314.133 147.007C314.703 146.867 315.217 146.946 315.675 147.245C316.159 147.537 316.514 148.082 316.737 148.878C316.878 149.447 317.066 150.266 317.302 151.334C317.532 152.376 317.778 153.538 318.039 154.819C318.326 156.094 318.616 157.382 318.91 158.683C319.197 159.958 319.459 161.129 319.695 162.197C319.931 163.265 320.126 164.11 320.279 164.731C320.4 165.223 320.373 165.669 320.197 166.069C320.015 166.444 319.652 166.698 319.108 166.833ZM313.746 143.601C312.788 143.837 311.915 143.75 311.127 143.341C310.34 142.931 309.847 142.325 309.649 141.522C309.476 140.823 309.581 140.193 309.965 139.631C310.368 139.037 310.957 138.645 311.734 138.453C312.381 138.293 312.976 138.311 313.519 138.507C314.087 138.696 314.549 139.008 314.903 139.442C315.251 139.851 315.489 140.314 315.617 140.832C315.738 141.324 315.666 141.864 315.399 142.451C315.151 143.007 314.6 143.39 313.746 143.601ZM327.369 155.153C326.981 155.249 326.596 155.193 326.215 154.985C325.854 154.744 325.561 154.391 325.336 153.925C324.719 152.539 324.238 151.312 323.892 150.243C323.539 149.149 323.213 147.994 322.912 146.777C322.58 145.431 322.338 144.282 322.186 143.331C322.033 142.38 321.887 141.509 321.747 140.72C321.633 139.924 321.477 139.125 321.279 138.322C321.164 137.856 321.169 137.429 321.293 137.042C321.436 136.622 321.741 136.354 322.207 136.239C322.777 136.099 323.313 136.213 323.816 136.584C324.339 136.921 324.716 137.556 324.946 138.488C325.125 139.213 325.255 139.909 325.337 140.575C325.419 141.242 325.527 142.012 325.66 142.885C325.813 143.727 326.055 144.82 326.387 146.167C326.617 147.099 326.822 147.872 327.001 148.487C327.206 149.096 327.379 149.63 327.52 150.089C327.687 150.543 327.835 150.973 327.963 151.381C328.117 151.783 328.254 152.229 328.376 152.721C328.561 153.472 328.537 154.041 328.303 154.428C328.069 154.816 327.758 155.057 327.369 155.153ZM330 164.145C329.068 164.375 328.231 164.32 327.488 163.982C326.739 163.617 326.249 162.969 326.019 162.037C325.847 161.338 325.929 160.727 326.267 160.204C326.605 159.681 327.085 159.343 327.706 159.19C328.871 158.902 329.776 159.009 330.422 159.509C331.093 160.002 331.527 160.65 331.725 161.453C331.86 161.997 331.8 162.533 331.546 163.063C331.318 163.586 330.803 163.947 330 164.145Z" },
];

// ---------------------------------------------------------------------------
// Pen paths — index 9 (diagonal) and 10 (tip) detach and fly toward the text.
// Right wrist circle (index 8) stays on the figure as the hand.
// ---------------------------------------------------------------------------
const PEN_PATHS = [
  CLEAN[9],
  CLEAN[10],
];

// CLEAN without the two pen paths (they are rendered in the fixed overlay when falling)
const CLEAN_NO_PEN = CLEAN.filter((_, i) => i !== 9 && i !== 10);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function ScrollFigure() {
  const heroRef        = useRef<HTMLDivElement>(null);
  const mobileSvgRef   = useRef<SVGSVGElement | null>(null);
  const desktopSvgRef  = useRef<SVGSVGElement | null>(null);
  const getActiveSvg = () => {
    // md breakpoint = 768px
    return window.innerWidth < 768 ? mobileSvgRef.current : desktopSvgRef.current;
  };
  const [t, setT] = useState(0);
  const [vh, setVh] = useState(600);
  // penTarget holds the live viewport rect of #selected-work, plus the
  // tSection progress (0→1) as that element scrolls from vh into view.
  // penStart is measured from the figure SVG itself once it settles (t≈1).
  const [penTarget, setPenTarget] = useState({ x: 0, y: 0, tSection: 0 });
  const [penStart,  setPenStart]  = useState<{ cx: number; cy: number; w: number; h: number } | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const h = window.innerHeight;
      setVh(h);
      const rect = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / h));
      setT(p);

      // Live rect of the "selected work" eyebrow
      const target = document.getElementById('selected-work');
      if (target) {
        const tr = target.getBoundingClientRect();
        const landedY = h * 0.2;
        const tSec = Math.min(1, Math.max(0, (h - tr.top) / (h - landedY)));
        setPenTarget({ x: tr.left, y: tr.top, tSection: tSec });
      }

      // Measure pen position from whichever SVG is currently visible.
      const activeSvg = getActiveSvg();
      if (activeSvg) {
        const svgEl = activeSvg;
        const svgRect = svgEl.getBoundingClientRect();
        const scale = svgRect.width / 448;
        // Pen paths bounding box in viewBox space (absolute Icon.svg coords)
        const vbX0 = 326.143, vbY0 = 186.366, vbX1 = 344.062, vbY1 = 204.286;
        const cx = svgRect.left + (vbX0 + vbX1) / 2 * scale;
        const cy = svgRect.top  + (vbY0 + vbY1) / 2 * scale;
        const w  = (vbX1 - vbX0) * scale;
        const h2 = (vbY1 - vbY0) * scale;
        setPenStart(ps =>
          ps && Math.abs(ps.cx - cx) < 0.5 ? ps : { cx, cy, w, h: h2 }
        );
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const e = easeInOut(t);
  const svgSize = lerp(vh * 0.9, 320, e);
  const headlineOpacity = Math.max(0, (t - 0.35) / 0.5);
  const figureX = lerp(0, -22, e);
  const textX   = lerp(40, 0, e);

  // ---------------------------------------------------------------------------
  // Pen — two-phase journey:
  //
  // Phase 1 (tSection === 0): pen paths are rendered inside the figure SVG
  //   itself — perfect alignment, no coordinate math needed.
  //
  // Phase 2 (tSection > 0): pen detaches. Start position is measured directly
  //   from the SVG DOM (penStart), so the fixed-layer SVG begins exactly where
  //   the in-figure paths were.
  // ---------------------------------------------------------------------------

  const isFalling = penTarget.tSection > 0;
  const ePen = easeInOut(penTarget.tSection);

  // Phase-2 start: use DOM-measured position if available, else reasonable fallback
  const fallStart = penStart ?? { cx: 0, cy: 0, w: 14, h: 20 };

  // Target centre: just left of "selected work", vertically on its baseline
  const penTargetCX = penTarget.x - fallStart.w / 2 - 8;
  const penTargetCY = penTarget.y + fallStart.h / 2;

  const penFixedCX = lerp(fallStart.cx, penTargetCX, ePen);
  const penFixedCY = lerp(fallStart.cy, penTargetCY, ePen);
  const penFixedX  = penFixedCX - fallStart.w / 2;
  const penFixedY  = penFixedCY - fallStart.h / 2;

  // Rotation: tumbles during fall only
  const penRotate = lerp(0, 360, ePen);

  // Opacity: fully visible at detach, fades out over last 20% of fall.
  // Guard with penStart to prevent a flash at (0,0) before measurement.
  const penOpacity = penStart ? Math.max(0, 1 - (penTarget.tSection - 0.8) / 0.2) : 0;

  return (
    <section ref={heroRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

        {/* ── Mobile layout: figure above, text below ── */}
        <div className="flex md:hidden flex-col items-center justify-center w-full px-6 gap-6">
          <div style={{ flexShrink: 0 }}>
            <svg
              ref={mobileSvgRef}
              viewBox="0 0 448 465.914"
              style={{ width: svgSize, maxWidth: "90vw" }}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <g opacity={1 - e}>
                {MESSY.map((s, i) => (
                  <path key={i} d={s.d} stroke={s.color} strokeWidth={s.sw} />
                ))}
              </g>
              <g opacity={e}>
                {CLEAN_NO_PEN.map((s, i) => (
                  <path key={i} d={s.d} stroke={s.sw > 0 ? s.color : "none"} strokeWidth={s.sw} fill={s.fill ?? "none"} />
                ))}
                {!isFalling && PEN_PATHS.map((s, i) => (
                  <path key={i} d={s.d} stroke={s.sw > 0 ? s.color : "none"} strokeWidth={s.sw} fill={s.fill ?? "none"} />
                ))}
              </g>
            </svg>
          </div>
          <div
            className="pointer-events-none text-center"
            style={{ opacity: headlineOpacity }}
          >
            <h1 className="font-bold text-balance text-4xl leading-[1.1] text-foreground sm:text-5xl">
              I&apos;m <span style={{ textDecoration: 'underline', textDecorationStyle: 'wavy', textDecorationColor: 'oklch(0.62 0.1 230 / 0.35)', textUnderlineOffset: '4px', textDecorationThickness: '1px' }}>Enya</span>.{" "}
              <span className="block">
                I design <em className="not-italic text-accent">clarity</em> in complexity.
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Currently working on <WhiteboardWord />
            </p>
          </div>
        </div>

        {/* ── Desktop layout: figure left, text right (original) ── */}
        <div className="hidden md:flex relative w-full max-w-5xl items-center justify-center px-8">
          <div style={{ transform: `translateX(${figureX}vw)`, flexShrink: 0 }}>
            <svg
              ref={desktopSvgRef}
              viewBox="0 0 448 465.914"
              style={{ width: svgSize, maxWidth: "90vw" }}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <g opacity={1 - e}>
                {MESSY.map((s, i) => (
                  <path key={i} d={s.d} stroke={s.color} strokeWidth={s.sw} />
                ))}
              </g>
              <g opacity={e}>
                {CLEAN_NO_PEN.map((s, i) => (
                  <path key={i} d={s.d} stroke={s.sw > 0 ? s.color : "none"} strokeWidth={s.sw} fill={s.fill ?? "none"} />
                ))}
                {!isFalling && PEN_PATHS.map((s, i) => (
                  <path key={i} d={s.d} stroke={s.sw > 0 ? s.color : "none"} strokeWidth={s.sw} fill={s.fill ?? "none"} />
                ))}
              </g>
            </svg>
          </div>

          {/* Headline */}
          <div
            className="pointer-events-none absolute"
            style={{
              opacity: headlineOpacity,
              transform: `translateX(${textX}vw)`,
              left: "50%",
              maxWidth: "46%",
            }}
          >
            <h1 className="font-bold text-balance text-4xl leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
              I&apos;m <span style={{ textDecoration: 'underline', textDecorationStyle: 'wavy', textDecorationColor: 'oklch(0.62 0.1 230 / 0.35)', textUnderlineOffset: '4px', textDecorationThickness: '1px' }}>Enya</span>.{" "}
              <span className="block">
                I design <em className="not-italic text-accent">clarity</em> in complexity.
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Currently working on <WhiteboardWord />
            </p>
          </div>
        </div>

        {/* Bottom caret */}
        <div
          className="pointer-events-none absolute bottom-16 md:bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground/70"
          style={{ opacity: Math.max(0, 1 - t) }}
        >
          ↓ scroll to focus
        </div>
      </div>

      {/* Ink streak — faint trail, fades out as pen approaches its landing spot */}
      {isFalling && penStart && penTarget.tSection < 1 && (
        <svg
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 51,
            overflow: "visible",
            // fade the whole streak to 0 over the last 20% of the fall
            opacity: Math.max(0, 1 - (penTarget.tSection - 0.8) / 0.2),
          }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="streak-grad"
              x1={fallStart.cx} y1={fallStart.cy}
              x2={penFixedCX}   y2={penFixedCY}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"   stopColor={BLUE} stopOpacity={0.18} />
              <stop offset="100%" stopColor={BLUE} stopOpacity={0}    />
            </linearGradient>
          </defs>
          <line
            x1={fallStart.cx} y1={fallStart.cy}
            x2={penFixedCX}   y2={penFixedCY}
            stroke="url(#streak-grad)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Pen — fixed layer only during phase 2 (falling) */}
      {isFalling && (
        <svg
          viewBox="326.143 186.366 17.919 17.92"
          style={{
            position: "fixed",
            width: fallStart.w,
            height: fallStart.h,
            left: penFixedX,
            top: penFixedY,
            opacity: penOpacity,
            transform: `rotate(${penRotate}deg)`,
            transformOrigin: "50% 50%",
            pointerEvents: "none",
            zIndex: 52,
          }}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {PEN_PATHS.map((s, i) => (
            <path key={i} d={s.d} stroke={s.sw > 0 ? s.color : "none"} strokeWidth={s.sw} fill={s.fill ?? "none"} />
          ))}
        </svg>
      )}
    </section>
  );
}
