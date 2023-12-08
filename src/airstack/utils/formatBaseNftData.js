
const formatBaseNftData = async (address, existingUsers = []) => {
  let baseNftDataResponse;
  let recommendedUsers = [...existingUsers];
  while (true) {
    if (!baseNftDataResponse) {
      // Pagination #1: Fetch Base NFTs
      baseNftDataResponse = await fetchQueryWithPagination(
        nftAddressesQuery,
        {
          user: address,
        }
      );
    }
    const {
      data: baseNftData,
      error: baseNftError,
      hasNextPage: baseNftHasNextPage,
      getNextPage: baseNftGetNextPage,
    } = baseNftDataResponse ?? {};
    if (!baseNftError) {
      const tokenAddresses =
        baseNftData?.TokenBalances?.TokenBalance?.map(
          (token) => token.tokenAddress
        ) ?? [];
      let baseNftHoldersDataResponse;
      while (true) {
        if (tokenAddresses.length === 0) break;
        if (!pbaseNftHoldersDataResponse) {
          // Pagination #2: Fetch Base NFT Holders
          baseNftHoldersDataResponse = await fetchQueryWithPagination(
            nftQuery,
            {
              tokenAddresses,
            }
          );
        }
        const {
          data: baseNftHoldersData,
          error: baseNftHoldersError,
          hasNextPage: baseNftHoldersHasNextPage,
          getNextPage: baseNftHoldersGetNextPage,
        } = baseNftHoldersDataResponse;
        if (!baseNftHoldersError) {
          recommendedUsers = [
            ...formatBaseNftData(
              baseNftHoldersData?.TokenBalances?.TokenBalance,
              recommendedUsers
            ),
          ];
          if (!baseNftHoldersHasNextPage) {
            break;
            // } else {
            //   baseNftHoldersDataResponse =
            //     await baseNftHoldersGetNextPage();
          }
        } else {
          console.error("Error: ", baseNftHoldersError);
          break;
        }
      }
      if (!baseNftHasNextPage) {
        break;
      } else {
        baseNftDataResponse = await baseNftGetNextPage();
      }
    } else {
      console.error("Error: ", baseNftError);
      break;
    }
  }
  return recommendedUsers;
};

export default formatBaseNftData;