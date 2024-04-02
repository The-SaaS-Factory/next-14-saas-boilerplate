"use server";

import { imageKitFacade } from "./imagekitFacade";
import { generateRandomString } from "./strFacade";

export const saveImage = async (image: string) => {

  if (Array.isArray(image)) {
    const imagesGenerate: any = await Promise.all(
      image.map(async (img: any) => {
        const imageGenerate: any = await imageKitFacade(
          img,
          generateRandomString(7)
        );

        if (imageGenerate.error) {
          console.log("Error", imageGenerate.error);
             throw new Error(imageGenerate.error);
        }

        return {
          url: imageGenerate.result.url as string,
          thumbnailUrl: imageGenerate.result.thumbnailUrl,
        };
      })
    );

    if (imagesGenerate) {
       return imagesGenerate;
    } else {
      throw new Error("Error");
    }
  } else {
    const imageGenerate: any = await imageKitFacade(
      image,
      generateRandomString(7)
    );

    if (imageGenerate.error) {
      console.log("Error", imageGenerate.error);
      throw new Error(imageGenerate.error);
    }

    const reponse = {
      url: imageGenerate.result.url as string,
      thumbnailUrl: imageGenerate.result.thumbnailUrl,
    };

    if (imageGenerate) {
      return reponse;
    } else {
      throw new Error("Error");
    }
  }
};
