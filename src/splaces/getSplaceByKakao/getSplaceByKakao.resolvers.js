import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import searchEngine from "../../opensearch"
import axios from "axios"
import { buildSchema } from "graphql";
import { CostExplorer } from "aws-sdk";
require("dotenv").config();

export default {
  Mutation: {
    getSplaceByKakao: protectedResolver(async (
      _,
      { kakaoId, keyword, x, y },
      { loggedInUser }
    ) => {
      try {

        const a = await client.splace.findFirst({
          where: {
            kakaoId
          },
          include: {
            bigCategories: true,
            ratingtags: true,
          }
        });

        if (a) {
          return {
            ok: true,
            splace: a
          }
        }

        const auth = process.env.KAKAO_AUTH


        const headers = {
          "headers": {
            "Authorization": auth
          }
        }

        
        var url = (x != null && y != null) ? "https://dapi.kakao.com/v2/local/search/keyword.json?query=" + keyword + "&x=" + x + "&y=" + y: "https://dapi.kakao.com/v2/local/search/keyword.json?query=" + keyword
        var places = await axios.get(encodeURI(url), headers)

        if (places.statusText != 'OK') {
          return {
            ok: false,
            error: "ERROR4415"
          }
        }

        if (places.length == 0) {
          return {
            ok: false,
            error: "ERROR1412"
          }
        }


        places = places.data.documents.filter(kakao => kakao.id == kakaoId)

        console.log(places)

        if (places.length == 0) {
          return {
            ok: false,
            error: "ERROR1411"
          }
        }

        const place = places[0];

        //console.log(place)
        const kakao_address = (place.road_address_name != "") ? place.road_address_name : place.address_name
      
        const b = await client.splace.create({
          data: {
            name: place.place_name,
            phone: place.phone.replace(/-/gi, ""),
            lat: place.y,
            lon: place.x,
            kakaoId,
            address: kakao_address,
            activate: true,
            intro: place.category_name
          },
          include: {
            bigCategories: true,
            ratingtags: true
          }
        })

        for (var i = 0; i < 7; i++) {
          //console.log(1)
          const c = await client.timeSet.create({
            data: {
              day: i,
              splace: {
                connect: {
                  id: b.id
                }
              }
            }
          })
          //console.log(c)
        }

        const location = b.lat + ", " + b.lon
        var index_name = "splace_search"+"_" + process.env.SEARCH_VERSION

        var address_array = b.address.split(" ")
        const address_2 = address_array[1].length > 2 ? address_array[1].substring(0, address_array[1].length - 1) : address_array[1]
        const address = address_array[0] + " " + address_2

        var document = {
          "id" : b.id,
          "name": b.name,
          "address": address,
          "location": location,
          "intro": place.category_name
        }

        var response = await searchEngine.create({
          id: b.id,
          index: index_name,
          body: document
        })

        //console.log(response); 

        if (response.body.result != "created") {
          return {
            ok: false,
            error: "ERROR4416"
          }
        }

        //console.log(a);
        return {
          ok: true,
          splace: b
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4411",
        };
      }
    }),
  }
};
