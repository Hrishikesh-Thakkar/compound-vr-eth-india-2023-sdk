function transformData(inputData) {
  const nodes = [];
  const links = [];

  inputData.forEach((user, userIndex) => {
    user.addresses.forEach((address, addressIndex) => {
      const addressId = `address${userIndex + 1}_${addressIndex + 1}`;
      const addressNode = {
        id: addressId,
        name: address,
        val: 10, // You can adjust this value as needed
      };

      nodes.push(addressNode);

      // Link address to NFTs
      if (user.nfts) {
        user.nfts.forEach((nft, nftIndex) => {
          const nftId = `nft${userIndex + 1}_${addressIndex + 1}_${nftIndex + 1}`;
          const nftNode = {
            id: nftId,
            name: nft.name,
            val: 15, // You can adjust this value as needed
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
            val: 20, // You can adjust this value as needed
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

export default transformData;