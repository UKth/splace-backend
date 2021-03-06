import bcrypt from "bcrypt";
import client from "../../client";
import redisClient from "../../redis"
import send from "../../coolsms"
import { validatePhone } from "../../re";

export default {
  Mutation: {
    createCertificate: async (
      _,
      { phone, isRegister }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            phone
          },
        });
        if (existingUser && isRegister) {
          return {
            ok: false,
            error: "ERROR3103"
          }
        }

        if(!validatePhone(phone)){
          return {
            ok: false,
            error: "ERROR1102"
          }
        }

        var certificate = "";

        for(var i = 0; i<6; i++) {
          certificate += parseInt(Math.random() * 10);
        }
        //redis

        //console.log(certificate)

        if(redisClient.exists(phone)){
          redisClient.del(phone);
        }

        redisClient.set(phone, certificate,'EX',180);

        //console.log(redisClient.exists(phone))

        //send message
        const a = await send({
          messages: [
            {
              to: phone,
              from: '15330149',
              text: "[Splace] 본인확인 인증번호는 [" + certificate + "]입니다"
            }
          ]
        })

        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4107",
        };
      }
    },
  },
};