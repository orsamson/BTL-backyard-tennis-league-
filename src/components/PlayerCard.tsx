import { formatWinPercentage, getGamesPlayed, getPlayerRank, getPlayerStatus, getRecord, getWinPercentage, type Player } from '../lib/standings';

type PlayerCardProps = {
  player: Player;
  players: Player[];
};

export function PlayerCard({ player, players }: PlayerCardProps) {
  const rank = getPlayerRank(player, players);
  const gamesPlayed = getGamesPlayed(player);
  const winPercentage = getWinPercentage(player);
  const status = getPlayerStatus(player);

  const stats = [
    ['Wins', player.wins],
    ['Losses', player.losses],
    ['Games', gamesPlayed],
    ['Win %', formatWinPercentage(winPercentage)],
  ];

  return (
    <article className="relative min-w-0 overflow-hidden rounded-[2rem] border border-lime-300/20 bg-lime-300/[0.07] p-5 shadow-2xl shadow-lime-950/20 sm:p-6">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-lime-300/10 blur-3xl" />
      <div className="relative flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between xl:flex-col">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-lime-200">Player profile</p>
          <h3 className="mt-2 break-words text-3xl font-black tracking-tight text-white sm:text-4xl xl:text-3xl">{player.name}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-lime-300 px-3 py-1 text-sm font-black text-zinc-950">
              {typeof rank === 'number' ? `Rank #${rank}` : 'Unranked'}
            </span>
            <span className="min-w-0 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-bold text-white">{status}</span>
          </div>
        </div>
        <div className="w-full min-w-0 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-center sm:w-auto xl:w-full">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Record</p>
          <p className="mt-1 font-mono text-3xl font-black text-white sm:text-4xl xl:text-3xl">{getRecord(player)}</p>
        </div>
      </div>

      <div className="relative mt-6 grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-2">
        {stats.map(([label, value]) => (
          <div className="min-w-0 rounded-2xl border border-white/10 bg-zinc-950/45 p-3 sm:p-4 xl:p-3" key={label}>
            <p className="min-w-0 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-zinc-500 sm:text-xs xl:text-[0.68rem]">{label}</p>
            <p className="mt-2 min-w-0 text-xl font-black leading-tight text-white sm:text-2xl xl:text-xl">{value}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
