export type Player = {
  name: string;
  wins: number;
  losses: number;
};

export type RankedPlayer = Player & {
  gamesPlayed: number;
  winPercentage: number | null;
  rank: number | 'Unranked';
};

export type PlayerStatus =
  | 'Undefeated'
  | 'Winning record'
  | 'Even record'
  | 'Comeback needed'
  | 'Still chasing first win'
  | 'Not ranked yet';

export const getGamesPlayed = (player: Player): number => player.wins + player.losses;

export const getWinPercentage = (player: Player): number | null => {
  const gamesPlayed = getGamesPlayed(player);

  if (gamesPlayed === 0) {
    return null;
  }

  return player.wins / gamesPlayed;
};

export const formatWinPercentage = (winPercentage: number | null): string => {
  if (winPercentage === null) {
    return '—';
  }

  return `${(winPercentage * 100).toFixed(1)}%`;
};

const compareRankedPlayers = (a: RankedPlayer, b: RankedPlayer): number => {
  const aPercentage = a.winPercentage ?? 0;
  const bPercentage = b.winPercentage ?? 0;

  if (bPercentage !== aPercentage) {
    return bPercentage - aPercentage;
  }

  if (b.wins !== a.wins) {
    return b.wins - a.wins;
  }

  if (a.losses !== b.losses) {
    return a.losses - b.losses;
  }

  return a.name.localeCompare(b.name);
};

export const getRankedPlayers = (players: Player[]): RankedPlayer[] => {
  const activePlayers = players
    .filter((player) => getGamesPlayed(player) > 0)
    .map((player) => ({
      ...player,
      gamesPlayed: getGamesPlayed(player),
      winPercentage: getWinPercentage(player),
      rank: 0 as number | 'Unranked',
    }))
    .sort(compareRankedPlayers)
    .map((player, index) => ({ ...player, rank: index + 1 }));

  const unrankedPlayers = players
    .filter((player) => getGamesPlayed(player) === 0)
    .map((player) => ({
      ...player,
      gamesPlayed: 0,
      winPercentage: null,
      rank: 'Unranked' as const,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...activePlayers, ...unrankedPlayers];
};

export const getPlayerRank = (player: Player, players: Player[]): number | 'Unranked' => {
  const rankedPlayer = getRankedPlayers(players).find(({ name }) => name === player.name);

  return rankedPlayer?.rank ?? 'Unranked';
};

export const getPlayerStatus = (player: Player): PlayerStatus => {
  const gamesPlayed = getGamesPlayed(player);
  const winPercentage = getWinPercentage(player);

  if (gamesPlayed === 0) {
    return 'Not ranked yet';
  }

  if (winPercentage === 1) {
    return 'Undefeated';
  }

  if (winPercentage !== null && winPercentage > 0.5) {
    return 'Winning record';
  }

  if (winPercentage === 0.5) {
    return 'Even record';
  }

  if (player.wins === 0 && player.losses >= 1) {
    return 'Still chasing first win';
  }

  return 'Comeback needed';
};

export const getRecord = (player: Player): string => `${player.wins}–${player.losses}`;
