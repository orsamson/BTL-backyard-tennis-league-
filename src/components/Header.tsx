type HeaderProps = {
  lastUpdated: string;
};

export function Header({ lastUpdated }: HeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 px-6 py-8 shadow-2xl shadow-black/40 sm:px-8 lg:px-10 lg:py-12">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(190,242,100,0.14),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.18),transparent_28%)]" />
      <div className="absolute -right-12 top-8 h-40 w-72 rotate-[-18deg] rounded-full border border-lime-300/20" />
      <div className="absolute -right-16 top-20 h-40 w-72 rotate-[-18deg] rounded-full border border-white/10" />
      <div className="absolute bottom-0 left-8 h-24 w-px bg-lime-300/25" />
      <div className="absolute bottom-12 left-0 h-px w-44 bg-lime-300/25" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-lime-300/20 bg-lime-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-lime-200">
            <span className="h-2 w-2 rounded-full bg-lime-300" /> Season 1
          </div>
          <h1 className="text-7xl font-black leading-none tracking-[-0.08em] text-white sm:text-8xl lg:text-9xl">BTL</h1>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">Backyard Tennis League</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
            Current standings, player records, and rankings.
          </p>
        </div>
        <div className="w-fit rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-left backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">Last updated</p>
          <p className="mt-1 text-lg font-bold text-white">{lastUpdated}</p>
        </div>
      </div>
    </header>
  );
}
