import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    readChatroom: protectedResolver(async (
      _,
      { chatroomId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.chatroomReaded.findFirst({
          where: {
            user: {
              id: loggedInUser.id
            },
            chatroom: {
              id: chatroomId
            }
          }
        })
        if(!ok){
          return{
            ok: false,
            error: "ERROR5M15"
          }
        }
        const a = await client.chatroomReaded.update({
          where: {
            id: ok.id
          },
          data: {
            user: {
              connect: {
                id: loggedInUser.id
              }
            }
          }
        })
        
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4M18",
        };
      }
    }),
  }
};
