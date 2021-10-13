/*
ErrorCode Rule

ERROR _ _ _ _

      ^ for Invalid Request 1 /None Exist 2/Already Exist 3/ DB Error 4/ Authentication Failed 5 
        ^ 1 ~ DB model num (query/mutation main folder name)
          ^ 1 ~ sub DB model num if sub model X exist -> 0
            ^ 1 ~ Z ERROR CODE NUM
  
  DB model numbering
  user 1
  photolog 2
  series 3
  splace 4
  timeset 5
  breakday 6
  fixedcontent 7
  save 8
  scrapedLog 9
  scrapedSeries A
  folder B
  category C
  bigcategory D
  specialtag E
  ratingtag F
  item G
  comment H
  paymentlog Q
  buyrafflelog J
  raffle K
  chatroom L
  chatroomreaded M
  message N
  moment O
  report P
  
  ERROR1111 "self block request"
  ERROR2111 "user for block X exist"
  ERROR4111 "prisma issue for blockUser"
  ERROR3101 "username already taken"
  ERROR4101 "prisma issue for createAccount"
  ERROR4102 "prisma issue for deleteAccount"
  ERROR3102 "email already taken"
  ERROR4103 "prisma issue for editProfile"
  ERROR1112 "self follow request"
  ERROR2112 "user for follow X exist"
  ERROR4112 "prisma issue for follow user"
  ERROR4103 "get me error"
  ERROR4104 "get blocked User error"
  ERROR4121 "get my scraped log error"
  ERROR4131 "get my scraped series error"
  ERROR4141 "get my splace error"
  ERROR2101 "login user not found"
  ERROR1101 "password incorrect"
  ERROR4104 "prisma issue for login"
  ERROR3121 "already scraped log"
  ERROR4122 "prisma issue for scrap photolog"
  ERROR3131 "already scraped series"
  ERROR4132 "prisma issue for scrap series"
  ERROR4113 "prisma issue for search user"
  ERROR2113 "user for seeFollowers X exist"
  ERROR4114 "prisma issue for seefollowers"
  ERROR2114 "user for seeFollowings X exist"
  ERROR4115 "prisma issue for seeFollowing"
  ERROR2115 "profile X exist"
  ERROR4116 "prisam issue for see profile"
  ERROR1113 "self unblock request"
  ERROR2116 "unblock target X exist"
  ERROR4117 "prisma issue for unblockuser"
  ERROR1114 "self unfollow request"
  ERROR2117 "user X exist for unfollow"
  ERROR4118 "prisam issue for unfllow user"
  ERROR1121 "photolog X exist in user's scrap"
  ERROR4123 "prisma issue for unscrap photolog"
  ERROR1131 "series X exist in user's scrap"
  ERROR4133 "prisma issue for unscrap series"
  ERROR5471 "not the owner of splace"
  ERROR4471 "prisma issue for create fixedConetents"
  ERROR5411 "only root user can create splace"
  ERROR4411 "prisma issue for crate splace"
  ERROR3451 "timeset exist, please use editTimeSet"
  ERROR1451 "invalid request, timeset closetime is earlier than opentime"
  ERROR4451 "prisma issue for create Timeset"
  ERROR5412 "only root user can delete splace"
  ERROR4412 "prisma issue for delete splace"
  ERROR4472 "prisma issue for edit fixedContents"
  ERROR4412 "prisma issue for edit splace"
  ERROR4452 "prisma issue for edit timeset"
  ERROR4401 "search splace error"
  ERROR2K11 "raffle X exist"
  ERROR3K11 "raffle already bought"
  ERROR1K11 "lack of credit"
  ERROR4K11 "prisma issue for buyraffle"
  ERROR5K11 "only root user can create raffle"
  ERROR4K12 "prisma issue for create raffle"
  ERROR4J11 "prisma issue for get buyrafflelog"
  ERROR4Q11 "prisam issue for get paymentlog"
  ERROR1Q11 "invalid pay request"
  ERROR4Q12 "prisma issue for paycredit"
  ERROR3QJ1 "credit already used"
  ERROR4Q13 "iamport issue for cancel payment"
  ERROR1Q12 "invalid request for cancel payment"
  ERROR4Q14 "prisma issue for cancel payment"
  ERROR4C11 "prisma issue for searchCategories"
  ERROR5311 "only author can add photlog to sereis"
  ERROR1321 "private log can't be added to public series"
  ERROR4321 "prisma issue for add photologs to series"
  ERROR4311 "prisma issue for create series"
  ERROR5312 "only author can delte series"
  ERROR4312 "prisma issue for delete series"
  ERROR4313 "prisma issue for get my series"
  ERROR4301 "prisma issue for seeSeries"
  ERROR4302 "prisma issue for get series title"
  ERROR4314 "prisma issue for get user series"
  ERROR2311 "seris X exist"
  ERROR1312 "you cant hide your series"
  ERROR4315 "prisma issue for get"
  ERROR5313 "only author can remove photolog from series"
  ERROR4316 "prisma issue for remove photologs"
  ERROR4317 "prisma issue for show series"
  ERROR3P11 "already report same issue"
  ERROR4P11 "prisma issue for report"
  ERROR5211 "only author can delete photolog"
  ERROR4211 "prisma issue for delete photolog"
  ERROR5212 "only author can edit photolog"
  ERROR4212 "prisma issue for edit photolog"
  ERROR2211 "no logs for feed"
  ERROR4213 "prisma issue for getFeed"
  ERROR4231 "prisma issue for getlogsbyseries"
  ERROR4214 "prisma issue for getmylogs"
  ERROR4215 "prisma issue for getuserlogs"
  ERROR2212 "photolog does not exist"
  ERROR1211 "invalid request, cant hide itself"
  ERROR4216 "prisma issue for hide photlog"
  ERROR1212 "invalid request, cant like private photolog"
  ERROR4217 "prisma issue for like photolog"
  ERROR5213 "only author can see private log"
  ERROR4218 "prisma issue cant see log"
  ERROR4219 "prisam issue cant show phtolog"
  ERROR421A "prisma issue cant unlike photolog"
  ERROR421B "prisma issue cant upload photolog"
  ERROR4O11 "prisma issue cant upload moment"
  ERROR4O12 "prisma issue cant get my moments"
  ERROR5O11 "only author can delete moment"
  ERROR4O13 "prisma issue can't delete moments"
  ERROR1B11 "invalid request. only my followings can be member"
  ERROR5B11 "only member can add memeber"
  ERROR4B11 "prisma issue for add folder member"
  ERROR5B82 "only member can add saves to folder"
  ERROR4B82 "prisma issue for add saves"
  ERROR4B13 "prisma issue for create folder"
  ERROR5B13 "only member can delete folder"
  ERROR4B14 "prisma issue for delete folder"
  ERROR5B14 "only member can edit folder title"
  ERROR4B15 "prisma issue for edit folder"
  ERROR4B16 "prisma issue for get folders"
  ERROR4B17 "prisma issue for get folder saves"
  ERROR4B18 "prisma issue for quit folder"
  ERROR5B83 "only member can remove save"
  ERROR4B83 "prisam issue for remove save"
  ERROR4819 "prisma issue for see folder"
  ERROR5M11 "only member can add member to chatroom"
  ERROR1M11 "cant add member to personal chatroom"
  ERROR1M12 "only following can invite to chatroom"
  ERROR1M13 "already member included"
  ERROR4M11 "prisma issue for add chatroom member"
  ERROR1M14 "to create chatroom, please include yourself"
  ERROR1M15 "to create personal chattroom, member shold be 2"
  ERROR3M11 "personal chatroom already exist"
  ERROR4M12 "prisma issue for create chatroom"
  ERROR5M12 "only member can edit chatroom"
  ERROR4M13 "prisma issue for edit chatroom"
  ERROR4M14 "prisma issue for get chatrooms"
  ERROR5M13 "only member can get room info"
  ERROR4M15 "prisma issue for get room info"
  ERROR4M16 "prisma issue for get room messages"
  ERROR5M14 "only member can quit chatroom"
  ERROR4M17 "prisma issue for quit chatroom"
  ERROR5M15 "only member can read chatroom"
  ERROR4M18 "prisma issue for read chatroom"
  ERROR5M16 "only member can send message"
  ERROR4M19 "chatroomreaded not find"
  ERROR4M1A "prisma issue for send message"
*/
