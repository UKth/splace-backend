import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getFeed: protectedResolver(async (_, { lastLogId, lastSeriesId }, { loggedInUser }) => {
      try {
        const logs = await client.photolog.findMany({
          where: {
            OR: [
              {
                author: {
                  followers: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
                isPrivate: false
              },
              {
                authorId: loggedInUser.id,
              },
              {
                authorId: 1,
              },
              {
                authorId: 4,
              },
              {
                authorId: 2,
              },
              {
                authorId: 5,
              }
            ],
            NOT: [
              {
                author: {
                  blockingUser: {
                    some: {
                      id: loggedInUser.id
                    }
                  }
                },
              },
              {
                hiddenUsers: {
                  some: {
                    id: loggedInUser.id
                  }
                }
              },
            ]
          },
          include: {
            categories: true,
            bigCategories: true,
            splace: true,
            author: true,
            seriesElements: {
              include: {
                series: true
              }
            },
            likedUser: true,
          },
          take: 10,
          ...(lastLogId && { cursor: { id: lastLogId } }),
          skip: lastLogId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
        })
        if(logs.length === 0){
          return {
            ok: false,
            error: "ERROR2211"
          }
        }
        const lastCreated = logs[logs.length - 1].createdAt;
        const series = await client.series.findMany({
          where: {
            OR: [
              {
                author: {
                  followers: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
                createdAt: {
                  gt: lastCreated
                },
                isPrivate: false
              },
              {
                authorId: loggedInUser.id,
                createdAt: {
                  gt: lastCreated
                },
              },
              {
                authorId: 1,
                createdAt: {
                  gt: lastCreated
                },
              },
            ],
            NOT: [
              {
                author: {
                  blockingUser: {
                    some: {
                      id: loggedInUser.id
                    }
                  }
                },
              },
              {
                hiddenUsers: {
                  some: {
                    id: loggedInUser.id
                  }
                }
              },
            ]
          },
          include: {
            author: true,
            seriesElements: {
              include: {
                photolog: true
              }
            }
          },
          ...(lastSeriesId && { cursor: { id: lastSeriesId } }),
          skip: lastSeriesId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
        })
        return {
          ok: true,
          logs: logs,
          series: series,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4213"
        };
      }
    })
  }
}