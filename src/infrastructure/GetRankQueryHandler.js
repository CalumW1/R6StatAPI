import { Ranks } from '../utils/HelperFunctions.js';
import { Rank } from '../domain/entitites/Rank.js';

export const GetRankQueryHandler = async rank => {
  var foundRank = Ranks.find(x => x.name == rank);

  return new Rank(
    foundRank.image,
    foundRank.minimumRankPoints,
    foundRank.maximumRankPoints,
    foundRank.name
  );
};
