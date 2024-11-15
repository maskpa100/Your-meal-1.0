import { SetStateAction } from 'react';
import { deleteImage } from './deleteImage';
import { saveBase64Image } from './saveBase64Image';

export async function updateImage(
  croppedImg: string,
  imgServer: string | undefined,
  imgDelete: string | undefined,
  setNoImg: (value: SetStateAction<boolean>) => void,
) {
  if (croppedImg !== '' || imgServer) {
    if (croppedImg) {
      const result = await saveBase64Image(croppedImg);
      if (imgDelete) {
        await deleteImage(imgDelete);
      }
      return result;
    }
    if (imgServer) {
      return imgServer;
    }
  } else {
    setNoImg(true);
  }
}
