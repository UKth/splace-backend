import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { userId, keyword, lastId }) => {
      try {
        const ok = await client.user.findUnique({
          where: { id: userId },
          select: { id: true },
        });

        if (!ok) {
          return {
            ok: false,
            error: "User not found",
          };
        }
        const followers = await client.user
          .findUnique({ where: { id: userId } })
          .followers({
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
          followers,
        };
      } catch (e) {
        return {
          ok: false,
          error: "cant find followers"
        }
      }
    },
  },
};