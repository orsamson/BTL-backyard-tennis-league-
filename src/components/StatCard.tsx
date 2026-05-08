type StatCardProps = {
  eyebrow: string;
  value: string;
  detail: string;
  accent?: 'green' | 'white';
};

export function StatCard({ eyebrow, value, detail, accent = 'green' }: StatCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/30 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-lime-300/40 hover:bg-white/[0.075]">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-lime-300/60 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">{eyebrow}</p>
          <h3 className="mt-4 text-3xl font-black tracking-tight text-white">{value}</h3>
        </div>
        <span
          className={`mt-1 h-3 w-3 rounded-full ${
            accent === 'green' ? 'bg-lime-300 shadow-[0_0_24px_rgba(190,242,100,0.8)]' : 'bg-white/80'
          }`}
        />
      </div>
      <p className="mt-3 text-sm font-medium text-zinc-300">{detail}</p>
    </article>
  );
}
