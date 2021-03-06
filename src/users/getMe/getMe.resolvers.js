import { transformDocument } from "@prisma/client/runtime";
import client from "../../client";
import { protectedResolver } from "../users.utils";


export default {
  Query: {
    getMe: protectedResolver((_, {}, { loggedInUser }) => {
      if(loggedInUser){
        return {
          ok: true,
          me: loggedInUser
        }
      } else {
        return {
          ok: false,
          error: "ERROR4104"
        }
      }
    })
  }
}