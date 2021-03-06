import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { CHATROOM_UPDATE } from "../../constants"
import pubsub from "../../pubsub";

export default {
  Mutation: {
    editChatroom: protectedResolver(async (
      _,
      { title, chatroomId },
      { loggedInUser }
    ) => {
      try {
        if (title.length < 1 && title.length > 20) {
          return {
            ok: false,
            error: "ERROR1M17"
          }
        }
        const ok = await client.chatroom.findFirst({
          where: {
            id: chatroomId,
            members: {
              some: {
                id: loggedInUser.id
              }
            }
          }
        });
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5M12"
          };
        }
        const a = await client.chatroom.update({
          where: {
            id: chatroomId
          },
          data: {
            title,
          },
          include: {
            members: true,
            lastMessage: true,
          }
        });

        pubsub.publish(CHATROOM_UPDATE, { chatroomUpdated: { ...a } })

        
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4M13",
        };
      }
    }),
  }
};
