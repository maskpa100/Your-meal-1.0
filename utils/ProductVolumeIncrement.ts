import { ProductType } from '@/app/Types';

export function ProductVolumeIncrement(
  id: number,
  cookieString: string | undefined,
  products: ProductType[],
) {
  const product = products.find((item) => item.id === id);
  if (cookieString) {
    const cookieObject = JSON.parse(cookieString);

    const productIndex = cookieObject.findIndex((product: { id: number }) => product.id === id);

    if (productIndex !== -1) {
      cookieObject[productIndex].volume += 1;
      const updatedCookieString = JSON.stringify(cookieObject);
      return updatedCookieString;
    } else {
      const newProduct = {
        id: id,
        volume: 1,
        title: product?.title,
        img: product?.img,
        weight: product?.weight,
        price: product?.price,
      };
      cookieObject.push(newProduct);
      return JSON.stringify(cookieObject);
    }
  } else {
    return `[{
      "id":${id},
      "img":"${product?.img}",
      "price":${product?.price},
      "title":"${product?.title}",
      "volume":1,
      "weight":${product?.weight}
    }]`;
  }
}
