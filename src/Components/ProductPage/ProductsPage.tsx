
import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import ProductCategories from '../../utils/map/ProductCategories';
import { useAppSelector } from '../../app/hooks';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { SortByTypes, type SortMenuType } from '../../utils/types/SortByMenuTypes';
import PhoneCard from '../PhoneCard/PhoneCard';
import usePagination from '../../utils/customHooks/usePagination';
import NumberOfPages from '../NumberOfPages/NumberOfPages';
import type ProductType from '../../utils/types/ProductType';
import PageChangeType from '../../utils/types/PAgeChangeType';

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
  }, [currentPage]);

  useEffect(() => {
    setSplitedProducts(pagination, products);
  }, [sort, pagination, products]);

  const onItemsSortChange = useCallback((sortMenu: SortMenuType) => {
    setItemSort(sortMenu);
  }, [sort, pagination]);

  return (
    <section className='max-w-[1200px] mx-auto'>
      <div className='flex gap-[15px] mb-6'>
        <img
          className='aspect-square w-4 fill-Phone-white'
          src={`${process.env.PUBLIC_URL}/imgs/Home-ico.svg`}
          alt='Home'
        />
        <p className='text-Icons'>
          {'>'}
        </p>
        <p className='capitalize text-Secondary'>
          {currentProduct}
        </p>
      </div>
      <h1 className='text-white text-4xl capitalize font-bold mb-2'>
        {title}
      </h1>
      <p className='text-Secondary mb-8'>
        {`${products.length} models`}
      </p>
      <DropDownMenu onItemsSortChange={onItemsSortChange} />
      {splitedProducts.length > 0 && (
        <>
          <div
            className='grid grid-cols-1 tablet:grid-cols-2 tabletBig:grid-cols-3 laptop:grid-cols-4 gap-x-4 gap-y-10 w-full mb-8'
          >
            {splitedProducts[currentPage].map(product => (
              <PhoneCard key={uuidv4()} phonePreview={product}/>
            ))}
          </div>
          <NumberOfPages pages={splitedProducts}/>
        </>
      )}
    </section>
  );
};

export default ProductPage;
