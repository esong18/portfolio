export function Footer() {
  return (
    <footer className="px-6 md:px-12 py-16 border-t border-border max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-handwritten text-accent/70 text-lg mb-1">say hello</p>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Let&apos;s work together.
          </h2>
          <a
            href="mailto:esong4318@gmail.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 underline underline-offset-4"
          >
            esong4318@gmail.com
          </a>
        </div>

        <nav aria-label="Social links">
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/enyasong/' },
              { label: 'Email', href: 'mailto:esong4318@gmail.com' },
              { label: 'Resume', href: '/Enya%20Song%20Resume.pdf' },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-foreground transition-colors duration-200"
                  aria-label={`Visit ${link} profile`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

    </footer>
  )
}
