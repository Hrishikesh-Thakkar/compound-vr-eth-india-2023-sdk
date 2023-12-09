function transformData(inputData, limit = 10) {
  const nodes = [];
  const links = [];

  // sort input data by score
  inputData.sort((a, b) => b._score - a._score);

  // limit input data
  if (inputData.length > limit) {
    inputData = inputData.slice(0, limit);
  }

  inputData.forEach((user, userIndex) => {
    user.addresses.forEach((address, addressIndex) => {
      const addressId = `address${userIndex + 1}_${addressIndex + 1}`;
      const addressNode = {
        id: addressId,
        name: address,
        value: user._score || 0,
        image: user.socials ? user.socials[0]?.profileImage : undefined,
      };

      nodes.push(addressNode);

      // Link address to NFTs
      if (user.nfts) {
        user.nfts.forEach((nft, nftIndex) => {
          const nftId = `nft${userIndex + 1}_${addressIndex + 1}_${nftIndex + 1}`;
          const nftNode = {
            id: nftId,
            name: nft.name,
            value: user._score || 0,
            image: nft.image,
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
        user.poaps.forEach((poap, poapIndex) => {
          const poapId = `poap${userIndex + 1}_${addressIndex + 1}_${poapIndex + 1}`;
          const poapNode = {
            id: poapId,
            name: poap.name,
            value: user._score || 0,
            image: poap.image,
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

export { transformData, createAddressMap };