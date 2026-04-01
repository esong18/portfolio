'use client'

export function AboutHeader() {
  return (
    <section className="relative px-6 md:px-12 pt-32 pb-10 md:pt-36 md:pb-14 max-w-6xl mx-auto">
      {/* Subtle background blob */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'oklch(0.78 0.08 225 / 0.3)' }}
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.4fr_0.6fr] gap-4 md:gap-6 items-start">
        {/* Text */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <span
            className="font-handwritten text-lg px-4 py-1.5 rounded-xl"
            style={{
              background: 'oklch(0.88 0.06 230 / 0.22)',
              border: '1.5px solid oklch(0.72 0.08 225 / 0.35)',
              boxShadow: '2px 3px 10px oklch(0.62 0.1 230 / 0.14), inset 0 1px 0 oklch(1 0 0 / 0.4)',
              color: 'oklch(0.38 0.08 230)',
            }}
          >
            hi there |˶˙ᵕ˙ )ﾉﾞ
          </span>

          <div className="leading-none">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">I'm Enya.</h1>
          </div>

          <p className="text-lg text-muted-foreground font-light max-w-xl leading-relaxed">
            I'm a Purdue University graduate with a degree in UX Design,
            <br/> 
            currently working as a Strategic Designer in New York.
          </p>
        </div>

        {/* Portrait */}
        <div
          className="relative justify-self-center overflow-hidden rounded-2xl border shadow-sm"
          style={{
            borderColor: 'oklch(0.72 0.08 225 / 0.35)',
            height: '320px',
            width: '260px',
          }}
        >
          <img
            src="/Enya%20picture.jpg"
            alt="Portrait of Enya"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 70%' }}
          />
        </div>
      </div>
    </section>
  )
}