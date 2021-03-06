import * as Jimp from "jimp";

export const MAX_HEIGHT = 500;
export const MAX_WIDTH = 500;

export enum ResizeModeEnum {
  Height = "Height",
  Width = "Width"
}

export const compressImage = async (image: any) => {
  const jimpifiedImage = await Jimp.read(image);

  const compressedImage = await processImage(
    jimpifiedImage,
    MAX_WIDTH,
    MAX_HEIGHT
  );
  return await compressedImage.getBase64Async(Jimp.MIME_JPEG);
};

export const processImage = (
  image: Jimp,
  maxImageWidth: number,
  maxImageHeight: number
): Promise<Jimp> => {
  return new Promise(async (resolve, reject) => {
    // do stuff with the image (if no exception)
    if (image.bitmap.height > maxImageHeight) {
      image = await resizeImage(image, ResizeModeEnum.Height, maxImageHeight);
    }
    if (image.bitmap.width > maxImageWidth) {
      image = await resizeImage(image, ResizeModeEnum.Width, maxImageWidth);
    }
    resolve(image);
  });
};

export const resizeImage = (
  image: Jimp,
  mode: ResizeModeEnum,
  value: number
): Promise<Jimp> => {
  console.log("called resizer with params: ", mode, " ", value);
  return new Promise((resolve, reject) => {
    let desiredWidth: number =
      mode === ResizeModeEnum.Width ? value : Jimp.AUTO;
    let desiredHeight: number =
      mode === ResizeModeEnum.Height ? value : Jimp.AUTO;
    resolve(image.resize(desiredWidth, desiredHeight).quality(60));
  });
};
