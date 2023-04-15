/* eslint-disable no-debugger */
import { useState } from 'react';
import { PhonePreview } from '../types/PhonePreviewType';
import { PaginationOptions } from '../types/SortByMenuTypes';

/* eslint-disable no-plusplus */
const usePagination = (): 
  [Array<PhonePreview[]>, (itemsPerPage: PaginationOptions, fullArray: Array<PhonePreview>) => void] => {
  const result: Array<PhonePreview[]> = [];
  const [finalRes, setFinalRes] = useState<Array<PhonePreview[]>>([])

  const splitfullArray = (itemsPerPage: PaginationOptions, fullArray: Array<PhonePreview>) => {
    const transformedItemsPerPage = Number(itemsPerPage);

    if(typeof transformedItemsPerPage === 'number') {
      const helperArray = [...fullArray]
      const numberOfPages = Math.ceil(fullArray.length / transformedItemsPerPage);
      for (let i = 1; i < numberOfPages; i++) {
        result.push(helperArray.splice(0, transformedItemsPerPage))
      }

      result.push(helperArray);
    } else {
      result.push(fullArray);
    }
    
    setFinalRes(result);
  }

  return [finalRes, splitfullArray];
}

export default usePagination;