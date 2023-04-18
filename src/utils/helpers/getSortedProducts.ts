import { PhonePreview } from '../types/PhonePreviewType';
import { SortByTypes } from '../types/SortByMenuTypes';

function getSortedProducts(sortType: SortByTypes, products: PhonePreview[]) {
  const {
    NEWEST,
    OLDEST,
    PRICEHIGH,
    PRICELOW,
  } = SortByTypes;

  const productsCopy = [...products];

  switch (sortType) {
    case OLDEST:
      return productsCopy.sort((a, b) => a.year - b.year);
    case NEWEST:
      return productsCopy.sort((a, b) => b.year - a.year);
    case PRICELOW:
      return productsCopy.sort((a, b) => a.price - b.price);
    case PRICEHIGH:
      return productsCopy.sort((a, b) => b.price - a.price);
    default:
      return productsCopy;
  }
}

export default getSortedProducts;
