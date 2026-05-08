import { formatWinPercentage, getRecord, type RankedPlayer } from '../lib/standings';

type StandingsTableProps = {
  players: RankedPlayer[];
};

export function StandingsTable({ players }: StandingsTableProps) {
  return (
    <section className="min-w-0 rounded-[2rem] border border-white/10 bg-zinc-950/75 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-lime-200">League table</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-white">Season 1 Standings</h2>
        </div>
        <p className="text-sm text-zinc-400">Ranked players have completed at least one game.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.18em] text-zinc-400">
              <tr>
                <th className="px-5 py-4 font-bold">Rank</th>
                <th className="px-5 py-4 font-bold">Player</th>
                <th className="px-5 py-4 font-bold">Wins</th>
                <th className="px-5 py-4 font-bold">Losses</th>
                <th className="px-5 py-4 font-bold">Games Played</th>
                <th className="px-5 py-4 font-bold">Win %</th>
                <th className="px-5 py-4 font-bold">Record</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {players.map((player) => {
                const isLeader = player.rank === 1;
                const isUnranked = player.rank === 'Unranked';

                return (
                  <tr
                    className="bg-zinc-950/30 transition duration-200 hover:bg-lime-300/[0.055]"
                    key={player.name}
                  >
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex min-w-10 items-center justify-center rounded-full px-3 py-1 text-sm font-black ${
                          isLeader
                            ? 'bg-lime-300 text-zinc-950'
                            : isUnranked
                              ? 'bg-white/5 text-zinc-400'
                              : 'bg-white/10 text-white'
                        }`}
                      >
                        {typeof player.rank === 'number' ? `#${player.rank}` : 'Unranked'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-base font-bold text-white">{player.name}</td>
                    <td className="px-5 py-4 font-semibold text-zinc-200">{player.wins}</td>
                    <td className="px-5 py-4 font-semibold text-zinc-200">{player.losses}</td>
                    <td className="px-5 py-4 font-semibold text-zinc-200">{player.gamesPlayed}</td>
                    <td className="px-5 py-4 font-black text-lime-200">{formatWinPercentage(player.winPercentage)}</td>
                    <td className="px-5 py-4 font-mono text-lg font-black text-white">{getRecord(player)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
