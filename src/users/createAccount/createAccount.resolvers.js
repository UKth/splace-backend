import bcrypt from "bcrypt";
import client from "../../client";
import redisClient from "../../redis"
import jwt from "jsonwebtoken";
const { promisify } = require('util');
require("dotenv").config();

function validateUsername(text) {
  if (text.length < 1 || text.length > 30) return false
  const exp = /^[0-9a-z._]*$/;
  return exp.test(String(text));
};

function validatePassword(text) {
  const exp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$?!@#$%^&*/])[A-Za-z\d$?!@#$%^&*/]{8,15}$/;
  return exp.test(String(text));
};

function validatePhone(text) {
  const exp = /^01([0|1|6|7|8|9])?([0-9]{7,8})$/;
  return exp.test(String(text));
};



export default {
  Mutation: {
    createAccount: async (
      _,
      { username, password, phone, token, marketingAgree }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username
              },
              {
                phone
              }
            ]
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "ERROR3101"
          }
        }

        if (!validateUsername(username) || !validatePassword(password) || !validatePhone(phone)) {
          return {
            ok: false,
            error: "ERROR1104"
          }
        }
        const { phoneOk } = await jwt.verify(token, process.env.SECRET_KEY);

        if (phoneOk != phone) {
          return {
            ok: false,
            error: "ERROR1103"
          }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const a = await client.user.create({
          data: {
            username,
            password: hashedPassword,
            phone,
            marketingAgree
          },
        });
        const f = await client.folder.create({
          data: {
            members: {
              connect: {
                id: a.id
              }
            },
            title: "저장된 항목"
          }
        })


        const memberIds = [a.id, 1]
        const b = await client.chatroom.create({
          data: {
            title: "",
            isPersonal: true,
            members: {
              connect: memberIds.map(memberId => ({
                id: memberId
              }))
            }
          },
        })
        for (var i = 0; i < memberIds.length; i++) {
          const c = await client.chatroomReaded.create({
            data: {
              user: {
                connect: {
                  id: memberIds[i]
                }
              },
              chatroom: {
                connect: {
                  id: b.id
                }
              }
            }
          })
        }
        const d = await client.chatroom.update({
          where: {
            id: b.id
          },
          data: {
            title: "",
          },
          include: {
            members: true,
            lastMessage: true,
          }
        });

        const now = new Date();
        const duration = 5184000000;
        const newToken = await jwt.sign({ id: a.id, iat: now.getTime(), eat: now.getTime() + duration}, process.env.SECRET_KEY);


        return {
          ok: true,
          token: newToken,
          userId: a.id
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4101",
        };
      }
    },
  },
};