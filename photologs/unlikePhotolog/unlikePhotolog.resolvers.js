import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    unlikePhotolog: protectedResolver(async (
      _,
      { photologId },
      { loggedInUser }
    ) => {
      const photolog = await client.photolog.findUnique({ where : { photologId } });
      if(photolog.authorId === loggedInUser.userId){
        return {
          ok: false,
          error: "you cant like your photolog!"
        };
      }
      try {
        const a = await client.user.update({
          where: {
            userId: loggedInUser.userId
          },
          data: {
            likedPhotologs: {
              disconnect: {
                photologId
              }
            }
          },
        });
        console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant like",
        };
      }
    }),
  }
};
