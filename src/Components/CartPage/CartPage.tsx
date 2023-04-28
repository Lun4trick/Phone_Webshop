import React, { useEffect } from 'react';
import PathHistory from '../PathHistory/PathHistory';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../Loader/Loader';
import CartItem from '../CartItem/CartItem';
import { v4 as uuidv4 } from 'uuid';
import { addAmount } from '../../features/TotalCostSlice';
import CheckOut from '../CheckOut/CheckOut';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(state => state.cartItems);
  const { phones, status } = useAppSelector(state => state.allPhones);
  const currentItems = phones
    .filter(({ itemId }) => cartItems.some(({ name }) => name === itemId));
  const isLoaded = status !== 'loading';

  useEffect(() => {
    if (currentItems) {
      currentItems.forEach(item => {
        dispatch(addAmount(item.price));
      });
    }
  }, []);

  return (
    <section>
      <PathHistory />
      <h1 className='text-[48px] font-bold text-Phone-white mb-8'>
      Cart
      </h1>
      {isLoaded && currentItems.length > 0
        ? (
          <div
            className='flex flex-col laptop:flex-row laptop:gap-4 laptop:grid laptop:grid-cols-12'
          >
            <div className='flex flex-col gap-4 mb-8 laptop:col-start-1 laptop:col-end-8'>
              {currentItems.map(item => (
                <CartItem
                  key={uuidv4()}
                  item={item}
                />
              ))}
            </div>
            <div className='laptop:col-start-8 laptop:col-end-12'>
              <CheckOut />
            </div>
          </div>
        )
        : (
          (!isLoaded && <Loader />)
          || (
            <p className='text-3xl text-Phone-white mb-8'>
              Your cart is empty.
            </p>)
        )}
    </section>
  );
};

export default React.memo(CartPage);
