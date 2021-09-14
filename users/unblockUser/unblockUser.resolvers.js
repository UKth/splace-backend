import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unblockUser: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      /*const isFollowing = await client.user.findUnique({ where: { userId: loggedInUser.userId } })
        .followings({
          where: { userId: targetId }
        })
      console.log(isFollowing)
      if (isFollowing.length == 0) {
        return {
          ok: false,
          error: "this user is not your following"
        }
      }*/
      try {
        const target = await client.user.findUnique({ where: { id: targetId } });
        if (targetId === loggedInUser.id) {
          return {
            ok: false,
            error: "You can't unblock yourself"
          }
        }
        if (!target) {
          return {
            ok: false,
            error: "That user does not exist."
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            blockedUser: {
              disconnect: {
                id: targetId
              }
            }
          }
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant unblock user",
        };
      }
    }),
  },
};