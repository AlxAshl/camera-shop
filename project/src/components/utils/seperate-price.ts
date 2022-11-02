export function seperatePrice(priceValue: number) {
  let returnedPrice = String(priceValue);
  if (returnedPrice.length > 3) {
    returnedPrice = `${returnedPrice.slice(-0, -3)} ${returnedPrice.slice(-3)}`;
  }
  return returnedPrice;
}
