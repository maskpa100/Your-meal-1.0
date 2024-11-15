export function ProductVolumeDecrement(id: number, cookieString: string, allDelete?: string) {
  const cookieObject = JSON.parse(cookieString);

  const productIndex = cookieObject.findIndex((product: { id: number }) => product.id === id);

  if (productIndex !== -1) {
    if (allDelete === 'delete') {
      cookieObject.splice(productIndex, 1);
      const updatedCookieString: string = JSON.stringify(cookieObject);
      return updatedCookieString;
    } else {
      if (cookieObject[productIndex].volume > 1) {
        cookieObject[productIndex].volume -= 1;
        const updatedCookieString = JSON.stringify(cookieObject);
        return updatedCookieString;
      } else {
        cookieObject.splice(productIndex, 1);
        const updatedCookieString: string = JSON.stringify(cookieObject);
        return updatedCookieString;
      }
    }
  } else {
    return '[]';
  }
}
