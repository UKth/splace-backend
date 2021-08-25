import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  { name, username, email, password: newPassword, profileMessage, profileImageUrl, currentLog, currentLat },
  { loggedInUser }
) => {
  try {
    /*  let profilePhotoUrl = null;
      if (profilePhoto) {
        const { filename, createReadStream } = await profilePhoto;
        const newFilename = `${loggedInUser.userId}-${Date.now()}-${filename}`;
        const readStream = createReadStream();
        const writeStream = createWriteStream(
          process.cwd() + "/uploads/" + newFilename
        );
        readStream.pipe(writeStream);
        profilePhotoUrl = `http://localhost:4000/static/${newFilename}`;
      } */
    let hashedPassword = null;
    if (newPassword) {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
      where: {
        userId: loggedInUser.userId,
      },
      data: {
        name,
        username,
        email,
        profileMessage,
        currentLat,
        currentLog,
        ...(hashedPassword && { password: hashedPassword }),
        ...(profileImageUrl && { profileImageUrl: profileImageUrl }),
      },
    });

    if (updatedUser.userId) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: "Could not update profile.",
      };
    }
  } catch (e) {
    return {
      ok: false,
      error: "cant update profile"
    }
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};