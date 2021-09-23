import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import pubsub from '../pubsub';
import { FOLDER_UPDATE } from "../../constants";

export default {
  Mutation: {
    addSave: protectedResolver(async (
      _,
      { splaceId, folderId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.folder.findFirst({ 
          where: { 
            id: folderId,
            members: {
              some: {
                id: loggedInUser.id
              }
            } 
          },
          include: {
            members: true
          } 
        })
        //console.log(ok);
        if(!ok) {
          return {
            ok: false,
            error: "you dont have authentication to add save."
          };
        }
        const a = await client.save.create({
          data: {
            splace: {
              connect: {
                id: splaceId
              }
            },
            folder: {
              connect: {
                id: folderId
              }
            },
          },
        });
        pubsub.publish(FOLDER_UPDATE, { folderUpdated: { folder: ok, user: loggedInUser, state: "added" } });
        //console.log(a);
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
