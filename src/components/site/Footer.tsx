export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-14 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <span className="text-sm font-medium uppercase tracking-[0.2em]">NAME</span>

        <div className="flex gap-6">
          {[
            ["Shop", "#shop"],
            ["Custom", "#custom"],
            ["About", "#about"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>

        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="signup" className="sr-only">
            Email
          </label>
          <input
            id="signup"
            type="email"
            placeholder="Email"
            className="w-48 rounded-full border border-border bg-surface px-4 py-2 text-sm outline-none transition-colors duration-150 focus:border-primary"
          />
          <button
            type="submit"
            className="rounded-full border border-border px-4 py-2 text-sm transition-colors duration-150 hover:border-foreground/50"
          >
            Join
          </button>
        </form>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} NAME
      </p>
    </footer>
  );
}
