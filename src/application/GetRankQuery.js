import GetRankQueryHandler from '../infrastructure/GetRankQueryHandler';

const GetRankQuery = async rank => {
  try {
    return await GetRankQueryHandler(rank);
  } catch (error) {
    console.log(error);
  }
};

export default GetRankQuery;
