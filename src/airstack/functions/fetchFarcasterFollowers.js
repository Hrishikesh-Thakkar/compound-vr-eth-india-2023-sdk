import { init, fetchQueryWithPagination } from "@airstack/node"; // or @airstack/airstack-react for frontend javascript
import formatFarcasterFollowersData from "../utils/formatFarcasterFollowersData.js";

// get your API key at https://app.airstack.xyz/profile-settings/api-keys

const socialFollowersQuery = `
query MyQuery($user: Identity!) {
  SocialFollowers(
    input: {filter: {identity: {_eq: $user}, dappName: {_eq: farcaster}}, blockchain: ALL, limit: 200}
  ) {
    Follower {
      followerAddress {
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
          profileImageContentValue{
            image{
              small
              extraSmall
            }
          }
        }
        xmtp {
          isXMTPEnabled
        }
        mutualFollowing: socialFollowings(
          input: {filter: {identity: {_eq: $user}, dappName: {_eq: farcaster}}}
        ) {
          Following {
            followingAddress {
              socials {
                profileName
              }
            }
          }
        }
      }
    }
  }
}
`;

const fetchFarcasterFollowers = async (address, existingUsers = [], query = socialFollowersQuery) => {
  let res;
  let recommendedUsers = [...existingUsers];
  while (true) {
    if (!res) {
      res = await fetchQueryWithPagination(query, {
        user: address,
      });
    }
    const { data, error, hasNextPage, getNextPage } = res ?? {};
    if (!error) {
      const followings =
        data?.SocialFollowers?.Follower?.map(
          (follower) => follower.followerAddress
        ) ?? [];
      recommendedUsers = [
        ...formatFarcasterFollowersData(followings, recommendedUsers),
      ];
      if (!hasNextPage) {
        break;
      } else {
        res = await getNextPage();
      }
    } else {
      console.error("Error: ", error);
      break;
    }
  }
  return recommendedUsers;
};

export default fetchFarcasterFollowers;