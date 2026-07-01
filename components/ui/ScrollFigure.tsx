'use client'

import { useEffect, useRef, useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// Whiteboard erase-and-rewrite cycling text
// ---------------------------------------------------------------------------
const WHITEBOARD_PHRASES = [
  'service design projects',
  'interaction design work',
  'user research initiatives',
  'business strategy development',
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
const BLUE = "oklch(0.62 0.10 230)"; // --accent

// Stroke width scaled to match Figma's ~3.58px stroke at viewBox scale
const SW = 3.58;
const SW_THIN = 2.5;

// Static SVG — exact Figma geometry, no animation needed for the "clean" state.
// We keep the morph animation by lerping between a "messy" scattered version
// and the exact Figma paths. The messy state uses a parallel set of simple
// point arrays; the clean state renders the real Figma <path> data directly.

// For the scroll morph we use the same approach as before:
// at e=0 → scattered noise paths; at e=1 → exact Figma paths.
// We achieve this by using a single SVG that cross-fades opacity:
//   - "messy" layer fades out  (opacity: 1-e)
//   - "clean" layer fades in   (opacity: e)
// This is simpler and more faithful than trying to lerp bezier control points.

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Pt = [number, number];

// Messy scattered paths (simple polylines in the same 448×465.9 space)
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

// One messy stand-in per clean path — same rough centroid, enough points
const MESSY: { d: string; color: string; sw: number }[] = [
  { d: toPolyline(messyLine(6, 224, 134, 280)), color: FG,   sw: SW      }, // board
  { d: toPolyline(messyLine(5, 191, 264, 200)), color: FG,   sw: SW      }, // left leg curve
  { d: toPolyline(messyLine(5, 261, 264, 200)), color: FG,   sw: SW      }, // right leg curve
  { d: toPolyline(messyLine(4, 224, 157, 180)), color: FG,   sw: SW_THIN }, // hair arc
  { d: toPolyline(messyLine(6, 224, 185, 200)), color: FG,   sw: SW      }, // head
  { d: toPolyline(messyLine(3, 224, 226, 120)), color: FG,   sw: SW_THIN }, // center line
  { d: toPolyline(messyLine(5, 224, 283, 160)), color: FG,   sw: SW      }, // torso box
  { d: toPolyline(messyLine(4, 288, 234, 180)), color: FG,   sw: SW      }, // right arm
  { d: toPolyline(messyLine(4, 320, 211, 120)), color: BLUE, sw: SW      }, // marker big circle
  { d: toPolyline(messyLine(3, 331, 199, 100)), color: BLUE, sw: SW_THIN }, // marker diagonal
  { d: toPolyline(messyLine(3, 340, 190,  80)), color: BLUE, sw: SW_THIN }, // marker tip
  { d: toPolyline(messyLine(4, 179, 286, 160)), color: FG,   sw: SW      }, // left arm
  { d: toPolyline(messyLine(4, 166, 320, 120)), color: FG,   sw: SW      }, // left wrist circle
  { d: toPolyline(messyLine(3, 199, 372, 100)), color: FG,   sw: SW      }, // left leg
  { d: toPolyline(messyLine(3, 248, 372, 100)), color: FG,   sw: SW      }, // right leg
  { d: toPolyline(messyLine(4, 191, 415,  80)), color: FG,   sw: SW_THIN }, // left foot
  { d: toPolyline(messyLine(4, 257, 415,  80)), color: FG,   sw: SW_THIN }, // right foot
];

// Clean paths — exact Figma d= strings, translated by each vector's (x,y) in the Icon frame
const CLEAN: { tx: number; ty: number; d: string; color: string; sw: number }[] = [
  // 596 — whiteboard rectangle
  { tx: 71.68,  ty: 35.84,  sw: SW,
    color: FG,
    d: "M304.188 3.136H6.72C4.74 3.136 3.136 4.74 3.136 6.72V196.669C3.136 198.649 4.74 200.253 6.72 200.253H304.188C306.167 200.253 307.772 198.649 307.772 196.669V6.72C307.772 4.74 306.167 3.136 304.188 3.136Z" },
  // 597 — left body/leg stroke (curves inward)
  { tx: 182.64, ty: 174.72, sw: SW,
    color: FG,
    d: "M16.725 4.033C8.96 24.939 4.779 56.299 4.181 98.112C3.584 127.978 4.779 154.858 7.765 178.751" },
  // 598 — right body/leg stroke (mirrors 597)
  { tx: 252.67, ty: 174.72, sw: SW,
    color: FG,
    d: "M4.033 4.033C11.798 24.939 15.98 56.299 16.577 98.112C17.174 127.978 15.98 154.858 12.993 178.751" },
  // 599 — hair arc
  { tx: 195.33, ty: 138.88, sw: SW_THIN,
    color: FG,
    d: "M3.136 39.025C5.526 18.119 15.083 6.172 31.808 3.186C48.533 6.172 58.09 18.119 60.48 39.025" },
  // 600 — head circle
  { tx: 189.95, ty: 147.84, sw: SW,
    color: FG,
    d: "M37.184 74.815C55.988 74.815 71.231 58.769 71.231 38.976C71.231 19.182 55.988 3.136 37.184 3.136C18.38 3.136 3.136 19.182 3.136 38.976C3.136 58.769 18.38 74.815 37.184 74.815Z" },
  // 601 — center vertical line (neck)
  { tx: 224,    ty: 218.62, sw: SW_THIN,
    color: FG,
    d: "M3.584 3.584V19.712" },
  // 602 — torso box
  { tx: 185.36, ty: 234.75, sw: SW,
    color: FG,
    d: "M5.936 3.136C2.949 43.754 2.352 76.01 4.144 99.903H79.407C81.199 76.01 80.602 43.754 77.615 3.136H5.936Z" },
  // 603 — right arm reaching up
  { tx: 258.05, ty: 213.25, sw: SW,
    color: FG,
    d: "M3.584 45.696C22.698 27.777 42.709 13.739 63.615 3.585" },
  // 604 — wrist circle (black, matches left wrist)
  { tx: 311.81, ty: 202.49, sw: SW,
    color: FG,
    d: "M11.2 20.16C16.148 20.16 20.16 16.148 20.16 11.2C20.16 6.251 16.148 2.24 11.2 2.24C6.251 2.24 2.24 6.251 2.24 11.2C2.24 16.148 6.251 20.16 11.2 20.16Z" },
  // 605 — marker diagonal stroke (blue)
  { tx: 326.14, ty: 191.74, sw: SW_THIN,
    color: BLUE,
    d: "M2.688 15.232L15.232 2.688" },
  // 606 — marker tip small circle (blue)
  { tx: 336.89, ty: 186.37, sw: SW_THIN,
    color: BLUE,
    d: "M3.584 7.168C5.563 7.168 7.168 5.563 7.168 3.584C7.168 1.605 5.563 0 3.584 0C1.605 0 0 1.605 0 3.584C0 5.563 1.605 7.168 3.584 7.168Z" },
  // 607 — left arm
  { tx: 168.45, ty: 255.36, sw: SW,
    color: FG,
    d: "M25.088 3.584C13.142 21.504 5.974 40.917 3.584 61.824" },
  // 608 — left wrist circle
  { tx: 157.70, ty: 311.80, sw: SW,
    color: FG,
    d: "M11.2 20.16C16.148 20.16 20.16 16.148 20.16 11.2C20.16 6.251 16.148 2.24 11.2 2.24C6.251 2.24 2.24 6.251 2.24 11.2C2.24 16.148 6.251 20.16 11.2 20.16Z" },
  // 609 — left leg
  { tx: 195.33, ty: 329.72, sw: SW,
    color: FG,
    d: "M12.544 3.584L3.584 86.015" },
  // 610 — right leg
  { tx: 243.71, ty: 329.72, sw: SW,
    color: FG,
    d: "M3.584 3.584L12.544 86.015" },
  // 611 — left foot ellipse
  { tx: 174.72, ty: 408.57, sw: SW_THIN,
    color: FG,
    d: "M16.128 14.336C25.035 14.336 32.256 11.127 32.256 7.168C32.256 3.209 25.035 0 16.128 0C7.221 0 0 3.209 0 7.168C0 11.127 7.221 14.336 16.128 14.336Z" },
  // 612 — right foot ellipse (same shape, different position)
  { tx: 241.02, ty: 408.57, sw: SW_THIN,
    color: FG,
    d: "M16.128 14.336C25.035 14.336 32.256 11.127 32.256 7.168C32.256 3.209 25.035 0 16.128 0C7.221 0 0 3.209 0 7.168C0 11.127 7.221 14.336 16.128 14.336Z" },
];

// ---------------------------------------------------------------------------
// Pen paths — only 605 (diagonal) and 606 (tip circle) fall.
// 604 (large wrist circle) stays on the figure as the hand.
// ---------------------------------------------------------------------------
const PEN_PATHS = [
  { tx: 326.14, ty: 191.74, sw: SW_THIN, d: "M2.688 15.232L15.232 2.688" },
  { tx: 336.89, ty: 186.37, sw: SW_THIN, d: "M3.584 7.168C5.563 7.168 7.168 5.563 7.168 3.584C7.168 1.605 5.563 0 3.584 0C1.605 0 0 1.605 0 3.584C0 5.563 1.605 7.168 3.584 7.168Z" },
];

// Figure SVG omits 605 and 606 (the falling pen strokes) but keeps 604 (the wrist circle).
// CLEAN indices: 0–7 = body, 8 = wrist circle (604/FG), 9 = diagonal (605/BLUE), 10 = tip (606/BLUE), 11–16 = rest
const CLEAN_NO_PEN = CLEAN.filter((_, i) => i !== 9 && i !== 10);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function ScrollFigure() {
  const heroRef   = useRef<HTMLDivElement>(null);
  const figureSvgRef = useRef<SVGSVGElement>(null);
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

      // Once the figure is fully settled (p ≥ 0.98), measure the pen paths'
      // actual bounding box directly from the SVG DOM — zero coordinate error.
      if (p >= 0.98 && figureSvgRef.current) {
        const svgEl = figureSvgRef.current;
        const svgRect = svgEl.getBoundingClientRect();
        const scale = svgRect.width / 448;
        // Pen paths 605+606 bounding box in viewBox space: x 328.83–344.06, y 186.37–206.97
        const vbX0 = 328.83, vbY0 = 186.37, vbX1 = 344.06, vbY1 = 206.97;
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

  // Opacity: visible once landed
  const penOpacity = Math.min(1, penTarget.tSection / 0.15);

  return (
    <section ref={heroRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

        <div className="relative flex w-full max-w-5xl items-center justify-center px-8">
          {/* Figure — pen paths rendered inside during phase 1, hidden during phase 2 */}
          <div style={{ transform: `translateX(${figureX}vw)`, flexShrink: 0 }}>
            <svg
              ref={figureSvgRef}
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
                  <g key={i} transform={`translate(${s.tx}, ${s.ty})`}>
                    <path d={s.d} stroke={s.color} strokeWidth={s.sw} />
                  </g>
                ))}
                {/* Pen paths rendered in-figure during phase 1 — perfect alignment */}
                {!isFalling && PEN_PATHS.map((s, i) => (
                  <g key={i} transform={`translate(${s.tx}, ${s.ty})`}>
                    <path d={s.d} stroke={BLUE} strokeWidth={s.sw} />
                  </g>
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
              Hi! I&apos;m <span style={{ textDecoration: 'underline', textDecorationStyle: 'wavy', textDecorationColor: 'oklch(0.62 0.1 230 / 0.35)', textUnderlineOffset: '4px', textDecorationThickness: '1px' }}>Enya</span>.{" "}
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
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground/70"
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
            zIndex: 49,
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
          viewBox="326 184 21 25"
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
            zIndex: 50,
          }}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {PEN_PATHS.map((s, i) => (
            <g key={i} transform={`translate(${s.tx}, ${s.ty})`}>
              <path d={s.d} stroke={BLUE} strokeWidth={s.sw} />
            </g>
          ))}
        </svg>
      )}
    </section>
  );
}
