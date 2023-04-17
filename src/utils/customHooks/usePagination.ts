
import { useState } from 'react';
import { type PhonePreview } from '../types/PhonePreviewType';
import { type PaginationOptions } from '../types/SortByMenuTypes';

const usePagination = ():
[PhonePreview[][], (itemsPerPage: PaginationOptions, fullArray: PhonePreview[]) => void] => {
  const result: PhonePreview[][] = [];
  const [finalRes, setFinalRes] = useState<PhonePreview[][]>([]);

  const splitfullArray = (itemsPerPage: PaginationOptions, fullArray: PhonePreview[]) => {
    const transformedItemsPerPage = Number(itemsPerPage);

    if (typeof transformedItemsPerPage === 'number') {
      const helperArray = [...fullArray];
      const numberOfPages = Math.ceil(fullArray.length / transformedItemsPerPage);
      for (let i = 1; i < numberOfPages; i++) {
        result.push(helperArray.splice(0, transformedItemsPerPage));
      }

      result.push(helperArray);
    } else {
      result.push(fullArray);
    }

    setFinalRes(result);
  };

  return [finalRes, splitfullArray];
};

export default usePagination;
