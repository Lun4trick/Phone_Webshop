/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPhone } from '../../features/SelectedPhoneSlice';
import cn from 'classnames';
import PathHistory from '../PathHistory/PathHistory';
import Loader from '../Loader/Loader';
import ProductScroll from '../ProductScroll/ProductScroll';
import { addCartItem, removeFromCart } from '../../features/CartSlice';
import { removeFromFavourites, addFavouriteItem } from '../../features/FavouritesSlice';

const SelectedProduct: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(state => state.selectedPhone).phone;
  const prouctLoadStatus = useAppSelector(state => state.selectedPhone).status;
  const phoneImageBaseUrl = 'https://phone-shop-imgs.s3.eu-north-1.amazonaws.com/';
  const [selectedImage, setSelectedImage] = useState(0);
  const {
    name,
    images,
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    description,
    camera,
    zoom,
    cell,
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-nullish-coalescing
  } = selectedProduct! ?? {};
  const simplifiedPhoneName = id?.split('-').slice(0, -2).join('-');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const isLoaded = selectedColor && selectedCapacity && selectedProduct;
  const isOnSale = priceRegular - priceDiscount > 90;
  const specs = [['Screen', screen], ['Resolution', resolution], ['RAM', ram], ['Processor', processor]];
  const specsExtended = [
    ...specs,
    ['Built in memory', capacity],
    ['Camera', camera],
    ['Zoom', zoom],
    ['Cell', (cell ?? []).join(', ')],
  ];
  const maybeIntrested = useAppSelector(state => state.allPhones.phones)
    .filter(({ fullPrice, name: maybeInterestedName }) => (
      ((fullPrice - priceDiscount <= 200 && fullPrice - priceDiscount >= -200))
      && (name !== maybeInterestedName)
    ));
  const currentCart = useAppSelector(state => state.cartItems).cartItems;
  const isItemInCart = currentCart.includes(id ?? '');
  const currenFavourites = useAppSelector(state => state.favouriteItems).favouriteItems;
  const isItemInFavourites = currenFavourites.includes(id ?? '');

  const addToCartHandler = () => {
    if (isItemInCart) {
      dispatch(removeFromCart(id ?? ''));
    } else {
      dispatch(addCartItem(id ?? ''));
    }
  };

  const addToFavouritesHandler = () => {
    if (isItemInFavourites) {
      dispatch(removeFromFavourites(id ?? ''));
    } else {
      dispatch(addFavouriteItem(id ?? ''));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(selectPhone(id));
    }
  }, [id]);

  useEffect(() => {
    if (selectedColor !== color) {
      setSelectedColor(color);
    }

    if (selectedCapacity !== capacity) {
      setSelectedCapacity(capacity);
    }

    setSelectedImage(0);
  }, [selectedProduct]);

  return (
    <section className='mb-[32px] max-w-[1200px] mx-auto'>
      <PathHistory />
      {prouctLoadStatus === 'loading' && (
        <Loader />
      )}
      {(prouctLoadStatus !== 'loading' && isLoaded) && (
        <div className='flex flex-col'>
          <h1 className='font-bold text-Phone-white text-[22px] mb-[32px]'>
            {name}
          </h1>
          <div>
            <section className='flex flex-col tablet:flex-row gap-[25px] laptop:gap-[64px] tablet:items-start'>
              <div className='flex bg-white order-1 tablet:order-2 rounded-xl items-center justify-center mx-auto tablet:mx-0 w-fit tablet:w-full max-w-[442px]'>
                <div
                  className='flex items-center justify-center tablet:w-full aspect-square'
                >
                  <img
                    className='max-h-full rounded-[30px] max-w-full object-contain'
                    src={phoneImageBaseUrl + images[selectedImage]}
                    alt='selected phone image'
                  />
                </div>
              </div>
              <div className='flex tablet:flex-col tablet:min-w-[50px] order-2 tablet:order-1 max-w-full gap-4 justify-center mb-[15px]'>
                {images.map((imgPath, i) => (
                  <div
                    key={imgPath}
                    className={cn(
                      'min-w-[50px] laptop:w-[75px] bg-white transition-shadow rounded-xl aspect-square flex justify-center items-center cursor-pointer',
                      { 'shadow-[0_0_15px] shadow-white': selectedImage === i },
                    )}
                  >
                    <img
                      className={cn(
                        'object-contain max-h-[50px] laptop:max-h-[75px] rounded-lg',
                      )}
                      onClick={() => {
                        setSelectedImage(i);
                      }}
                      src={phoneImageBaseUrl + imgPath}
                      alt='PhoneImages'
                    />
                  </div>
                ))}
              </div>
              <div className='order-3 tablet:min-w-fit tablet:w-[25%]'>
                <div className='border-b-[1px] pb-[25px] border-Elements mb-[24px]'>
                  <p
                    className='text-[12px] text-Secondary font-bold mb-[9px]'>
                      Available colors
                  </p>
                  <div className='flex gap-4'>
                    {
                      colorsAvailable.map(currentColor => (
                        <div
                          className={cn(
                            'rounded-full w-fit h-fit flex border-[2px] p-[2px]',
                            { 'border-Phone-white': currentColor === selectedColor },
                            { 'border-Icons hover:border-Secondary': currentColor !== selectedColor },
                          )}
                          key={uuidv4()}
                        >
                          <NavLink
                            onClick={() => {
                              setSelectedColor(currentColor);
                            }}
                            to={`/phones/${simplifiedPhoneName}-${selectedCapacity.toLowerCase()}-${currentColor}`}
                            className={`w-[30px] h-[30px] rounded-full bg-pc-${currentColor}`}/>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className='border-b-[1px] pb-[25px] border-Elements mb-[32px]'>
                  <p
                    className='text-[12px] text-Secondary font-bold mb-[9px]'>
                      Select capacity
                  </p>
                  <div className='flex gap-4'>
                    {
                      capacityAvailable.map(currentCapacity => (
                        <div
                          className={cn(
                            'w-fit h-fit flex border-[1px] p-2 text-[14px]',
                            { 'bg-Phone-white': currentCapacity === selectedCapacity },
                            { 'border-Icons text-Phone-white': currentCapacity !== selectedCapacity },
                          )}
                          key={uuidv4()}
                        >
                          <NavLink
                            className='flex justify-center'
                            onClick={() => {
                              setSelectedCapacity(currentCapacity);
                            }}
                            to={`/phones/${simplifiedPhoneName}-${currentCapacity.toLowerCase()}-${selectedColor}`}
                          >
                            {currentCapacity.slice(0, -2) + ' GB'}
                          </NavLink>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className='flex gap-2 mb-[16px]'>
                  <p className='flex text-3xl justify-center items-center text-Phone-white font-bold'>
                    {`$${priceDiscount}`}
                  </p>
                  {isOnSale && (
                    <p className='text-2xl flex justify-center items-center text-Secondary line-through'>
                      {`$${priceRegular}`}
                    </p>
                  )}
                </div>
                <div className='flex gap-2 mb-[32px]'>
                  <button
                    type='button'
                    onClick={addToCartHandler}
                    className={cn(
                      'p-[10px] text-[14px] flex-1 text-white transition-all duration-300',
                      { 'bg-Phone-Accent hover:bg-[#A378FF]': !isItemInCart },
                      { 'bg-Surface-2 hover:bg-Icons': isItemInCart },
                    )}
                  >
                    {isItemInCart
                      ? 'Added'
                      : 'Add to cart'}
                  </button>
                  <button
                    onClick={addToFavouritesHandler}
                    className={cn(
                      'hover:bg-Icons flex justify-center items-center w-[48px] h-[48px]',
                      { 'bg-Surface-2': !isItemInFavourites },
                      { 'bg-transparent border-[1px] border-Elements': isItemInFavourites },
                    )}
                    type='button'
                  >
                    <img
                      src={isItemInFavourites
                        ? `${process.env.PUBLIC_URL}/imgs/favourites_added.svg`
                        : `${process.env.PUBLIC_URL}/imgs/favourites_icon.svg`}
                      alt='favourites'
                    />
                  </button>
                </div>
                <div className='mb-[56px]'>
                  {specs.map(([spec, value]) => (
                    <div
                      key={uuidv4()}
                      className='flex justify-between mb-2 text-[12px]'
                    >
                      <p className='text-[#75767F]'>
                        {spec}
                      </p>
                      <p className='text-white'>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className='flex flex-col desktop:flex-row desktop:gap-[64px]'>
              <div className='mb-14 flex-1'>
                <h1 className='text-xl text-Phone-white pb-4 border-b-[1px] border-Elements mb-8'>
                  About
                </h1>
                <div className='flex flex-col gap-8'>
                  {description.map(part => (
                    <div
                      key={part.title}
                    >
                      <p className='text-base text-Phone-white mb-4 self-stretch'>
                        {part.title}
                      </p>
                      <p className='text-sm text-[#89939A] self-stretch'>
                        {part.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex-1'>
                <p className='pb-4 border-b-[1px] border-Elements text-xl text-Phone-white mb-8'>
                  Tech specs
                </p>
                <div className='mb-[56px]'>
                  {specsExtended.map(([spec, value]) => (
                    <div
                      key={uuidv4()}
                      className='flex justify-between mb-2 text-[12px]'
                    >
                      <p className='text-[#75767F]'>
                        {spec}
                      </p>
                      <p className='text-white'>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <ProductScroll title='You may also like' products={maybeIntrested}/>
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedProduct;
