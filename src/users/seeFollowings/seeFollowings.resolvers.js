import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeFollowings: protectedResolver(async (_, { userId, keyword, lastId }, { loggedInUser }) => {
      try {
        const ok = await client.user.findUnique({
          where: { id: userId },
          select: { id: true },
        });
        if (!ok) {
          return {
            ok: false,
            error: "ERROR2114",
          };
        }
        if(userId != loggedInUser.id) {
          return {
            ok: false,
            error: "ERROR111#"
          }
        }
        const followings = await client.user
          .findUnique({ where: { id: userId } })
          .followings({
            where: {
              username: {
                startsWith: keyword
              }
            },
            take: 15,
            ...(lastId && { cursor: { id: lastId } }),
            skip: lastId ? 1 : 0,
          });
        return {
          ok: true,
          followings,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4115"
        }
      }
    })
  },
};