import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { type PhonePreview } from '../../utils/types/PhonePreviewType';
import { NavLink } from 'react-router-dom';

type Props = {
  phonePreview: PhonePreview;
};

const PhoneCard: React.FC<Props> = ({ phonePreview }) => {
  const phoneImageBaseUrl = 'https://phone-shop-imgs.s3.eu-north-1.amazonaws.com/';
  const {
    name,
    image,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = phonePreview;
  const specs = [['Screen', screen], ['Capacity', capacity], ['RAM', ram]];
  const isOnSale = fullPrice - price > 90;

  return (
    <div className='flex flex-col p-8 bg-[#161827] h-fit flex-1 min-w-[215px] w-full max-w-[250px] tablet:max-w-none mx-auto tablet:mx-0 group transition-all'>
      <div className='mb-6 rounded-lg mx-auto'>
        <img
          className='rounded-xl max-h-[130px] mx-auto'
          src={phoneImageBaseUrl + image}
          alt={phonePreview.id} />
      </div>
      <NavLink
        to={`/phones/${phonePreview.itemId}`}
        className='text-white min-h-[40px] leading-5 text-[14px] mb-2 line-clamp-2 group-hover:line-clamp-none'>
        {name}
      </NavLink>
      <div className='flex gap-2'>
        <p className='text-white mb-2 font-bold text-[22px]'>
          {`$${price}`}
        </p>
        {isOnSale && (
          <p className='text-gray-600 line-through mb-2 font-bold text-[22px]'>
            {`$${fullPrice}`}
          </p>
        )}
      </div>
      <div className='w-full border-b-[1px] border-[#3B3E4A] mb-4'/>
      <div>
        {specs.map(
          ([spec, value]) => (
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
          ),
        )}
      </div>
      <div className='flex gap-2'>
        <button
          type='button'
          className='p-[10px] text-[14px] flex-1 text-white bg-Phone-Accent hover:bg-[#A378FF]'
        >
          Add to cart
        </button>
        <button
          type='button'
          className='flex aspect-square items-center justify-center w-[40px] bg-Surface-2 hover:bg-Icons'
        >
          <img
            src={`${process.env.PUBLIC_URL}/imgs/favourites_icon.svg`}
            alt=''
          />
        </button>
      </div>
    </div>
  );
};

export default PhoneCard;
