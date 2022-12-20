export function seperatePrice(priceValue: number) {
  let returnedPrice = String(priceValue);
  if(returnedPrice.length > 6) {
    returnedPrice = `${returnedPrice.slice(0, 1)} ${returnedPrice.slice(1, 4)} ${returnedPrice.slice(-3)}`;
  }
  if (returnedPrice.length > 3) {
    returnedPrice = `${returnedPrice.slice(-0, -3)} ${returnedPrice.slice(-3)}`;
  }
  return returnedPrice;
}
