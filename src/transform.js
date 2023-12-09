import { calculatingScore } from "./airstack/score.js";
import { getPreferredProfileImage } from "../utils/utils.js";

function transformData(inputData, limit = 10, scoringMutiplier = 1) {
  const nodes = [];
  const links = [];

  // sort input data by score
  inputData.sort((a, b) => {
    return b._score - a._score
  });

  // limit input data
  if (inputData.length > limit) {
    inputData = inputData.slice(0, limit);
  }

  inputData.forEach((user, userIndex) => {
    user.addresses.forEach((address, addressIndex) => {
      const addressId = `address${userIndex + 1}_${addressIndex + 1}`;
      const userImage = getPreferredProfileImage(user.socials);
      const addressNode = {
        id: addressId,
        type: "address",
        name: address,
        value: user._score ? user._score * scoringMutiplier : 0,
        image: userImage,
      };

      nodes.push(addressNode);

      // Link address to NFTs
      if (user.nfts) {
        user.nfts.forEach((nft) => {
          const nftId = nft.tokenAddress;
          const nftNode = {
            id: nftId,
            type: 'nft',
            name: nft.name,
            value: user._score || 0,
            image: nft.image,
            tokenAddress: nft.address,
            tokenId: nft.tokenId,
            blockchain: nft.blockchain,
          };

          nodes.push(nftNode);

          const linkToNft = {
            source: addressId,
            target: nftId,
          };

          links.push(linkToNft);
        });
      }

      // Link address to POAPs
      if (user.poaps) {
        user.poaps.forEach((poap) => {
          const poapId = poap.eventId;
          const poapNode = {
            id: poapId,
            type: "poap",
            name: poap.name,
            value: user._score || 0,
            image: poap.image,
            blockchain: poap.blockchain,
            eventId: poap.eventId,
          };

          nodes.push(poapNode);

          const linkToPoap = {
            source: addressId,
            target: poapId,
          };

          links.push(linkToPoap);
        });
      }
    });
  });

  return { nodes, links };
}

function createAddressMap(inputData) {
  const addressMap = new Map();

  inputData.forEach((user, userIndex) => {
    if (user.addresses) {
      user.addresses.forEach((address, addressIndex) => {
        const addressKey = `address${userIndex + 1}_${addressIndex + 1}`;
        addressMap.set(address, {
          key: addressKey,
          user: user,
        });
      });
    }
  });

  return addressMap;
}

export { transformData, createAddressMap, calculatingScore };