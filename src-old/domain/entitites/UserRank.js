export class UserRank {
  constructor(
    boardId,
    id,
    maxRank,
    maxRankPoints,
    platformFamily,
    rank,
    rankPoints,
    seasonId,
    topRankPosition,
    deaths,
    kills,
    abandons,
    wins,
    losses
  ) {
    (this.boardId = boardId),
      (this.id = id),
      (this.maxRank = maxRank),
      (this.maxRankPoints = maxRankPoints),
      (this.platformFamily = platformFamily),
      (this.rank = rank),
      (this.rankPoints = rankPoints),
      (this.seasonId = seasonId),
      (this.topRankPosition = topRankPosition),
      (this.deaths = deaths),
      (this.kills = kills),
      (this.abandons = abandons),
      (this.wins = wins),
      (this.losses = losses);
  }
}
