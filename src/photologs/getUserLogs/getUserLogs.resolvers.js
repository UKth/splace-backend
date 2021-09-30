import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getUserLogs: protectedResolver(async (_, { userId, lastId }, { loggedInUser }) => {
      try {
        const logs = await client.photolog.findMany({
          where: {
            authorId: userId
          },
          include: {
            categories: true,
            bigCategories: true,
            splace: true,
            author: true,
            series: true,
            likedUser: true,
            specialtags: true,
          },
          take: 5,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
        })
        return {
          ok: true,
          logs
        };
      } catch (e) {
        return {
          ok: false,
          error: "cant get logs"
        };
      }
    })
  }
}