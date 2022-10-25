export function seperatePrice(priceValue: number) {
  let returnedPrice = String(priceValue);
  if (returnedPrice.length > 3) {
    returnedPrice = `${returnedPrice.slice(0,2)} ${returnedPrice.slice(2)}`;
  }
  return returnedPrice;
}
