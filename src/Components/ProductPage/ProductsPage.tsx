import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import ProductCategories from '../../utils/map/ProductCategories';
import { useAppSelector } from '../../app/hooks';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { SortByTypes, SortMenuType } from '../../utils/types/SortByMenuTypes';
import PhoneCard from '../PhoneCard/PhoneCard';
import usePagination from '../../utils/customHooks/usePagination';
import NumberOfPages from '../NumberOfPages/NumberOfPages';
import ProductType from '../../utils/types/ProductType';
import PageChangeType from '../../utils/types/PageChangeType';
import PathHistory from '../PathHistory/PathHistory';
import getSortedProducts from '../../utils/helpers/getSortedProducts';

const ProductPage: React.FC = () => {
  const location = useLocation().pathname;
  const currentProduct: ProductType = location.slice(1) as ProductType.PHONES;
  const products = useAppSelector(state => state.allPhones)[currentProduct];
  const title = ProductCategories
    .find(category => category.path === location)?.name;
  const [splitedProducts, setSplitedProducts] = usePagination();
  const [{
    sort,
    pagination,
  }, setItemSort] = useState<SortMenuType>({ sort: SortByTypes.NEWEST, pagination: '16' });
  const [currentPage, setCurrentPage] = useState(0);

  const onPageChange = useCallback((pageChangeType: PageChangeType, exactPage?: number) => {
    const { LEFT, RIGHT } = PageChangeType;
    switch (pageChangeType) {
      case LEFT:
        setCurrentPage(prev => prev - 1);
        break;

      case RIGHT:
        setCurrentPage(prev => prev + 1);
        break;

      default:
        setCurrentPage(exactPage ?? 0);
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  useEffect(() => {
    const sortedProducts = getSortedProducts(sort, products);
    setSplitedProducts(pagination, sortedProducts);
  }, [sort, pagination, products]);

  const onItemsSortChange = useCallback((sortMenu: SortMenuType) => {
    setItemSort(sortMenu);
  }, [sort, pagination]);

  useEffect(() => {
    if (splitedProducts.length && splitedProducts.length < currentPage + 1) {
      setCurrentPage(splitedProducts.length - 1);
    }
  }, [splitedProducts]);

  return (
    <section className='max-w-[1200px] mx-auto'>
      <PathHistory />
      <h1 className='text-white text-4xl capitalize font-bold mb-2'>
        {title}
      </h1>
      <p className='text-Secondary mb-8'>
        {`${products.length} models`}
      </p>
      <DropDownMenu onItemsSortChange={onItemsSortChange} />
      {(splitedProducts.length > 0 && splitedProducts.length >= currentPage + 1) && (
        <>
          <div
            className='grid grid-cols-1 tablet:grid-cols-2 tabletBig:grid-cols-3 laptop:grid-cols-4 gap-x-4 gap-y-10 w-full mb-8'
          >
            {splitedProducts[currentPage].map(product => (
              <PhoneCard key={uuidv4()} phonePreview={product}/>
            ))}
          </div>
          <NumberOfPages
            pages={splitedProducts}
            onPageChange={onPageChange}
            currentPage={currentPage}
          />
        </>
      )}
    </section>
  );
};

export default ProductPage;
