import { Header } from './components/Header';
import { PlayerSearch } from './components/PlayerSearch';
import { StandingsTable } from './components/StandingsTable';
import { StatCard } from './components/StatCard';
import { lastUpdated, players } from './data/standings';
import { getGamesPlayed, getRankedPlayers, getRecord } from './lib/standings';

const rankedPlayers = getRankedPlayers(players);
const activePlayers = rankedPlayers.filter((player) => player.rank !== 'Unranked');
const leagueLeader = activePlayers[0];
const bestRecord = activePlayers.find((player) => player.losses === 0) ?? leagueLeader;
const mostWins = [...rankedPlayers].sort((a, b) => b.wins - a.wins || a.losses - b.losses)[0];
const totalPlayerResults = players.reduce((total, player) => total + getGamesPlayed(player), 0);

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050806] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(190,242,100,0.16),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(22,163,74,0.12),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:88px_88px]" />
      <div className="pointer-events-none fixed left-1/2 top-0 h-full w-px bg-lime-300/10" />
      <div className="pointer-events-none fixed top-1/2 h-px w-full bg-lime-300/10" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <Header lastUpdated={lastUpdated} />

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard eyebrow="#1 Player" value={leagueLeader.name} detail={`${getRecord(leagueLeader)} · ${leagueLeader.wins} wins`} />
          <StatCard eyebrow="Best Record" value={bestRecord.name} detail={`${getRecord(bestRecord)} season record`} />
          <StatCard eyebrow="Most Wins" value={mostWins.name} detail={`${mostWins.wins} wins recorded`} />
          <StatCard
            accent="white"
            eyebrow="Player Results"
            value={String(totalPlayerResults)}
            detail="Total wins and losses entered; exact match count is not assumed."
          />
        </section>

        <div className="grid min-w-0 gap-6 xl:grid-cols-[1.25fr_minmax(0,0.75fr)] xl:items-start">
        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr] xl:items-start">
          <StandingsTable players={rankedPlayers} />
          <PlayerSearch players={players} />
        </div>
      </div>
    </main>
  );
}

export default App;
