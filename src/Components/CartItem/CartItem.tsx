import React from 'react';
import cn from 'classnames';
import { type PhonePreview } from '../../utils/types/PhonePreviewType';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCartItem, removeAllFromCart, removeFromCart } from '../../features/CartSlice';

type Props = {
  item: PhonePreview;
};

const CartItem: React.FC<Props> = ({ item }) => {
  const countOfItem = useAppSelector(state => state.cartItems.cartItems)
    .find(({ name }) => name === item.itemId)?.count ?? 0;
  const phoneImageBaseUrl = 'https://phone-shop-imgs.s3.eu-north-1.amazonaws.com/';
  const dispatch = useAppDispatch();
  const {
    itemId,
    image,
    name,
    fullPrice,
  } = item;

  return (
    <section
      className='flex flex-col tablet:flex-row bg-Surface-1 p-4 gap-6 tablet:p-8 justify-between'
    >
      <div className='flex items-center flex-1 gap-8'>
        <button
          type='button'
          onClick={() => {
            dispatch(removeAllFromCart(itemId));
          }}
        >
          <img
            className='w-[16px] h-[16px]'
            src={`${process.env.PUBLIC_URL!}/imgs/Close.svg`}
            alt='remove-all'
          />
        </button>
        <img
          className='w-[66px] h-[66px] object-contain rounded-lg'
          src={phoneImageBaseUrl + image}
          alt={itemId}
        />
        <p className='text-sm text-Phone-white'>
          {name}
        </p>
      </div>
      <div className='flex flex-1 justify-between items-center'>
        <div
          className='flex gap-[14px]'
        >
          <button
            onClick={() => {
              dispatch(removeFromCart(item.itemId));
            }}
            disabled={countOfItem === 1}
            className={cn(
              'w-8 h-8',
              { 'text-Phone-white bg-Surface-2 hover:bg-Icons': countOfItem > 1 },
              { 'text-Icons bg-trasparent border-[1px] border-Icons': countOfItem === 1 },
            )}
          >
            -
          </button>
          <p className='flex items-center text-Phone-white'>
            {countOfItem}
          </p>
          <button
            onClick={() => {
              dispatch(addCartItem(item.itemId));
            }}
            className='text-Phone-white w-8 h-8 bg-Surface-2 hover:bg-Icons'
          >
            +
          </button>
        </div>
        <p className='flex items-center text-Phone-white font-bold text-[22px]'>
          {`$${fullPrice * countOfItem}`}
        </p>
      </div>
    </section>
  );
};

export default React.memo(CartItem);
