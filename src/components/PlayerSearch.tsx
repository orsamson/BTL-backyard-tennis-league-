import { useMemo, useState } from 'react';
import { PlayerCard } from './PlayerCard';
import type { Player } from '../lib/standings';

type PlayerSearchProps = {
  players: Player[];
};

export function PlayerSearch({ players }: PlayerSearchProps) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();

  const matchedPlayer = useMemo(
    () => players.find((player) => player.name.toLowerCase() === normalizedQuery),
    [normalizedQuery, players],
  );

  const hasSearched = normalizedQuery.length > 0;

  return (
    <section className="rounded-[2rem] border border-white/10 bg-zinc-950/75 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-6">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-lime-200">Find your line</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-white">Player Search</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">Type a player name to view rank, record, and season status.</p>
      </div>

      <label className="block">
        <span className="sr-only">Search player name</span>
        <input
          className="w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-lg font-semibold text-white outline-none transition placeholder:text-zinc-600 focus:border-lime-300/60 focus:ring-4 focus:ring-lime-300/10"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, e.g. Or"
          type="search"
          value={query}
        />
      </label>

      <div className="mt-5">
        {matchedPlayer ? <PlayerCard player={matchedPlayer} players={players} /> : null}
        {hasSearched && !matchedPlayer ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.035] p-8 text-center">
            <p className="text-lg font-bold text-white">Player not found.</p>
            <p className="mt-2 text-sm text-zinc-400">Check the spelling or try another name.</p>
          </div>
        ) : null}
        {!hasSearched ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-sm text-zinc-400">
            Available players: {players.map((player) => player.name).join(', ')}.
          </div>
        ) : null}
      </div>
    </section>
  );
}
