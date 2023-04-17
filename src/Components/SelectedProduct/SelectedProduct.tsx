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
    ['Cell', cell.join(', ')],
  ];
  const maybeIntrested = useAppSelector(state => state.allPhones.phones)
    .filter(({ fullPrice, name: maybeInterestedName }) => (
      ((fullPrice - priceDiscount <= 200 && fullPrice - priceDiscount >= -200))
      && (name !== maybeInterestedName)
    ));

  useEffect(() => {
    if (id) {
      dispatch(selectPhone(id));
    }

    console.log(cell);
  }, [id]);

  useEffect(() => {
    if (selectedColor !== color) {
      setSelectedColor(color);
    }

    if (selectedCapacity !== capacity) {
      setSelectedCapacity(capacity);
    }
  }, [selectedProduct]);

  return (
    <section className='mb-[32px]'>
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
            <div className='bg-white rounded-xl mx-auto max-w-fit'>
              <img
                className='max-h-[275px] mx-auto rounded-xl mb-[25px]'
                src={phoneImageBaseUrl + images[selectedImage]}
                alt='selected phone image'
              />
            </div>
            <div className='flex max-w-full gap-4 justify-center mb-[40px]'>
              {images.map((imgPath, i) => (
                <img
                  className={cn(
                    'w-[50px] object-contain bg-white transition-shadow rounded-lg h-[50px] cursor-pointer',
                    { 'shadow-[0_0_15px] shadow-white': selectedImage === i },
                  )}
                  onClick={() => {
                    setSelectedImage(i);
                  }}
                  key={imgPath}
                  src={phoneImageBaseUrl + imgPath}
                  alt='PhoneImages'
                />
              ))}
            </div>
            <div>
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
                          { 'border-Secondary': currentColor !== selectedColor },
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
                  className='bg-Phone-Accent hover:bg-[#A378FF] flex-1 text-Phone-white'
                  type='button'
                >
                  Add to cart
                </button>
                <button
                  className='bg-Surface-2 hover:bg-Icons flex justify-center items-center w-[48px] h-[48px] text-Phone-white'
                  type='button'
                >
                  <img src={`${process.env.PUBLIC_URL}/imgs/favourites_icon.svg`} alt='favourites' />
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
              <div className='mb-14'>
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
              <div>
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
              <ProductScroll title='You may also like' products={maybeIntrested}/>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedProduct;
