/* eslint-disable no-plusplus */
const usePagination = (defaultValue: Array<any> = []) => {
  const result = defaultValue;

  const splitfullArray = (itemsPerPage: number | 'All', fullArray: Array<any>) => {
    if(typeof itemsPerPage === 'number') {
      const helperArray = [...fullArray]
      const numberOfPages = Math.ceil(fullArray.length / itemsPerPage);
      for (let i = 1; i < numberOfPages; i++) {
        result.push(helperArray.splice(i  * itemsPerPage))
      }

      result.push(helperArray);
    }
  }
}

export default usePagination;