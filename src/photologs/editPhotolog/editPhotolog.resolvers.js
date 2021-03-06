import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import searchEngine from "../../opensearch"
require("dotenv").config()
import { AtoS } from "../../re";

export default {
  Mutation: {
    editPhotolog: protectedResolver(async (
      _,
      { photologId, text, isPrivate },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.photolog.findFirst({
          where: {
            id: photologId,
            author: {
              id: loggedInUser.id
            }
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5212"
          };
        }
        const b = await client.photolog.update({
          where: {
            id: photologId
          },
          data: {
            text,
            isPrivate,
          }
        });

        if (b.splaceId && (ok.isPrivate == true && b.isPrivate == false)) {

          const a = await client.splace.findFirst({
            where: {
              id: b.splaceId,
              activate: true,
            },
            include: {
              categories: true,
              bigCategories: true,
              ratingtags: true,
            }
          })

          if (a && b.isPrivate == false) {
            const location = a.lat + ", " + a.lon
            var index_name = "photolog_search"+"_" + process.env.SEARCH_VERSION

            const cNames = a.categories.map(category => category.name)
            const bcNames = a.bigCategories.map(bigCategory => bigCategory.name)
            const bigCategoryIds = a.bigCategories.map(bigCategory => bigCategory.id)
            const rtNames = a.ratingtags.map(ratingtag => ratingtag.name)
            const rtIds = a.ratingtags.map(ratingtag => ratingtag.id)
            var address_array = a.address.split(" ")
            const address_2 = address_array[1].length > 2 ? address_array[1].substring(0, address_array[1].length - 1) : address_array[1]
            const address = address_array[0] + " " + address_2

            var document = {
              "id": photologId,
              "name": a.name,
              "address": address,
              "location": location,
              "intro": a.intro,
              "thumbnail": b.imageUrls[0],
              "noKids": a.noKids,
              "pets": a.pets,
              "parking": a.parking,
              "categories": AtoS(cNames),
              "stringBC": AtoS(bigCategoryIds),
              "bigCategories": AtoS(bcNames),
              "ratingtags" : AtoS(rtNames),
              "stringRT" : AtoS(rtIds)
            }

            var response = await searchEngine.create({
              id: b.id,
              index: index_name,
              body: document
            })

            if (response.body.result != "created") {
              return {
                ok: false,
                error: "ERROR4416"
              }
            }
          }
        }

        if (b.splaceId && (ok.isPrivate == false && b.isPrivate == true)) {


          var index_name = "photolog_search"+"_" + process.env.SEARCH_VERSION
          var response = await searchEngine.delete({
            id: photologId,
            index: index_name,
          })

          if (response.body.result != "deleted") {
            return {
              ok: false,
              error: "ERROR4419"
            }
          }
        }
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4212",
        };
      }
    }),
  }
};
