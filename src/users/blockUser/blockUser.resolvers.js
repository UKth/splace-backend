import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    blockUser: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      try {
        /*const isFollowing = await client.user.findUnique({ where: { userId: loggedInUser.userId } })
          .followings({
            where: { userId: targetId }
          })
        if (isFollowing.length == 1) {
          return {
            ok: false,
            error: "you already follow this user"
          }
        }*/
        if (targetId === loggedInUser.id || targetId == 1) {
          return {
            ok: false,
            error: "ERROR1111"
          }
        }
        const target = await client.user.findFirst({ 
          where: { 
            id: targetId,
            activate: true 
          } 
        });
        if (!target) {
          return {
            ok: false,
            error: "ERROR2111"
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            blockedUser: {
              connect: {
                id: targetId
              }
            }
          }
        });
        // console.log(client);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4111",
        };
      }
    }),
  },
};