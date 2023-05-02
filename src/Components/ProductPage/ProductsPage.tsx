import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCategories from '../../utils/map/ProductCategories';
import { useAppSelector } from '../../app/hooks';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { type PaginationOptions, SortByTypes, type SortMenuType } from '../../utils/types/SortByMenuTypes';
import PhoneCard from '../PhoneCard/PhoneCard';
import usePagination from '../../utils/customHooks/usePagination';
import NumberOfPages from '../NumberOfPages/NumberOfPages';
import type ProductType from '../../utils/types/ProductType';
import PageChangeType from '../../utils/types/PageChangeType';
import PathHistory from '../PathHistory/PathHistory';
import getSortedProducts from '../../utils/helpers/getSortedProducts';

const ProductPage: React.FC = () => {
  const { pathname, search } = useLocation();
  const currentProduct: ProductType = pathname.slice(1) as ProductType.PHONES;
  const products = useAppSelector(state => state.allPhones)[currentProduct];
  const title = ProductCategories
    .find(category => category.path === pathname)?.name;
  const [splitedProducts, setSplitedProducts] = usePagination();
  const queryParams = new URLSearchParams(search);
  const urlPage = Number(queryParams.get('page'));
  const urlSort = queryParams.get('sort') ?? SortByTypes.NEWEST;
  const urlElementsPerPage = queryParams.get('elements') ?? '16';
  const [{
    sort,
    pagination,
  }, setItemSort] = useState<SortMenuType>({
    sort: (urlSort as SortByTypes),
    pagination: urlElementsPerPage as PaginationOptions,
  });
  const navigate = useNavigate();

  const onPageChange = useCallback((pageChangeType: PageChangeType, exactPage = 1) => {
    const { LEFT, RIGHT } = PageChangeType;
    switch (pageChangeType) {
      case LEFT:
        queryParams.set('page', (urlPage - 1).toString());
        break;

      case RIGHT:
        queryParams.set('page', (urlPage + 1).toString());
        break;

      default:
        queryParams.set('page', (exactPage + 1).toString());
    }

    navigate(`?${queryParams.toString()}`);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [urlPage]);

  useEffect(() => {
    if (!urlPage) {
      queryParams.set('page', '1');
    }

    queryParams.set('sort', sort);

    const newSearchString = queryParams.toString();
    const newUrl = `?${newSearchString}`;

    navigate(newUrl);
  }, [sort]);

  useEffect(() => {
    const sortedProducts = getSortedProducts(sort, products);
    setSplitedProducts(pagination, sortedProducts);
  }, [sort, pagination, products]);

  const onItemsSortChange = useCallback((sortMenu: SortMenuType) => {
    setItemSort(sortMenu);
  }, [sort, pagination]);

  useEffect(() => {
    if (splitedProducts.length > 0 && splitedProducts.length < urlPage) {
      queryParams.set('page', (splitedProducts.length).toString());
      navigate(`?${queryParams.toString()}`);
    }

    console.log(splitedProducts.length);
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
      {(splitedProducts.length > 0 && splitedProducts.length >= urlPage) && (
        <>
          <div
            className='grid grid-cols-1 tablet:grid-cols-2 tabletBig:grid-cols-3 laptop:grid-cols-4 gap-x-4 gap-y-10 w-full mb-8'
          >
            {splitedProducts[urlPage - 1].map(product => (
              <PhoneCard key={uuidv4()} phonePreview={product}/>
            ))}
          </div>
          <NumberOfPages
            pages={splitedProducts}
            onPageChange={onPageChange}
            currentPage={urlPage - 1}
          />
        </>
      )}
    </section>
  );
};

export default ProductPage;
