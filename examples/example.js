import { writeArrayToFile, readJsonArrayFromFile, writeMapToFile } from "../utils/utils.js";
import {
  calculatingScore,
  transformData,
  createAddressMap,
  airstack,
  fetchOnChainGraphData,
  fetchNftDetails,
  fetchPoapEventDetails
} from "../index.js";

airstack.init(process.env.AIRSTACK_API_KEY);

// example: fetch onchain graph data
const onChainGraphUsers = await fetchOnChainGraphData(process.env.IDENTITY_OR_ADDRESS);
const onChainGraphUsersWithScore = onChainGraphUsers.map(user => calculatingScore(user));
console.log(onChainGraphUsersWithScore.length);

// write onchain graph data to file
writeArrayToFile(onChainGraphUsersWithScore, 'output.json');

// read onchain graph data from file
let jsonArray = readJsonArrayFromFile('output.json');

// transform onchain graph data to match the format of the visualisation tool
const outputData = transformData(jsonArray, 10, 10);
writeArrayToFile(outputData, 'transformed.json');

const addressMap = createAddressMap(jsonArray);
writeMapToFile(addressMap, 'addressMap.json');

// example: fetch nft details by contract address and token id, blockchain
let nft = await fetchNftDetails("0xdb46d1dc155634fbc732f92e853b10b288ad5a1d", "51228", "polygon");
console.log(nft);

// example: fetch poap event details by event id, network
let poapEvent = await fetchPoapEventDetails("ethereum", "15")
console.log(poapEvent);