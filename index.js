import { init } from "@airstack/node";
import fs from 'fs';
// import calculatingScore from "./src/airstack/score.js";
import transformData from "./src/transform.js";

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

// init(process.env.AIRSTACK_API_KEY);

const fetchOnChainGraphData = async (address) => {
  let recommendedUsers = [];
  const fetchFunctions = [
    fetchPoapsData,
    fetchFarcasterFollowings,
    fetchFarcasterFollowers,
    fetchLensFollowings,
    fetchLensFollowers,
    fetchTokenSent,
    fetchTokenReceived,
    fetchEthNft,
    fetchPolygonNft,
    fetchBaseNft,
  ];
  for (const func of fetchFunctions) {
    recommendedUsers = await func(address, recommendedUsers);
  }
  return recommendedUsers;
};

// const onChainGraphUsers = await fetchOnChainGraphData("rahul7668gupta.eth");
// const onChainGraphUsersWithScore = onChainGraphUsers.map(user => calculatingScore(user));
// console.log(onChainGraphUsersWithScore.length);

function writeArrayToFile(array, fileName) {
  const data = JSON.stringify(array, null, 2);

  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log(`Array successfully written to ${fileName}`);
    }
  });
}

const readJsonArrayFromFile = (filePath) => {
  try {
    // Read the file synchronously
    const jsonData = fs.readFileSync(filePath, 'utf8');

    // Parse the JSON data
    const jsonArray = JSON.parse(jsonData);

    // Check if the parsed data is an array
    if (Array.isArray(jsonArray)) {
      return jsonArray;
    } else {
      throw new Error('The content of the file is not a JSON array.');
    }
  } catch (error) {
    console.error(`Error reading JSON array from file: ${error.message}`);
    return null;
  }
};

// Example usage
// writeArrayToFile(onChainGraphUsersWithScore, 'output.json');

let jsonArray = readJsonArrayFromFile('output.json');

// Example usage with the provided data
const outputData = transformData(jsonArray);
writeArrayToFile(outputData, 'transformed.json');
