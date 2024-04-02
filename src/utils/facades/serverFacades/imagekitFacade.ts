import imageKit from "imagekit";
import { getSuperAdminSetting } from "./adminFacade";

export const imageKitFacade = async (base64Img: string, imageName: string) => {
  try {
    const IMAGEKIT_PUBLIC_KEY = await getSuperAdminSetting(
      "IMAGEKIT_PUBLIC_KEY"
    );
    const IMAGEKIT_PRIVATE_KEY = await getSuperAdminSetting(
      "IMAGEKIT_PRIVATE_KEY"
    );
    const IMAGEKIT_URL_ENDPOINT = await getSuperAdminSetting(
      "IMAGEKIT_URL_ENDPOINT"
    );

    if (
      !IMAGEKIT_PUBLIC_KEY ||
      !IMAGEKIT_PRIVATE_KEY ||
      !IMAGEKIT_URL_ENDPOINT
    ) {
      return { error: "Settings not found" };
    }

    const resolver = new imageKit({
      publicKey: IMAGEKIT_PUBLIC_KEY,
      privateKey: IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    });

    return new Promise((resolve, reject) => {
      resolver.upload(
        {
          file: base64Img,
          fileName: imageName,
          isPrivateFile: false,
        },
        function (error, result) {
          if (error) {
            console.error("Failed uploading file", error);
            reject(new Error("Failed uploading file"));
          } else {
            resolve({ error: null, result: result });
          }
        }
      );
    });
  } catch (error) {
    console.error("Error in imageKitFacade", error);
    throw error;
  }
};

export const isBase64String = (str: string) => {
  const regex = /^data:image\/([a-zA-Z]*);base64,([^\s]*)$/;
  return regex.test(str);
};


