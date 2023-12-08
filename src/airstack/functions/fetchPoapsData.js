import { init, fetchQueryWithPagination } from "@airstack/node"; // or @airstack/airstack-react for frontend javascript
import formatPoapsData from "../utils/formatPoapsData.js";

// get your API key at https://app.airstack.xyz/profile-settings/api-keys


const userPoapsEventIdsQuery = `
query MyQuery {
  Poaps(input: {filter: {owner: {_eq: "vitalik.eth"}}, blockchain: ALL}) {
    Poap {
      eventId
      poapEvent {
        isVirtualEvent
      }
    }
  }
}
`;

const poapsByEventIdsQuery = `
query MyQuery($eventIds: [String!]) {
  Poaps(input: {filter: {eventId: {_in: $eventIds}}, blockchain: ALL}) {
    Poap {
      eventId
      poapEvent {
        eventName
        contentValue {
          image {
            extraSmall
          }
        }
      }
      attendee {
        owner {
          addresses
          domains {
            name
            isPrimary
          }
          socials {
            dappName
            blockchain
            profileName
            profileImage
            profileTokenId
            profileTokenAddress
          }
          xmtp {
            isXMTPEnabled
          }
        }
      }
    }
  }
}
`;

const fetchPoapsData = async (address, existingUsers = []) => {
  let poapsDataResponse;
  let recommendedUsers = [...existingUsers];
  while (true) {
    if (!poapsDataResponse) {
      // Paagination #1: Fetch All POAPs
      poapsDataResponse = await fetchQueryWithPagination(
        userPoapsEventIdsQuery,
        {
          user: address,
        }
      );
    }
    const {
      data: poapsData,
      error: poapsError,
      hasNextPage: poapsHasNextPage,
      getNextPage: poapsGetNextPage,
    } = poapsDataResponse ?? {};
    if (!poapsError) {
      const eventIds =
        poapsData?.Poaps.Poap?.filter(
          (poap) => !poap?.poapEvent?.isVirtualEvent
        ).map((poap) => poap?.eventId) ?? [];
      let poapHoldersDataResponse;
      if (eventIds.length === 0) break;
      if (!poapHoldersDataResponse) {
        // Pagination #2: Fetch All POAP holders
        poapHoldersDataResponse = await fetchQueryWithPagination(
          poapsByEventIdsQuery,
          {
            eventIds,
          }
        );
      }
      const {
        data: poapHoldersData,
        error: poapHoldersError,
        hasNextPage: poapHoldersHasNextPage,
        getNextPage: poapHoldersGetNextPage,
      } = poapHoldersDataResponse;
      if (!poapHoldersError) {
        recommendedUsers = [
          ...formatPoapsData(poapHoldersData?.Poaps?.Poap, recommendedUsers),
        ];
        if (!poapHoldersHasNextPage) {
          break;
          // } else {
          //   poapHoldersDataResponse = await poapHoldersGetNextPage();
        }
      } else {
        console.error("Error: ", poapHoldersError);
        break;
      }
      // if (!poapsHasNextPage) {
      break;
      //   } else {
      //     poapsDataResponse = await poapsGetNextPage();
      // }
    } else {
      console.error("Error: ", poapsError);
      break;
    }
  }
  return recommendedUsers;
};

export default fetchPoapsData;