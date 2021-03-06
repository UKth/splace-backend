import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    scrapLog: protectedResolver(async (
      _,
      { photologId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.scrapedLog.findFirst({
          where:{
            photologId,
            savedUserId: loggedInUser.id
          }
        })
        if(ok){
          return{
            ok: false,
            error: "ERROR3121"
          }
        }
        const a = await client.scrapedLog.create({
          data: {
            photolog: {
              connect: {
                id: photologId
              }
            },
            savedUser: {
              connect: {
                id: loggedInUser.id
              }
            },
          },
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4122",
        };
      }
    }),
  }
};
