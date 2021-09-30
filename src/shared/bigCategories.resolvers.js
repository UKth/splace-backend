import client from "../client";

export default {
  BigCategory: {
    totalSplace: async ({ id }) => {
      try {
        const num = await client.splace.count({
          where: {
            bigCategories: {
              some: {
                id
              },
            },
          },
        })
        return num;
      } catch (e) {
        return null;
      }
    },
    totalPhotologs: async ({ id }) => {
      try {
        const num = await client.photolog.count({
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