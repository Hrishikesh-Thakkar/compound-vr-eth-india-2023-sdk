import { init } from "@airstack/node";
import calculatingScore from "./src/airstack/score.js";

import fetchPoapsData from "./src/airstack/functions/fetchPoapsData.js";
import fetchFarcasterFollowings from "./src/airstack/functions/fetchFarcasterFollowings.js";
import fetchLensFollowings from "./src/airstack/functions/fetchLensFollowings.js";
import fetchFarcasterFollowers from "./src/airstack/functions/fetchFarcasterFollowers.js";
import fetchLensFollowers from "./src/airstack/functions/fetchLensFollowers.js";
import fetchTokenSent from "./src/airstack/functions/fetchTokenSent.js";
import fetchTokenReceived from "./src/airstack/functions/fetchTokenReceived.js";
import fetchEthNft from "./src/airstack/functions/fetchEthNft.js";
import fetchPolygonNft from "./src/airstack/functions/fetchPolygonNft.js";
import fetchBaseNft from "./src/airstack/functions/fetchBaseNft.js";

init(process.env.AIRSTACK_API_KEY);

const fetchOnChainGraphData = async (address) => {
  let recommendedUsers = [];
  const fetchFunctions = [
    fetchPoapsData,
    // fetchFarcasterFollowings,
    // fetchLensFollowings,
    // fetchFarcasterFollowers,
    // fetchLensFollowers,
    // fetchTokenSent,
    // fetchTokenReceived,
    // fetchEthNft,
    // fetchPolygonNft,
    fetchBaseNft,
  ];
  for (const func of fetchFunctions) {
    recommendedUsers = await func(address, recommendedUsers);
  }
  return recommendedUsers;
};

const onChainGraphUsers = await fetchOnChainGraphData("rahul7668gupta.eth");
const onChainGraphUsersWithScore = onChainGraphUsers.map(user => calculatingScore(user));
console.log(onChainGraphUsersWithScore);