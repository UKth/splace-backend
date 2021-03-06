import client from "../client";

export default {
  Category: {
    totalSplace: async ({ id }) => {
      try {
        const num = await client.splace.count({
          where: {
            hashtags: {
              some: {
                id
              },
            },
          },
        })
        return num;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    totalPhotologs: async ({ id }) => {
      try {
        const num = await client.photolog.count({
          where: {
            categories: {
              some: {
                id
              },
            },
          },
        })
        return num;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    /*isMine: ({ authorId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      
      return authorId == loggedInUser.userId;
    },*/
  },
};