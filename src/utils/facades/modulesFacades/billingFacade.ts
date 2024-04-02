import { parsePriceInLocalCurrency } from "../frontendFacades/parseValuesFacade";
import { Pricing, frequencyType } from "@prisma/client";

export const getPriceRange = (pricings: Pricing[], currencyCode: string) => {
  //Get the min and max price of the service
  const prices = pricings.map((pricing) => pricing.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if(minPrice === maxPrice) return parsePriceInLocalCurrency(minPrice, currencyCode);

  return `${parsePriceInLocalCurrency(
    minPrice,
    currencyCode
  )} - ${parsePriceInLocalCurrency(maxPrice, currencyCode)}`;
};


export const getMonthCountByFrecuency = (frequency: frequencyType) => {
  let months = 0;

  switch (frequency) {
    case frequencyType.MONTHLY:
      months = 1;
      break;
    case frequencyType.QUARTERLY:
      months = 3;
      break;
    case frequencyType.SEMIANNUAL:
      months = 6;
      break;
    case frequencyType.YEARLY:
      months = 12;
      break;
    case frequencyType.BIANNUAL:
      months = 24;
      break;
    case frequencyType.TRIENNIALLY:
      months = 36;
      break;
    case frequencyType.LIFETIME:
      months = 1200;
      break;
    default:
      1;
      break;
  }

  return months;
};
