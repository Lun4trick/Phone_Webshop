import React from 'react'
import { PhonePreview } from '../../utils/types/PhonePreviewType'

type Props = {
  phonePreview: PhonePreview, 
}

const PhoneCard: React.FC<Props> = ({ phonePreview }) => {
  const phoneImageBaseUrl = 'https://phone-shop-imgs.s3.eu-north-1.amazonaws.com/'
  const { 
    name, 
    image, 
    price,
    fullPrice,
    screen,
    capacity,
    ram
  } = phonePreview;
  const specs = [['Screen', screen], ['Capacity', capacity], ['RAM', ram]];
  const isOnSale = fullPrice - price > 90;

  return (
    <div className='flex flex-col h-[440px] p-8 bg-[#161827] min-w-[215px]'>
      <div className='mb-6 bg-white rounded-lg'>
        <img
          className='rounded-xl max-h-[130px] mx-auto'
          src={phoneImageBaseUrl + image} 
          alt={phonePreview.id} />
      </div>
      <p className='text-white leading-5 text-[14px] mb-2 line-clamp-2 hover:line-clamp-none'>
        {name}
      </p>
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
          spec => (
            <div id={name} className='flex justify-between mb-2 text-[12px]'>
              <p className='text-[#75767F]'>
                {spec[0]}
              </p>
              <p className='text-white'>
                {spec[1]}
              </p>
            </div>
          )
        )}
      </div>
      <div className='flex justify-between'>
        <button 
          type='button'
          className='p-[10px] text-[14px] text-white bg-[#905BFF]'
        >
          Add to cart
        </button>
        <button 
          type='button' 
          className="flex aspect-square items-center justify-center w-[40px] bg-gray-700"
        >
          <img 
            src={`${process.env.PUBLIC_URL}/imgs/favourites_icon.svg`} 
            alt="" 
          />
        </button>
      </div>
    </div>
  );
}

export default PhoneCard;