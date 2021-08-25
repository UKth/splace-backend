import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    addSave: protectedResolver(async (
      _,
      { splaceId, folderId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.folder.findUnique({ where: { folderId } })
          .members({
            where: { userId: loggedInUser.userId }
          });

        if (ok.length == 0) {
          return {
            ok: false,
            error: "you dont have authentication for adding save."
          };
        }
        const a = await client.save.create({
          data: {
            splace: {
              connect: {
                splaceId
              }
            },
            folder: {
              connect: {
                folderId
              }
            },
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
          error: "cant add save",
        };
      }
    }),
  }
};
